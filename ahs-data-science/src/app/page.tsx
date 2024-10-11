'use client';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import { useState } from 'react';

export default function Home() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        {activeMenu === 'dashboard' && <Dashboard />}
        {/* Add other components for different menu items here */}
      </main> {/* Closing tag for main */}
    </div>
  );
}