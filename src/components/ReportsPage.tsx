import React, { useState } from 'react';
import { Home, Download } from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyData {
  month: string;
  amount: string;
  units: string;
  percentage: string;
  revenue: string;
  cost: string;
}

const monthlyData: MonthlyData[] = [
  { month: 'nov 2024', amount: '855.9 mil', units: '10.1 mil', percentage: '1.17 %', revenue: '$3,985.5', cost: '$0.4' },
  { month: 'oct 2024', amount: '711 mil', units: '8.1 mil', percentage: '1.14 %', revenue: '$4,423.48', cost: '$0.55' },
  { month: 'sept 2024', amount: '619.5 mil', units: '6.3 mil', percentage: '1.02 %', revenue: '$3,388.19', cost: '$0.54' },
  { month: 'ago 2024', amount: '659.8 mil', units: '6.4 mil', percentage: '0.98 %', revenue: '$3,880.12', cost: '$0.6' },
  { month: 'jul 2024', amount: '648.4 mil', units: '6.1 mil', percentage: '0.93 %', revenue: '$5,072.04', cost: '$0.84' },
  { month: 'jun 2024', amount: '524.6 mil', units: '5.7 mil', percentage: '1.09 %', revenue: '$4,544.11', cost: '$0.79' },
];

export function ReportsPage() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const pieChartData = {
    labels: ['Asignados', 'Sin Asignar', 'En Mantenimiento'],
    datasets: [
      {
        data: [50, 40, 10],
        backgroundColor: ['#4A90E2', '#F5A623', '#B8E986'],
        borderWidth: 0,
      },
    ],
  };

  const lineChartData = {
    labels: monthlyData.map(data => data.month).reverse(),
    datasets: [
      {
        label: 'Equipos',
        data: monthlyData.map(data => parseFloat(data.units.split(' ')[0])).reverse(),
        borderColor: '#4A90E2',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
        {/* Filters Section */}
        <div className="col-span-3">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">FILTROS</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mes</label>
                <select
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="">Seleccionar mes</option>
                  {monthlyData.map(data => (
                    <option key={data.month} value={data.month}>{data.month}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">Todos los tipos</option>
                  <option value="laptop">Laptops</option>
                  <option value="desktop">Desktops</option>
                  <option value="tablet">Tablets</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rango De Fecha</label>
                <select
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                >
                  <option value="">Seleccionar rango</option>
                  <option value="last-month">Último mes</option>
                  <option value="last-quarter">Último trimestre</option>
                  <option value="last-year">Último año</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sede</label>
                <select
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">Todas las sedes</option>
                  <option value="bogota">Bogotá</option>
                  <option value="medellin">Medellín</option>
                  <option value="cali">Cali</option>
                </select>
              </div>

              <div className="pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Exportar</label>
                <div className="flex space-x-2">
                  <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center space-x-1">
                    <Download size={16} />
                    <span>CSV</span>
                  </button>
                  <button className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center space-x-1">
                    <Download size={16} />
                    <span>XLSX</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Section */}
        <div className="col-span-9">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">REPORTE GENERADO</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="h-64">
                <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
              </div>
              <div className="h-64">
                <Line 
                  data={lineChartData} 
                  options={{ 
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }} 
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha de Ingreso
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cantidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unidades
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Porcentaje
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ingresos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Costo
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {monthlyData.map((data) => (
                    <tr key={data.month} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.month}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.units}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.percentage}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.revenue}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}