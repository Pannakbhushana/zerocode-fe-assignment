import React, { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <div className="flex flex-col flex-1">
        <Navbar onToggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
