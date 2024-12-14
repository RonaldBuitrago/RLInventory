import React, { useState } from 'react';
import { HelpCircle, LogOut } from 'lucide-react';
import { HelpModal } from './HelpModal';

interface HeaderProps {
  onLogout: () => void;
}

export function Header({ onLogout }: HeaderProps) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <>
      <div className="bg-[#1e3a8a] p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#1e3a8a] font-bold text-xl">RL</span>
            </div>
            <h1 className="text-white text-2xl font-semibold">RL INVENTORY</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onLogout}
              className="text-white hover:text-gray-200 flex items-center space-x-2"
            >
              <span className="text-sm">Cerrar Sesión</span>
              <LogOut size={20} />
            </button>
            <button 
              onClick={() => setIsHelpOpen(true)}
              className="text-white hover:text-gray-200"
            >
              <HelpCircle size={24} />
            </button>
          </div>
        </div>
      </div>

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </>
  );
}