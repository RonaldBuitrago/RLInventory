import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

interface DeleteEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (equipmentData: DeleteEquipmentData) => void;
}

export interface DeleteEquipmentData {
  inventoryNumber: string;
  serial: string;
  confirmDelete: boolean;
}

export function DeleteEquipmentModal({ isOpen, onClose, onDelete }: DeleteEquipmentModalProps) {
  const [formData, setFormData] = useState<DeleteEquipmentData>({
    inventoryNumber: '',
    serial: '',
    confirmDelete: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.confirmDelete) {
      onDelete(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Eliminar Equipo</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Inventario
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="INV-2024-XXX"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.inventoryNumber}
                  onChange={(e) => setFormData({ ...formData, inventoryNumber: e.target.value })}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Serial
              </label>
              <input
                type="text"
                required
                placeholder="Ingrese el serial del equipo"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.serial}
                onChange={(e) => setFormData({ ...formData, serial: e.target.value })}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="confirmDelete"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                checked={formData.confirmDelete}
                onChange={(e) => setFormData({ ...formData, confirmDelete: e.target.checked })}
              />
              <label htmlFor="confirmDelete" className="ml-2 block text-sm text-gray-900">
                Confirmo que deseo eliminar este equipo permanentemente
              </label>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!formData.confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Eliminar Equipo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}