import React from 'react';
import { Plus, UserPlus } from 'lucide-react';
import { Link } from 'react-router'; // Importamos Link

const QuickActions: React.FC = () => {
  // Definimos solo las acciones que tu sistema soporta actualmente
  const actions = [
    { 
      icon: Plus, 
      label: 'Nuevo Producto', 
      color: 'bg-blue-600 hover:bg-blue-700',
      to: '/admin/products/new' // Ruta real
    },
    { 
      icon: UserPlus, 
      label: 'Registrar Usuario', 
      color: 'bg-purple-600 hover:bg-purple-700',
      to: '/admin/users/new' // Ruta real
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={action.to}
              className={`flex items-center space-x-3 p-4 rounded-lg text-white transition-all shadow-sm hover:shadow-md ${action.color}`}
            >
              <div className="p-2 bg-white/20 rounded-full">
                <Icon size={20} />
              </div>
              <span className="font-medium">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
