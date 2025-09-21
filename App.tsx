
import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SiteProvider } from './contexts/SiteContext';
import { ToastProvider } from './contexts/ToastContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import SiteDetail from './pages/SiteDetail';
import Billing from './pages/Billing';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <SiteProvider>
          <AppRouter />
        </SiteProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

const AppRouter: React.FC = () => {
  const { user } = useAuth();

  return (
    <HashRouter>
      <Routes>
        {user ? (
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sites/:id" element={<SiteDetail />} />
            <Route path="billing" element={<Billing />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </HashRouter>
  );
};

const ProtectedLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
