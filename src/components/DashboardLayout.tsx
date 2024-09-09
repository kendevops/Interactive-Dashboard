import React from 'react';
import Sidebar from './Sidebar';
import styles from '../styles/DashboardLayout.module.css';


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <div className={styles.dashboardLayout}>
      <Sidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
