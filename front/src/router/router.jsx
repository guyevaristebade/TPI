import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from "../components";
import { Dashboard, Login, Site, Unknown } from "../pages"
export const AppRouter = () =>{
  return(
    <Routes>
      <Route  element={<MainLayout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="site" element={<Site/>}/>
      </Route>
      <Route path="*" element={<Unknown />} />
      <Route path="login" element={<Login/>}/>
    </Routes>
  )
}
