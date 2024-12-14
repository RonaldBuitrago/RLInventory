import React, { useState } from 'react';
import { Moon, Sun, Layout, Globe, Database, Bell } from 'lucide-react';

interface SettingsSection {
  title: string;
  icon: React.ReactNode;
  settings: Setting[];
}

interface Setting {
  id: string;
  label: string;
  type: 'toggle' | 'select' | 'button';
  options?: string[];
  value?: any;
}

export function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [tableRows, setTableRows] = useState('10');
  const [notifications, setNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  const settingsSections: SettingsSection[] = [
    {
      title: 'Apariencia',
      icon: <Layout className="h-5 w-5" />,
      settings: [
        {
          id: 'darkMode',
          label: 'Modo Oscuro',
          type: 'toggle',
          value: darkMode
        },
        {
          id: 'compactView',
          label: 'Vista Compacta',
          type: 'toggle',
          value: false
        }
      ]
    },
    {
      title: 'Idioma y Región',
      icon: <Globe className="h-5 w-5" />,
      settings: [
        {
          id: 'language',
          label: 'Idioma',
          type: 'select',
          options: ['Español', 'English', 'Português'],
          value: language
        },
        {
          id: 'dateFormat',
          label: 'Formato de Fecha',
          type: 'select',
          options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'],
          value: 'DD/MM/YYYY'
        }
      ]
    },
    {
      title: 'Visualización de Datos',
      icon: <Layout className="h-5 w-5" />,
      settings: [
        {
          id: 'tableRows',
          label: 'Filas por Tabla',
          type: 'select',
          options: ['10', '25', '50', '100'],
          value: tableRows
        },
        {
          id: 'chartType',
          label: 'Tipo de Gráfico Predeterminado',
          type: 'select',
          options: ['Barras', 'Líneas', 'Circular'],
          value: 'Barras'
        }
      ]
    },
    {
      title: 'Notificaciones',
      icon: <Bell className="h-5 w-5" />,
      settings: [
        {
          id: 'notifications',
          label: 'Notificaciones Activas',
          type: 'toggle',
          value: notifications
        },
        {
          id: 'emailNotifications',
          label: 'Notificaciones por Email',
          type: 'toggle',
          value: true
        }
      ]
    },
    {
      title: 'Copias de Seguridad',
      icon: <Database className="h-5 w-5" />,
      settings: [
        {
          id: 'autoBackup',
          label: 'Copia de Seguridad Automática',
          type: 'toggle',
          value: autoBackup
        },
        {
          id: 'backup',
          label: 'Realizar Copia de Seguridad',
          type: 'button'
        },
        {
          id: 'restore',
          label: 'Restaurar Copia de Seguridad',
          type: 'button'
        }
      ]
    }
  ];

  const handleSettingChange = (sectionId: string, settingId: string, value: any) => {
    switch (settingId) {
      case 'darkMode':
        setDarkMode(value);
        break;
      case 'language':
        setLanguage(value);
        break;
      case 'tableRows':
        setTableRows(value);
        break;
      case 'notifications':
        setNotifications(value);
        break;
      case 'autoBackup':
        setAutoBackup(value);
        break;
      case 'backup':
        console.log('Iniciando copia de seguridad...');
        break;
      case 'restore':
        console.log('Restaurando copia de seguridad...');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Configuración</h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {settingsSections.map((section) => (
                <div key={section.title} className="border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    {section.icon}
                    <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {section.settings.map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                          {setting.label}
                        </label>

                        {setting.type === 'toggle' && (
                          <button
                            onClick={() => handleSettingChange(section.title, setting.id, !setting.value)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                              setting.value ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                setting.value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        )}

                        {setting.type === 'select' && (
                          <select
                            value={setting.value}
                            onChange={(e) => handleSettingChange(section.title, setting.id, e.target.value)}
                            className="mt-1 block w-48 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                          >
                            {setting.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}

                        {setting.type === 'button' && (
                          <button
                            onClick={() => handleSettingChange(section.title, setting.id, null)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            {setting.label}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}