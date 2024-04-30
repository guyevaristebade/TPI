import React, {useEffect} from 'react';
import {
  login as loginApi,
  isLoggedIn
} from '../api';
import {useState} from "react";
import {Spin} from "antd";
import { useNavigate } from "react-router-dom";


const initState = {
  user: undefined,
};

export const AuthenticationContext = React.createContext({
  ...initState,
  login: () => {}
});


export const AuthenticationProvider = ({ children }) => {

  const navigate = useNavigate()
  const [authState, setAuthState] = useState(initState);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (username, password) => {
    try {
      const userLogin = await loginApi(username, password);
      setAuthState({ user: userLogin });
      return userLogin;

    } catch (error) {
      setAuthState({ user: undefined });
    }
  };

  useEffect(() =>{
    isLoggedIn()
      .then((user) => {
        if (user === "Unauthorized") throw new Error("Unauthorized");
        setAuthState({ user });
        console.log(user);
      })
      .catch((error) => {
        setAuthState({ user: undefined });
        console.log(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  },[])


  if (isLoading) {
    return <Spin fullscreen={true} spinning={true} size={"large"} />;
  }

  return (
    <AuthenticationContext.Provider
      value={{ ...authState, login }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
