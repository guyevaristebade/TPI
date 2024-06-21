import {
  AppstoreOutlined,
  MobileOutlined,
  PlusOutlined,
  UserAddOutlined,
  UserOutlined,
  UnorderedListOutlined, BankOutlined, EditOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';


export const menuItems = [
  {
    key: '1',
    icon: <AppstoreOutlined />,
    label: <Link to='/'>DashBoard</Link>,
  },
  {
    key: '2',
    icon: <BankOutlined />,
    label: "Site",
    children: [
      {
        key: '2-1',
        icon: <PlusOutlined />,
        label: <Link to='/ajout-site'>Ajouter un site</Link>,
      },
      {
        key: '2-2',
        icon: <UnorderedListOutlined />,
        label: <Link to='/liste-site'>Liste des sites</Link>,
      },
      {
        key: '2-3',
        icon: <EditOutlined />,
        label: <Link to='/edit-site'>Modifier</Link>,
      }
    ]
  },
  {
    key: '3',
    icon: <MobileOutlined />,
    label: "PTI",
    children: [
      {
        key: '3-1',
        icon: <PlusOutlined />,
        label: <Link to='/ajout-pti'>Ajouter des pti</Link>,
      },
      {
        key: '3-2',
        icon: <UnorderedListOutlined />,
        label: <Link to='/liste-pti'>Liste des pti</Link>,
      },
      {
        key: '3-3',
        icon: <EditOutlined />,
        label: <Link to='/edit-pti'>Modifier un PTI</Link>,
      }
    ]
  },
  {
    key: '4',
    icon: <UserOutlined />,
    label: "Utilisateur",
    children: [
      {
        key: '4-1',
        icon: <UserAddOutlined />,
        label: <Link to='/ajout-agent'>Créer des utilisateurs</Link>
      },
      {
        key: '4-2',
        icon: <UnorderedListOutlined />,
        label: <Link to='/liste-agent'>Liste des utilisateurs</Link>
      }
    ]
  }
];
