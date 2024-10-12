import React from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  darkMode: boolean;
  activePage: string;
  setActivePage: (page: string) => void;
  toggleDarkMode: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode, activePage, setActivePage, toggleDarkMode }) => {
  const menuItems = ['Dashboard', 'Analytics', 'Reports', 'Settings'];

  return (
    <div className={`${styles.sidebar} ${darkMode ? styles.dark : ''}`} style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between', padding: '20px 0' }}>
      <div>
        <h2 style={{ marginBottom: '40px', textAlign: 'center' }}>AHS Data Science</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {menuItems.map((item) => (
              <li 
                key={item.toLowerCase()} 
                className={activePage === item.toLowerCase() ? styles.active : ''}
                onClick={() => setActivePage(item.toLowerCase())}
                style={{ 
                  padding: '12px 15px', 
                  marginBottom: '10px', 
                  cursor: 'pointer',
                  borderRadius: '8px',
                  transition: 'background-color 0.3s ease'
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button 
        onClick={toggleDarkMode} 
        className={styles.modeToggle}
        style={{
          padding: '10px',
          backgroundColor: darkMode ? '#2c3e50' : '#34495e',
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          marginTop: '20px'
        }}
      >
        Switch to {darkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
};

export default Sidebar;