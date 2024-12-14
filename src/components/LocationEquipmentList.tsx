import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface LocationEquipment {
  user: string;
  inventoryNumber: string;
  rfid: string;
  model: string;
  serial: string;
}

interface LocationData {
  name: string;
  equipment: LocationEquipment[];
}

const locationData: LocationData[] = [
  {
    name: "Sede Bogotá",
    equipment: [
      { user: "Carlos Ramírez", inventoryNumber: "INV-2024-101", rfid: "RF78901A", model: "ThinkPad X1 Carbon", serial: "LNX1C45" },
      { user: "Ana Martínez", inventoryNumber: "INV-2024-102", rfid: "RF78902B", model: "Dell XPS 15", serial: "DXP154K" },
      { user: "Juan Pérez", inventoryNumber: "INV-2024-103", rfid: "RF78903C", model: "MacBook Pro 16", serial: "MBP16L8" },
      { user: "Laura Torres", inventoryNumber: "INV-2024-104", rfid: "RF78904D", model: "Surface Laptop 4", serial: "MSL4P9" },
    ]
  },
  {
    name: "Sede Medellín",
    equipment: [
      { user: "María González", inventoryNumber: "INV-2024-201", rfid: "RF78905E", model: "HP EliteBook", serial: "HPE840M" },
      { user: "Diego Sánchez", inventoryNumber: "INV-2024-202", rfid: "RF78906F", model: "Lenovo ThinkBook", serial: "LTB156N" },
      { user: "Patricia Luna", inventoryNumber: "INV-2024-203", rfid: "RF78907G", model: "Dell Latitude", serial: "DL7420K" },
      { user: "Roberto Díaz", inventoryNumber: "INV-2024-204", rfid: "RF78908H", model: "MacBook Air", serial: "MBA13Q5" },
    ]
  },
  {
    name: "Sede Cali",
    equipment: [
      { user: "Sofia Vargas", inventoryNumber: "INV-2024-301", rfid: "RF78909I", model: "ThinkPad T14", serial: "LTT14S7" },
      { user: "Andrés Morales", inventoryNumber: "INV-2024-302", rfid: "RF78910J", model: "HP ProBook", serial: "HPP430R" },
      { user: "Carmen Ruiz", inventoryNumber: "INV-2024-303", rfid: "RF78911K", model: "Dell Precision", serial: "DP5550X" },
      { user: "Felipe Castro", inventoryNumber: "INV-2024-304", rfid: "RF78912L", model: "Surface Book 3", serial: "MSB3W2" },
    ]
  }
];

export function LocationEquipmentList() {
  const [expandedLocations, setExpandedLocations] = useState<string[]>([]);

  const toggleLocation = (locationName: string) => {
    setExpandedLocations(prev => 
      prev.includes(locationName)
        ? prev.filter(name => name !== locationName)
        : [...prev, locationName]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-blue-600 mb-4">Equipos Por Sede</h3>
      <div className="space-y-4">
        {locationData.map((location) => (
          <div key={location.name} className="border rounded-lg">
            <button
              onClick={() => toggleLocation(location.name)}
              className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-t-lg"
            >
              <span className="font-medium text-gray-700">{location.name}</span>
              {expandedLocations.includes(location.name) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {expandedLocations.includes(location.name) && (
              <div className="overflow-auto max-h-[300px]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Inventario</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RFID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {location.equipment.map((item) => (
                      <tr key={item.inventoryNumber} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.user}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.inventoryNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.rfid}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.model}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.serial}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}