import React, { useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import '../assets/login.scss';
import {message} from "antd";
import {login} from "../api";

export const Login = () => {

  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});
  const signIn = useSignIn();

  const onFinish = async (e) => {
    e.preventDefault();
    login(userData)
      .then((response) =>{
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        if(signIn({
          auth: {
            token: response.token,
            type: 'Bearer',
            expiresAt: expiresAt,
          },
          userState : userData
        })){
          message.success("Successfully signed in " + response.token)
        }else{
          message.error("Une erreur s'est produite dans le hook signIn")
        }

      })
      .catch((error) => message.error("Une erreur s'est produite" + error.message));
  };



  const onChange = (event) => {
    const { name, value } = event.target;
    setUserData({...userData, [name]: value});
  };


  return (
    <div className="login">
      <div className="login-form-container">
        <form className="login-form" onSubmit={onFinish}>
          <input type="text" className="login-name" placeholder="Name" name="username" onChange={onChange}/>
          <input type="password" className="login-password" placeholder="*****" name="password" onChange={onChange} />
          <button type="submit" className="login-btn">Enregistrer</button>
        </form>
        <p className="error">{error ? error : ""}</p>
      </div>
    </div>
  );
};
