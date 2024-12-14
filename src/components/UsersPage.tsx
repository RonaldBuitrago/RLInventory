import React from 'react';
import { UserPlus, UserMinus, UserCog, Shield } from 'lucide-react';

interface User {
  id: number;
  name: string;
  position: string;
  role: string;
  group: string;
  status: string;
}

const users: User[] = [
  { id: 1, name: 'María Antonieta Ocampo', position: 'Gestor de Inventario', role: 'Administrador', group: 'Gestión', status: 'Activo' },
  { id: 2, name: 'Carlos Ramírez López', position: 'Técnico de Soporte', role: 'Usuario', group: 'Soporte', status: 'Activo' },
  { id: 3, name: 'Ana María Gutiérrez', position: 'Coordinador IT', role: 'Supervisor', group: 'IT', status: 'Activo' },
  { id: 4, name: 'Juan Diego Martínez', position: 'Analista de Sistemas', role: 'Usuario', group: 'Desarrollo', status: 'Inactivo' },
];

export function UsersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-1 p-1">
            <NavLink icon={<UserPlus size={18} />} text="Agregar usuario" href="#" active />
            <NavLink icon={<UserMinus size={18} />} text="Eliminar Usuario" href="#" />
            <NavLink icon={<UserCog size={18} />} text="Modificar usuario" href="#" />
            <NavLink icon={<Shield size={18} />} text="Roles" href="#" />
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Usuarios y Roles</h2>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="w-12 px-6 py-3"></th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cargo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grupo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4">
                    <input type="radio" name="selectedUser" className="h-4 w-4 text-blue-600" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.group}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface NavLinkProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  active?: boolean;
}

function NavLink({ icon, text, href, active = false }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-md ${
        active
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}