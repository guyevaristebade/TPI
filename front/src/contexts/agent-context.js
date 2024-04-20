import React, { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginApi ,
  isLoggedIn
} from '../api'

// Créer le contexte
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    isLoggedIn()
      .then(data =>{
        setUser(data.agent)
      })
      .catch(() => setUser(undefined))
  }, []);


  const login = async (name, password) => {
      try{
        const response = await loginApi(name, password);
        setUser(response.agent)
      }catch (err){
        setUser(undefined);
      }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
