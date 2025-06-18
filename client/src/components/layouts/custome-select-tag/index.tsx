import React, { useState, useRef, useEffect } from 'react';

interface UpwardSelectProps {
  onSelect: (value: string) => void;
}

const UpwardSelect: React.FC<UpwardSelectProps> = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('Export');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string, label: string) => {
    setSelectedLabel(label);
    onSelect(value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 pr-10 rounded-lg text-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 relative"
      >
        {selectedLabel}
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          ▴
        </span>
      </button>

      {open && (
        <ul className="absolute bottom-full mb-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 text-sm overflow-hidden">
          <li
            onClick={() => handleSelect('pdf', 'PDF')}
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            PDF
          </li>
          <li
            onClick={() => handleSelect('txt', 'Text')}
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            Text
          </li>
        </ul>
      )}
    </div>
  );
};

export default UpwardSelect;
