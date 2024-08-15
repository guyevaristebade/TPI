import React, { useEffect, useState } from "react";
import {
  isLoggedIn,
  login as loginApi,
  logout as logoutApi,
} from "../api";
import {message} from "antd";
import {useNavigate} from "react-router-dom";

export const AuthenticationContext = React.createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const login =  (userData) => {
    return loginApi(userData)
      .then((data) => {
        if(data.status !== 200){
          message.error(data.error)
        }else{
          setUser(data.data.user);
        }
      })
      .catch((error) => {
        setUser(undefined);
        message.error(error.message)
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
