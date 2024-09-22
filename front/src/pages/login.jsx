import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { Form, Input, Button, Typography } from 'antd';

const { Title } = Typography
const { Item } = Form
const { Password }= Input


export const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();


  const onFinish = (values) => {
    login(values)
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection : 'column' }}>
      <Title style={{ textAlign : 'center'}}>Login</Title>
      <Form
        name="login_form"
        onFinish={onFinish}
        style={{ maxWidth: '400px', width: '100%' }}
      >
        <Item
          name="name"
          rules={[{ required: true, message: 'Veuillez entrez votre nom' }]}
        >
          <Input placeholder="Name" size="large"/>
        </Item>
        <Item
          name="password"
          rules={[{ required: true, message: 'Veuillez entrez votre mot de passe' }]}
        >
          <Password placeholder="***********" size="large" />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} size="large">
            Enregistrer
          </Button>
        </Item>
      </Form>
    </div>
  );
};
