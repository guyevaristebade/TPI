import React, { useEffect, useState } from "react";
import {
  isLoggedIn,
  login as loginApi,
  logout as logoutApi,
} from "../api";

export const AuthenticationContext = React.createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const login =  (userData) => {
    return loginApi(userData)
      .then((data) => {
        setUser(data.user);
        console.log(data)
      })
      .catch((error) => {
        setUser(undefined);
        throw error;
      });
  };

  const logout = async () => {
    await logoutApi()
    setUser(undefined);
  };

  useEffect(() => {
    isLoggedIn()
      .then((data) => {
        if (user === "Unauthorized") setUser(undefined);
        setUser(data.user);
      })
      .catch(() => {
        setUser(undefined);
      })
  },[]);

  return (
    <AuthenticationContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
