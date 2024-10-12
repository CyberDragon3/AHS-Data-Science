import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    switch (activeMenu) {
      case 'dashboard':
        return (
          <>
            <h2>Welcome to the Dashboard</h2>
            <p>Here you can see an overview of your data science projects.</p>
          </>
        );
      case 'analytics':
        return (
          <>
            <h2>Analytics</h2>
            <p>Detailed analytics and visualizations will be displayed here.</p>
          </>
        );
      case 'reports':
        return (
          <>
            <h2>Reports</h2>
            <p>Generate and view reports on your data science activities.</p>
          </>
        );
      case 'settings':
        return (
          <>
            <h2>Settings</h2>
            <p>Adjust your dashboard preferences and account settings.</p>
          </>
        );
      default:
        return <p>Select a menu item to view content.</p>;
    }
  };

  return (
    <div className={`${styles.dashboard} ${darkMode ? styles.dark : ''}`}>
      <Sidebar 
        activePage={activeMenu}
        setActivePage={setActiveMenu}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>AHS Data Science Dashboard</h1>
          <button 
            className={styles.button} 
            onClick={toggleDarkMode}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>
        <div className={styles.content}>
          {renderContent()}
        </div>
        <footer className={styles.footer}>
          <p>&copy; 2023 AHS Data Science. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;