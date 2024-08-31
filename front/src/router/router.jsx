import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout, PrivateRoute } from "../components";
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
  EditSite,
  EditAgent,
  DeviceManagement
} from "../pages";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          index
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="add-site"
          element={
            <PrivateRoute>
              <AddSite />
            </PrivateRoute>
          }
        />
        <Route
          path="site-list"
          element={
            <PrivateRoute>
              <SiteList />
            </PrivateRoute>
          }
        />
        <Route
          path="edit-site/:siteId"
          element={
            <PrivateRoute>
              <EditSite />
            </PrivateRoute>
          }
        />
        <Route
          path="add-pti"
          element={
            <PrivateRoute>
              <AddDevice />
            </PrivateRoute>
          }
        />
        <Route
          path="pti-list"
          element={
            <PrivateRoute>
              <DeviceList />
            </PrivateRoute>
          }
        />
        <Route
          path="edit-pti/:id"
          element={
            <PrivateRoute>
              <EditDevice />
            </PrivateRoute>
          }
        />
        <Route
          path="add-agent"
          element={
            <PrivateRoute>
              <AddAgent />
            </PrivateRoute>
          }
        />
        <Route
          path="agent-list"
          element={
            <PrivateRoute>
              <AgentList />
            </PrivateRoute>
          }
        />
        <Route
          path="edit-user/:id"
          element={
            <PrivateRoute>
              <EditAgent />
            </PrivateRoute>
          }
        />
        <Route
          path="gestion-pti"
          element={
            <PrivateRoute>
              <DeviceManagement/>
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<Unknown />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};
