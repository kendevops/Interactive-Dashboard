import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
