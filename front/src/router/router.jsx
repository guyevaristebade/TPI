import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { MainLayout } from "../components";
import {
  EditDevice,
  Dashboard,
  Login,
  AddSite,
  Unknown,
  AddDevice,
  SiteList,
  DeviceList,
  AddAgent,
  AgentList,
  EditSite
} from "../pages";
import { useAuth } from "../hooks";

export const AppRouter = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) {
      navigate("/login");
    }
  }, [user,navigate]);

  return (
    <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-site" element={<AddSite />} />
          <Route path="site-list" element={<SiteList />} />
          <Route path="edit-site/:siteId" element={<EditSite />} />
          <Route path="add-pti" element={<AddDevice />} />
          <Route path="pti-list" element={<DeviceList />} />
          <Route path="edit-pti/:id" element={<EditDevice />} />
          <Route path="add-agent" element={<AddAgent />} />
          <Route path="agent-list" element={<AgentList />} />
        </Route>
        <Route path="*" element={<Unknown />} />
        <Route path="login" element={<Login />} />
    </Routes>
  );
};
