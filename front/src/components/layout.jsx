import React from 'react';
import {Outlet} from 'react-router-dom';
import { Header } from "./index.js";
import '../assets/layout.scss'
export const MainLayout = () =>{
  return (
    <div>
      <Header/>
      <div className="layout-content">
        <Outlet/>
      </div>
    </div>
  )
}
