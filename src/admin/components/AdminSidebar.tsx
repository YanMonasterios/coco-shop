import { Link, useLocation } from 'react-router';
import {
  Home,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut // Importamos icono para salir
} from 'lucide-react';
import { useAuth } from '@/auth/context/AuthContext'; // <--- IMPORTANTE

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const AdminSidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
}) => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth(); // <--- Traemos los datos reales

  const menuItems = [
    { icon: Home, label: 'Inicio', to: '/admin' },
    { icon: BarChart3, label: 'Productos', to: '/admin/products' },
    { icon: Users, label: 'Usuarios', to: '/admin/users' }, // <--- AQUI ESTABA EL ERROR DE NAVEGACION
  ];

  const isActiveRoute = (to: string) => {
    if (to === '/admin' && pathname === '/admin') return true;
    if (to !== '/admin' && pathname.startsWith(to)) return true;
    return false;
  };

  // Obtener iniciales del usuario real
  const getInitials = (name: string) => {
    return name ? name.substring(0, 2).toUpperCase() : 'U';
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col h-screen sticky top-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between h-16">
        {!isCollapsed && <span className="font-bold text-xl text-blue-600">COCOS APP</span>}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <Link
                  to={item.to}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                    isActiveRoute(item.to)
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile (Footer) */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
          
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
            {getInitials(user?.name || '')}
          </div>
          
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'Usuario'}
              </p>
              <p className="text-xs text-gray-500 truncate" title={user?.email}>
                {user?.email}
              </p>
            </div>
          )}

          {!isCollapsed && (
             <button onClick={logout} title="Cerrar Sesión" className="text-gray-400 hover:text-red-500 transition-colors">
                <LogOut size={18} />
             </button>
          )}
        </div>
      </div>
    </div>
  );
};
