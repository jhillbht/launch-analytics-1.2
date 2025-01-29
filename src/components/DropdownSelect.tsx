import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownSelectProps {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function DropdownSelect({ label, options, value, onChange }: DropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        {label}:
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#1e2738] px-3 py-1.5 rounded-md flex items-center gap-2 transition-all duration-200 
                   hover:bg-[#252f43] active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <span className="text-white">{selectedOption?.label}</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-48 bg-[#1e2738] rounded-lg shadow-lg 
                      border border-gray-700/50 backdrop-blur-sm transform origin-top scale-100 
                      transition-all duration-200 animate-in fade-in slide-in-from-top-2 z-50">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-700/30 transition-colors
                          ${option.value === value ? 'text-blue-400' : 'text-gray-200'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}