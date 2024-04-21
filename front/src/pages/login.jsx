import React, { useState } from 'react';
import '../assets/login.scss';
import { useAuth } from "../contexts";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };


  const onChange = (event) => {
    const { name, value } = event.target;

      switch (name) {
        case "username":
          setUsername(value);
          break;

        case "password":
          setPassword(value);
          break;


        default:
          break;
      }
  };


  return (
    <div className="login">
      <div className="login-form-container">
        <h1>Login</h1>
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
