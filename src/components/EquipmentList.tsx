import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Equipment {
  inventoryNumber: string;
  rfid: string;
  model: string;
  serial: string;
  status: string;
  type: string;
}

interface EquipmentGroup {
  type: string;
  equipment: Equipment[];
}

const equipmentData: Equipment[] = [
  { inventoryNumber: "INV-2024-001", rfid: "RF45892A", model: "ThinkPad X1 Carbon", serial: "PF3K8L9", status: "Sin asignar", type: "Laptops" },
  { inventoryNumber: "INV-2024-002", rfid: "RF45893B", model: "Dell XPS 13", serial: "DX139P2", status: "Sin asignar", type: "Laptops" },
  { inventoryNumber: "INV-2024-003", rfid: "RF45894C", model: "MacBook Pro 14", serial: "MP14Q52", status: "Sin asignar", type: "Laptops" },
  { inventoryNumber: "INV-2024-004", rfid: "RF45895D", model: "HP EliteBook 840", serial: "HE840J7", status: "Sin asignar", type: "Laptops" },
  { inventoryNumber: "INV-2024-005", rfid: "RF45896E", model: "Surface Laptop 4", serial: "MS4L93K", status: "Sin asignar", type: "Laptops" },
  { inventoryNumber: "INV-2024-006", rfid: "RF45897F", model: "iMac 24", serial: "IM24P8L", status: "Sin asignar", type: "Desktops" },
  { inventoryNumber: "INV-2024-007", rfid: "RF45898G", model: "Dell OptiPlex 7090", serial: "DO709M5", status: "Sin asignar", type: "Desktops" },
  { inventoryNumber: "INV-2024-008", rfid: "RF45899H", model: "iPad Pro 12.9", serial: "IP129R4", status: "Sin asignar", type: "Tablets" },
  { inventoryNumber: "INV-2024-009", rfid: "RF45900I", model: "Samsung Galaxy Tab S8", serial: "SGT8K6", status: "Sin asignar", type: "Tablets" },
  { inventoryNumber: "INV-2024-010", rfid: "RF45901J", model: "Asus ROG Zephyrus", serial: "RZ15N8", status: "Sin asignar", type: "Gaming" },
  { inventoryNumber: "INV-2024-011", rfid: "RF45902K", model: "HP ZBook Studio", serial: "ZS156P3", status: "Sin asignar", type: "Workstations" },
  { inventoryNumber: "INV-2024-012", rfid: "RF45903L", model: "Lenovo Legion 5", serial: "LL5X7M2", status: "Sin asignar", type: "Gaming" },
  { inventoryNumber: "INV-2024-013", rfid: "RF45904M", model: "Microsoft Surface Pro 8", serial: "SP8Q4W9", status: "Sin asignar", type: "Tablets" },
  { inventoryNumber: "INV-2024-014", rfid: "RF45905N", model: "Acer Predator", serial: "AP21J6K", status: "Sin asignar", type: "Gaming" },
  { inventoryNumber: "INV-2024-015", rfid: "RF45906O", model: "MSI Creator Z16", serial: "MCZ16L5", status: "Sin asignar", type: "Workstations" },
];

function groupByType(equipment: Equipment[]): EquipmentGroup[] {
  const groups = equipment.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, Equipment[]>);

  return Object.entries(groups).map(([type, equipment]) => ({
    type,
    equipment: equipment.sort((a, b) => a.inventoryNumber.localeCompare(b.inventoryNumber))
  }));
}

export function EquipmentList() {
  const [expandedTypes, setExpandedTypes] = useState<string[]>([]);
  const groupedEquipment = groupByType(equipmentData);

  const toggleType = (type: string) => {
    setExpandedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-blue-600 mb-4">Equipos Sin Asignar</h3>
      <div className="space-y-4">
        {groupedEquipment.map((group) => (
          <div key={group.type} className="border rounded-lg">
            <button
              onClick={() => toggleType(group.type)}
              className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-t-lg"
            >
              <div className="flex items-center">
                <span className="font-medium text-gray-700">{group.type}</span>
                <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
                  {group.equipment.length}
                </span>
              </div>
              {expandedTypes.includes(group.type) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {expandedTypes.includes(group.type) && (
              <div className="overflow-auto max-h-[300px]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Inventario</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RFID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {group.equipment.map((item) => (
                      <tr key={item.inventoryNumber} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.inventoryNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.rfid}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.model}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.serial}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            {item.status}
                          </span>
                        </td>
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