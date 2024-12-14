import React from 'react';
import { X } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Ayuda - RL Inventory</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-medium text-blue-600 mb-2">Inicio de Sesión</h3>
              <p className="text-gray-600">
                Para acceder al sistema, ingrese su nombre de usuario y contraseña en la pantalla de inicio de sesión.
                Si tiene problemas para acceder, contacte al administrador del sistema.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-blue-600 mb-2">Navegación Principal</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Inventario:</strong> Gestione todos los equipos tecnológicos.</li>
                <li><strong>Usuarios:</strong> Administre usuarios y roles del sistema.</li>
                <li><strong>Reportes:</strong> Acceda a estadísticas y reportes detallados.</li>
                <li><strong>Configuración:</strong> Personalice las opciones del sistema.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium text-blue-600 mb-2">Gestión de Equipos</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Agregar Equipo:</strong> Use el botón "Nuevo Equipo" para registrar dispositivos.</li>
                <li><strong>Eliminar Equipo:</strong> Seleccione el equipo y use el botón "Eliminar Equipo".</li>
                <li><strong>Asignación:</strong> Asigne equipos a usuarios desde la lista de equipos.</li>
                <li><strong>Garantías:</strong> Monitoree el estado de las garantías de los equipos.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium text-blue-600 mb-2">Reportes y Estadísticas</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Filtros:</strong> Use los filtros para personalizar los reportes.</li>
                <li><strong>Exportación:</strong> Exporte datos en formatos CSV o XLSX.</li>
                <li><strong>Gráficos:</strong> Visualice datos mediante gráficos interactivos.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium text-blue-600 mb-2">Soporte Técnico</h3>
              <p className="text-gray-600">
                Para asistencia técnica, contacte al departamento de TI:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Email: soporte@rlinventory.com</li>
                <li>Teléfono: (123) 456-7890</li>
                <li>Horario: Lunes a Viernes, 8:00 AM - 6:00 PM</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}