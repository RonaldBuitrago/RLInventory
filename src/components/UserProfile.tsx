import React from 'react';

export function UserProfile() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-4 ring-blue-50">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold text-blue-600">Maria Antonieta Ocampo</h2>
          <p className="text-gray-600">Gestor De Inventario</p>
          <div className="mt-4 flex space-x-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              Administrador
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              Activo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}