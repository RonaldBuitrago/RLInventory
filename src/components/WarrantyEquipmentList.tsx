import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface WarrantyEquipment {
  inventoryNumber: string;
  rfid: string;
  model: string;
  serial: string;
  purchaseDate: string;
  warrantyYears: number;
}

interface WarrantyGroup {
  status: string;
  equipment: WarrantyEquipment[];
}

const warrantyEquipmentData: WarrantyEquipment[] = [
  { inventoryNumber: "INV-2023-001", rfid: "RF12345A", model: "ThinkPad X1 Carbon", serial: "PF3K8L9", purchaseDate: "2023-12-15", warrantyYears: 3 },
  { inventoryNumber: "INV-2023-002", rfid: "RF12346B", model: "Dell XPS 13", serial: "DX139P2", purchaseDate: "2023-11-20", warrantyYears: 5 },
  { inventoryNumber: "INV-2022-003", rfid: "RF12347C", model: "MacBook Pro 14", serial: "MP14Q52", purchaseDate: "2022-06-10", warrantyYears: 3 },
  { inventoryNumber: "INV-2021-004", rfid: "RF12348D", model: "HP EliteBook 840", serial: "HE840J7", purchaseDate: "2021-03-15", warrantyYears: 3 },
  { inventoryNumber: "INV-2020-005", rfid: "RF12349E", model: "Surface Laptop 4", serial: "MS4L93K", purchaseDate: "2020-08-22", warrantyYears: 2 },
  { inventoryNumber: "INV-2023-006", rfid: "RF12350F", model: "iMac 24", serial: "IM24P8L", purchaseDate: "2023-09-30", warrantyYears: 5 },
  { inventoryNumber: "INV-2022-007", rfid: "RF12351G", model: "Dell OptiPlex 7090", serial: "DO709M5", purchaseDate: "2022-12-05", warrantyYears: 4 },
  { inventoryNumber: "INV-2024-008", rfid: "RF12352H", model: "iPad Pro 12.9", serial: "IP129R4", purchaseDate: "2024-01-15", warrantyYears: 2 },
  { inventoryNumber: "INV-2023-009", rfid: "RF12353I", model: "Lenovo ThinkCentre", serial: "LT567K6", purchaseDate: "2023-07-18", warrantyYears: 3 },
  { inventoryNumber: "INV-2019-010", rfid: "RF12354J", model: "HP ProDesk 600", serial: "HP600N8", purchaseDate: "2019-05-20", warrantyYears: 3 },
];

function isWarrantyValid(purchaseDate: string, warrantyYears: number): boolean {
  const purchase = new Date(purchaseDate);
  const warrantyEnd = new Date(purchase.setFullYear(purchase.getFullYear() + warrantyYears));
  return warrantyEnd > new Date();
}

function getWarrantyStatus(equipment: WarrantyEquipment): string {
  const purchase = new Date(equipment.purchaseDate);
  const warrantyEnd = new Date(purchase.setFullYear(purchase.getFullYear() + equipment.warrantyYears));
  const today = new Date();
  const monthsLeft = Math.ceil((warrantyEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30));
  
  if (monthsLeft <= 0) return "Expirada";
  if (monthsLeft <= 3) return "Por vencer";
  return "Vigente";
}

function groupByWarrantyStatus(equipment: WarrantyEquipment[]): WarrantyGroup[] {
  const groups = equipment.reduce((acc, item) => {
    const status = getWarrantyStatus(item);
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(item);
    return acc;
  }, {} as Record<string, WarrantyEquipment[]>);

  return Object.entries(groups).map(([status, equipment]) => ({
    status,
    equipment: equipment.sort((a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime())
  }));
}

export function WarrantyEquipmentList() {
  const [expandedStatuses, setExpandedStatuses] = useState<string[]>([]);
  const groupedEquipment = groupByWarrantyStatus(warrantyEquipmentData);

  const toggleStatus = (status: string) => {
    setExpandedStatuses(prev => 
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-blue-600 mb-4">Estado de Garantías</h3>
      <div className="space-y-4">
        {groupedEquipment.map((group) => (
          <div key={group.status} className="border rounded-lg">
            <button
              onClick={() => toggleStatus(group.status)}
              className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-t-lg"
            >
              <div className="flex items-center">
                <span className="font-medium text-gray-700">{group.status}</span>
                <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
                  {group.equipment.length}
                </span>
              </div>
              {expandedStatuses.includes(group.status) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {expandedStatuses.includes(group.status) && (
              <div className="overflow-auto max-h-[300px]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Inventario</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RFID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Compra</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Años Garantía</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {group.equipment.map((item) => (
                      <tr key={item.inventoryNumber} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.inventoryNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.rfid}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.model}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.serial}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(item.purchaseDate).toLocaleDateString('es-ES')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.warrantyYears}</td>
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