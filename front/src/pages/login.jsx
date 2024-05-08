import React, { useState } from 'react';
import '../assets/login.scss';
import {message} from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";

export const Login = () => {

  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth()
  const onFinish = async (e) => {
    e.preventDefault();
    login(userData)
      .then((u) =>{
        navigate("/")
        message.success("Success de la connexion");
        navigate("/");
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
          <input type="text" className="login-name" placeholder="Name" name="name" onChange={onChange}/>
          <input type="password" className="login-password" placeholder="*****" name="password" onChange={onChange} />
          <button type="submit" className="login-btn">Enregistrer</button>
        </form>
        <p className="error">{error ? error : ""}</p>
      </div>
    </div>
  );
};
