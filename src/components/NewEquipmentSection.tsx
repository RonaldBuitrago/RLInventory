import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { NewEquipmentModal, NewEquipment } from './NewEquipmentModal';
import { DeleteEquipmentModal, DeleteEquipmentData } from './DeleteEquipmentModal';

export function NewEquipmentSection() {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleNewEquipment = (equipment: NewEquipment) => {
    // Here you would typically handle the new equipment data
    console.log('New equipment:', equipment);
  };

  const handleDeleteEquipment = (equipmentData: DeleteEquipmentData) => {
    // Here you would handle the equipment deletion
    console.log('Delete equipment:', equipmentData);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-blue-600 mb-4">Gestión de Equipos</h3>
      <div className="space-y-3">
        <button
          onClick={() => setIsNewModalOpen(true)}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle size={20} />
          <span>Nuevo Equipo</span>
        </button>

        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Trash2 size={20} />
          <span>Eliminar Equipo</span>
        </button>
      </div>

      <NewEquipmentModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSubmit={handleNewEquipment}
      />

      <DeleteEquipmentModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteEquipment}
      />
    </div>
  );
}