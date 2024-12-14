import React from 'react';
import { Box, Users, BarChart2, Settings, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();

  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-2">
        <nav className="flex space-x-4">
          <NavItem 
            icon={<Box />} 
            text="Inventario" 
            to="/" 
            active={location.pathname === '/'} 
          />
          <NavItem 
            icon={<Users />} 
            text="Usuarios" 
            to="/users" 
            active={location.pathname === '/users'} 
          />
          <NavItem 
            icon={<BarChart2 />} 
            text="Reportes" 
            to="/reports" 
            active={location.pathname === '/reports'} 
          />
          <NavItem 
            icon={<Settings />} 
            text="Configuración" 
            to="/settings" 
            active={location.pathname === '/settings'} 
          />
        </nav>
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  active?: boolean;
}

function NavItem({ icon, text, to, active = false }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
        active ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}