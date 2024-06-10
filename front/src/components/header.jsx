import React from 'react';
import '../assets/header.scss';
import {Link, useNavigate} from 'react-router-dom'
import { useAuth} from "../hooks";

export const Header = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();


  const onLogout = async () => {
    await logout();
    navigate("/login");
  }


  return(
    <header className="header">
        <div className="logo">
          <h1>Atalian Security</h1>
        </div>
        <nav className="navigation">
          <ul className="header-list-item">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/site">Site</Link></li>
          </ul>
        </nav>
        <div className="dec-con">
            <button className="deconnexion" onClick={onLogout}>
              <Link to="/login">Deconnexion</Link>
            </button>
        </div>
    </header>
  )
}

