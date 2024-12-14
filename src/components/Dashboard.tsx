import React from 'react';
import { BarChart } from 'lucide-react';
import { EquipmentList } from './EquipmentList';
import { MonthlyEquipmentList } from './MonthlyEquipmentList';
import { LocationEquipmentList } from './LocationEquipmentList';
import { WarrantyEquipmentList } from './WarrantyEquipmentList';

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
      {/* Stats */}
      <div className="col-span-12 grid grid-cols-2 gap-6">
        <StatCard title="Equipos En Stock" value="15" />
        <StatCard title="Equipos En Total" value="35" />
      </div>

      {/* Monthly Equipment List */}
      <div className="col-span-12">
        <MonthlyEquipmentList />
      </div>

      {/* Location Equipment List */}
      <div className="col-span-12">
        <LocationEquipmentList />
      </div>

      {/* Warranty Equipment List */}
      <div className="col-span-12">
        <WarrantyEquipmentList />
      </div>

      {/* Equipment List */}
      <div className="col-span-12">
        <EquipmentList />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-blue-600 mb-2">{title}</h3>
      <p className="text-4xl font-bold text-green-600">{value}</p>
    </div>
  );
}