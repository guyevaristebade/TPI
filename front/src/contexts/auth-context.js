import React, { useEffect, useState } from "react";
import {
  isLoggedIn,
  login as loginApi,
  logout as logoutApi,
} from "../api";
import { message } from "antd";
import {useQuery} from "../hooks";
import { useLocation, useNavigate } from 'react-router-dom'

export const AuthenticationContext = React.createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate()
  const query = useQuery()
  const location = useLocation()

  const redirect = () => {
    navigate(query.get('redirect_uri') || '/')
  }


  const login = async (userData) => {
    try {
      const data = await loginApi(userData);

      if (data.success) {
        setUser(data.data.user);

      } else {
        message.error(data.msg || "Erreur lors de la connexion");
        console.error(data.data)
        setUser(undefined);  // S'assurer que l'utilisateur est bien réinitialisé si la connexion échoue
      }
    } catch (error) {
      message.error("Erreur serveur : " + (error.msg || error.message));
      console.log(error, "login error")
      setUser(undefined);
    }
  };


  const logout = async () => {
    await logoutApi()
    setUser(undefined);
  };

  useEffect(() => {
    isLoggedIn()
      .then((data) => {
        if (data.data.user) {
          setUser(data.data.user);
        } else {
          setUser(undefined);
        }
      })
      .catch(() => {
        setUser(undefined);
      });
  }, []);


  return (
    <AuthenticationContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
