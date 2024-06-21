import React from 'react';
import {Outlet} from 'react-router-dom';
import { SideBar } from ".";
import '../assets/layout.scss'
import { Flex, Layout } from "antd";

const { Content } = Layout
export const MainLayout = () =>{
  return (
    <Layout  >
      <SideBar/>
        <Content style={{ padding : "0 2rem", overflow : "auto", height : "100vh" }}>
          <Outlet/>
        </Content>
    </Layout>
  )
}
