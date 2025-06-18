// Layout.tsx
import React, { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom"; // or use children

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        activeSessionId={activeSessionId}
        onClose={() => setSidebarOpen(false)}
        onSelectSession={(id) => {
          setActiveSessionId(id);
          setSidebarOpen(false);
        }}
      />

      <div className="flex flex-col flex-1">
        <Navbar onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Outlet context={{ activeSessionId }} /> {/* Pass to children */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
