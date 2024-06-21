import React, { useState } from 'react';
import {Layout, Menu, Typography, Button, Flex} from 'antd';
import { menuItems } from '../helpers';
import {useAuth} from "../hooks";
import {useNavigate} from "react-router-dom";

const { Sider } = Layout;
const { Title } = Typography;

export const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
      await logout();
      navigate("/login");
  };

  return (
    <Sider width={300} trigger={null} collapsible collapsed={collapsed} style={{height : "100vh"}}>
      <Flex style={{height : "100%"}}  vertical>
        <Title level={1} style={{ textAlign: 'center', color: '#fff', margin: '1rem 0 4rem 0' }}>
          Atalian Security
        </Title>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
        <div style={{ marginTop: 'auto', padding: '1rem', textAlign: 'center' }}>
          <Button size="large" style={{width : "100%"}} type="primary" danger onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
      </Flex>
    </Sider>
  );
};
