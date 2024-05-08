import React, { useEffect, useState } from "react";

import {
  isLoggedIn,
  login as loginApi,
  logout as logoutApi,
} from "../api";
import { useQuery } from "../hooks";

import { useLocation, useNavigate } from "react-router-dom";
import { Spin } from "antd";

const initState = {
  user: undefined,
};

export const AuthenticationContext = React.createContext({
  ...initState,
  login: () => {},
  logout: () => {},
});

export const AuthenticationProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();
  const [authState, setAuthState] = useState(initState);
  const [isLoading, setIsLoading] = useState(true);

  const redirect = () => {
    navigate(query.get("redirect_uri") || "/");
  };

  const login = async (userData) => {
    try {
      const userLogin = await loginApi(userData);
      setAuthState({ user: userLogin });
      redirect();
      return userLogin;
    } catch (error) {
      setAuthState({ user: undefined });
    }
  };

  const logout = () => {
    logoutApi().then(() => {
      setAuthState(initState);
      navigate("/login");
    });
  };

  useEffect(() => {
    isLoggedIn()
      .then((user) => {
        if (user === "Unauthorized") throw new Error("Unauthorized");

        setAuthState({ user });

        if (location.pathname === "/login") {
          redirect();
        }
      })
      .catch((error) => {
        setAuthState({ user: undefined });

        if (!location.pathname.match(/^(\/|\/login|\/register)$/)) {
          navigate(`/login?redirect_uri=${encodeURI(location.pathname)}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (location.pathname === "/logout") {
      logout();
    }
  }, [location]);

  if (isLoading) {
    return <Spin fullscreen={true} spinning={true} size={"large"} />;
  }

  return (
    <AuthenticationContext.Provider
      value={{ ...authState, login, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
