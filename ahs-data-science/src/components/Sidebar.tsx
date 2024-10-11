import React from "react";

interface SidebarProps {
    activeMenu: string;
    setActiveMenu: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, setActiveMenu }) => {
    const menuItems = ["dashboard", "profile", "settings"];

    return (
        <div className="w-64 bg-indigo-700 text-white">
            <div className="p-6">
                <h1 className="text-2xl font-bold">AHS Data Science Club</h1>
                </div>
                <nav className="mt-6">
                <ul>
                    {menuItems.map(item => ( // Fixed syntax here
                        <li key={item} className="mb-2">
                            <button 
                                className={`w-full text-left px-6 py-3 ${
                                    activeMenu === item ? "bg-indigo-800 border-l-4 border white" : "hover:bg-gray-100"
                                }`}
                                onClick={() => setActiveMenu(item)}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div> // Closing the main div
    );
};

export default Sidebar; // Don't forget to export your component!