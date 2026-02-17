import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Link } from 'react-router'; 
import { Plus, Search, Package, Trash2 } from 'lucide-react'; // <--- 1. Importar Trash2

interface Product {
  id: number;
  name: string;
  expiration: string;
  type: { id: number; name: string };
}

export const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (error) {
      console.error('Error cargando productos', error);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. Lógica de Eliminación ---
  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este coco?')) return;

    try {
      await api.delete(`/products/${id}`); // Llama a tu nuevo endpoint
      
      // Actualizamos la tabla localmente sin recargar
      setProducts(prev => prev.filter(p => p.id !== id));
      alert('Producto eliminado');
    } catch (error) {
      alert('Error al eliminar. Verifica tus permisos.');
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="text-blue-600" /> Inventario de Cocos
          </h2>
          <p className="text-gray-500 text-sm mt-1">Gestiona el stock y vencimientos.</p>
        </div>
        
        <Link 
          to="/admin/products/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Nuevo Producto</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
             <div className="p-10 text-center text-gray-500">Cargando datos...</div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 font-semibold">Producto</th>
                  <th className="px-6 py-3 font-semibold">Tipo</th>
                  <th className="px-6 py-3 font-semibold">Vencimiento</th>
                  <th className="px-6 py-3 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                        {product.type.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(product.expiration).toLocaleDateString()}
                    </td>
                    
                    {/* --- 3. Botones de Acción --- */}
                    <td className="px-6 py-4 text-right flex justify-end gap-3 items-center">
                      <Link to={`/admin/products/${product.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                        Editar
                      </Link>
                      
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Eliminar producto"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>

                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No hay productos registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
