import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-100 p-4 border-r transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* Close button for mobile */}
      <div className="md:hidden flex justify-end">
        <button onClick={onClose} className="text-gray-700 font-bold text-xl">
          ✕
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-4">Chat History</h2>
      <ul className="space-y-2">
        <li className="p-2 bg-white rounded shadow">Chat 1</li>
        <li className="p-2 bg-white rounded shadow">Chat 2</li>
        {/* Add more chat history */}
      </ul>
    </div>
  );
};

export default Sidebar;
