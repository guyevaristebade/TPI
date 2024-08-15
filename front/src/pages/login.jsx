import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { Form, Input, Button, message, Typography } from 'antd';

const { Title } = Typography
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
        style={{ maxWidth: '300px', width: '100%', boxShadow: '' }}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your Name!' }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Enregistrer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
