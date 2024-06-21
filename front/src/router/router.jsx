import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { EditDevice, MainLayout } from "../components";
import { Dashboard, Login, AddSite, Unknown, AddDevice, SiteList, DeviceList, AddAgent, AgentList } from "../pages";
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
          <Route path="ajout-site" element={<AddSite />} />
          <Route path="liste-site" element={<SiteList />} />
          <Route path="ajout-pti" element={<AddDevice />} />
          <Route path="liste-pti" element={<DeviceList />} />
          <Route path="edit-pti" element={<EditDevice />} />
          <Route path="ajout-agent" element={<AddAgent />} />
          <Route path="liste-agent" element={<AgentList />} />
        </Route>
        <Route path="*" element={<Unknown />} />
        <Route path="login" element={<Login />} />
    </Routes>
  );
};
