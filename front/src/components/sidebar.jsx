import {
  AppstoreOutlined,
  MobileOutlined,
  PlusOutlined,
  UserAddOutlined,
  UserOutlined,
  UnorderedListOutlined,
  BankOutlined, BookOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;
const { Title } = Typography;

export const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const menuItems = [
    {
      key: '/',
      icon: <AppstoreOutlined />,
      label: <Link to='/'>DashBoard</Link>,
    },
    {
      key: 'site',
      icon: <BankOutlined />,
      label: "Site",
      children: [
        user && user.role.includes("Admin") ? {
          key: 'add-site',
          icon: <PlusOutlined />,
          label: <Link to='/add-site'>Ajouter un site</Link>,
        } : null,
        {
          key: 'site-list',
          icon: <UnorderedListOutlined />,
          label: <Link to='/site-list'>Liste des sites</Link>,
        }
      ].filter(item => item !== null)
    },
    {
      key: 'pti',
      icon: <MobileOutlined />,
      label: "Appareil",
      children: [
        user && user.role.includes("Admin") ? {
          key: 'add-pti',
          icon: <PlusOutlined />,
          label: <Link to='/add-pti'>Ajouter des pti</Link>,
        } : null,
        {
          key: 'pti-list',
          icon: <UnorderedListOutlined />,
          label: <Link to='/pti-list'>Liste des pti</Link>,
        }
      ].filter(item => item !== null)
    },
    {
      key: 'assignment',
      icon: <BookOutlined />,
      label: "Gestion des attributions",
      children: [
        user && user.role.includes("Admin") ? {
          key: 'assignment',
          icon: <PlusOutlined />,
          label: <Link to='/assignment'>Attribuer un Appareil</Link>,
        } : null,
        {
          key: 'assignment-list',
          icon: <UnorderedListOutlined />,
          label: <Link to='/assignment-list'>Liste des attributions</Link>,
        }
      ].filter(item => item !== null)
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: "Utilisateur",
      children: [
        user && user.role.includes("Admin") ? {
          key: 'add-agent',
          icon: <UserAddOutlined />,
          label: <Link to='/add-agent'>Créer des utilisateurs</Link>
        } : null,
        {
          key: 'agent-list',
          icon: <UnorderedListOutlined />,
          label: <Link to='/agent-list'>Liste des utilisateurs</Link>
        }
      ].filter(item => item !== null)
    }
  ];

  return (
    <Sider width={300} trigger={null} collapsible collapsed={collapsed} style={{ height: "100vh" }}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Title level={1} style={{ textAlign: 'center', color: '#fff', margin: '1rem 0 4rem 0' }}>
          Atalian Security IDF2
        </Title>
        <Menu theme="dark" mode="inline" items={menuItems} />
        <div style={{ marginTop: 'auto', padding: '1rem', textAlign: 'center' }}>
          <Button size="large" style={{ width: "100%" }} type="primary" danger onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
      </div>
    </Sider>
  );
};
