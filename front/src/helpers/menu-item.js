import {
  AppstoreOutlined,
  MobileOutlined,
  PlusOutlined,
  UserAddOutlined,
  UserOutlined,
  UnorderedListOutlined,
  BankOutlined,
  EditOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from "../hooks";

const { user } = useAuth();

export const menuItems = [
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
      ...(user && user.permission === 10 ? [{
        key: 'add-site',
        icon: <PlusOutlined />,
        label: <Link to='/add-site'>Ajouter un site</Link>,
      }] : []),
      {
        key: 'site-list',
        icon: <UnorderedListOutlined />,
        label: <Link to='/site-list'>Liste des sites</Link>,
      }
    ]
  },
  {
    key: 'pti',
    icon: <MobileOutlined />,
    label: "PTI",
    children: [
      ...(user && user.permission === 10 ? [{
        key: 'add-pti',
        icon: <PlusOutlined />,
        label: <Link to='/add-pti'>Ajouter des pti</Link>,
      }] : []),
      {
        key: 'pti-list',
        icon: <UnorderedListOutlined />,
        label: <Link to='/pti-list'>Liste des pti</Link>,
      }
    ]
  },
  {
    key: '4',
    icon: <UserOutlined />,
    label: "Utilisateur",
    children: [
      ...(user && user.permission === 10 ? [{
        key: 'add-agent',
        icon: <UserAddOutlined />,
        label: <Link to='/add-agent'>Créer des utilisateurs</Link>
      }] : []),
      {
        key: 'agent-list',
        icon: <UnorderedListOutlined />,
        label: <Link to='/agent-list'>Liste des utilisateurs</Link>
      }
    ]
  }
];
