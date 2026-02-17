import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import StatCard from '@/admin/components/StatCard';
import Chart from '@/admin/components/Chart';
import QuickActions from '@/admin/components/QuickActions';
import { Package, Users, BarChart } from 'lucide-react';

export const Dashboard = () => {
  // Estado para guardar los datos reales
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    chartData: [] as { label: string; value: number }[]
  });
  const [loading, setLoading] = useState(true);

  // Cargar datos al entrar
  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await api.get('/dashboard');
        setStats(data);
      } catch (error) {
        console.error('Error cargando dashboard', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Cargando estadísticas...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Resumen General</h2>
      
      {/* Tarjetas Superiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Productos" 
          value={stats.totalProducts.toString()} 
          change="Inventario Global" 
          changeType="neutral" 
          icon={Package} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Usuarios / Colaboradores" 
          value={stats.totalUsers.toString()} 
          change="Equipo Activo" 
          changeType="positive" 
          icon={Users} 
          color="bg-purple-500" 
        />
        <StatCard 
          title="Tipos de Coco" 
          value={stats.chartData.length.toString()} 
          change="Categorías" 
          changeType="neutral" 
          icon={BarChart} 
          color="bg-green-500" 
        />
      </div>

      {/* Sección Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Izquierda (2/3) - Gráfica y Acciones */}
        <div className="lg:col-span-2 space-y-6">
          {/* Le pasamos los datos reales del backend a tu Chart */}
          <Chart title="Inventario por Tipo" data={stats.chartData} />
          
          {/* Acciones Rápidas Funcionales */}
          <QuickActions />
        </div>
      </div>
    </div>
  );
};
