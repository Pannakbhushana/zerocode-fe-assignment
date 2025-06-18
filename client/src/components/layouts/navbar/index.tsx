import React, { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import UserTab from "../../user/user-tab";

interface NavbarProps {
    onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
    const Fimenu = FiMenu as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const Fisun = FiSun as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const Fimoon = FiMoon as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark';
        }
        return false;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className="h-[10vh] flex justify-between items-center px-5 border-b shadow-md bg-white dark:bg-gray-900 dark:border-gray-700">
            {/* Toggle icon only visible on mobile */}
            <div className="md:hidden flex items-center gap-6">
                <Fimenu className="text-gray-700 dark:text-gray-200 text-[28px]" onClick={onToggleSidebar} />
                <img src="./chatbot2.png" alt="ChatBOT Logo" className="w-8 h-8 object-contain" />
            </div>

            <div className="hidden md:flex items-center md:gap-2  px-3 py-1 rounded-md text-2xl font-mono font-bold text-teal-700 dark:text-teal-300">
                <img src="./chatbot2.png" alt="ChatBOT Logo" className="w-8 h-8 object-contain" />
                <span >ChatBOT</span>
            </div>

            <div className="flex items-center gap-6 md:gap-6">
                {/* Dark Mode Toggle */}
                <button onClick={toggleDarkMode} className="text-[30px] md:text-4xl text-gray-700 dark:text-gray-200">
                    {isDarkMode ? <Fisun /> : <Fimoon />}
                </button>

                <UserTab />
            </div>
        </div>
    );
};

export default Navbar;
