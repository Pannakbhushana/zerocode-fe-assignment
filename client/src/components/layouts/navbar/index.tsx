import React from "react";
import { FiMenu } from "react-icons/fi";
import UserTab from "../../user/user-tab";

interface NavbarProps {
    onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
    const Fimenu = FiMenu as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    return (
        <div className="h-[80px] flex justify-between items-center px-5 border-b shadow-md bg-white">
            {/* Toggle icon only visible on mobile */}
            <div className="md:hidden">
                <Fimenu className="text-gray-700 text-2xl" onClick={onToggleSidebar} />
            </div>

            <div className="text-xl font-mono font-bold md:border md:border-teal-700 md:rounded px-3 py-1  text-teal-700">
                ChatBOT
            </div>

            <UserTab />
        </div>
    );
};

export default Navbar;
