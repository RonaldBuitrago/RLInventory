import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MonthlyEquipment {
  date: string;
  inventoryNumber: string;
  rfid: string;
  model: string;
  serial: string;
}

interface MonthGroup {
  month: string;
  equipment: MonthlyEquipment[];
}

const monthlyEquipmentData: MonthlyEquipment[] = [
  { date: "2024-03-15", inventoryNumber: "INV-2024-045", rfid: "RF67892A", model: "MacBook Pro M3", serial: "MPM3K8L9" },
  { date: "2024-03-14", inventoryNumber: "INV-2024-044", rfid: "RF67891B", model: "Dell Precision 5680", serial: "DP568P2" },
  { date: "2024-03-14", inventoryNumber: "INV-2024-043", rfid: "RF67890C", model: "ThinkPad P1 Gen 5", serial: "TP1G52Q" },
  { date: "2024-02-28", inventoryNumber: "INV-2024-042", rfid: "RF67889D", model: "HP ZBook Fury", serial: "ZBF840J7" },
  { date: "2024-02-25", inventoryNumber: "INV-2024-041", rfid: "RF67888E", model: "Surface Studio", serial: "SS4L93K" },
  { date: "2024-02-20", inventoryNumber: "INV-2024-040", rfid: "RF67887F", model: "iMac Pro", serial: "IMP24P8L" },
  { date: "2024-01-15", inventoryNumber: "INV-2024-039", rfid: "RF67886G", model: "Dell Latitude 9440", serial: "DL944M5" },
  { date: "2024-01-12", inventoryNumber: "INV-2024-038", rfid: "RF67885H", model: "iPad Pro M2", serial: "IPM2R4" },
  { date: "2024-01-10", inventoryNumber: "INV-2024-037", rfid: "RF67884I", model: "Galaxy Book3 Ultra", serial: "GB3UK6" },
];

function groupByMonth(equipment: MonthlyEquipment[]): MonthGroup[] {
  const groups = equipment.reduce((acc, item) => {
    const date = new Date(item.date);
    const monthKey = date.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(item);
    return acc;
  }, {} as Record<string, MonthlyEquipment[]>);

  return Object.entries(groups).map(([month, equipment]) => ({
    month,
    equipment: equipment.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }));
}

export function MonthlyEquipmentList() {
  const [expandedMonths, setExpandedMonths] = useState<string[]>([]);
  const groupedEquipment = groupByMonth(monthlyEquipmentData);

  const toggleMonth = (month: string) => {
    setExpandedMonths(prev => 
      prev.includes(month)
        ? prev.filter(m => m !== month)
        : [...prev, month]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-blue-600 mb-4">Ingreso De Equipos Por Mes</h3>
      <div className="space-y-4">
        {groupedEquipment.map((group) => (
          <div key={group.month} className="border rounded-lg">
            <button
              onClick={() => toggleMonth(group.month)}
              className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-t-lg"
            >
              <span className="font-medium text-gray-700 capitalize">{group.month}</span>
              {expandedMonths.includes(group.month) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {expandedMonths.includes(group.month) && (
              <div className="overflow-auto max-h-[300px]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Inventario</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RFID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {group.equipment.map((item) => (
                      <tr key={item.inventoryNumber} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(item.date).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.inventoryNumber}</td>
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