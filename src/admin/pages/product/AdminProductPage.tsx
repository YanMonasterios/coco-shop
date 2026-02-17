import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id; // Si hay ID, es edición (Aunque el backend solo hicimos CREATE por ahora)

  const [formData, setFormData] = useState({
    name: '',
    expiration: '',
    typeId: ''
  });
  const [types, setTypes] = useState<any[]>([]); // Tipos de coco
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1. Cargar tipos de coco para el select
    const loadTypes = async () => {
        try {
            const { data } = await api.get('/product-types'); // Endpoint auxiliar que creamos
            setTypes(data);
        } catch (e) {
            console.error("Error cargando tipos", e);
        }
    };
    loadTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        // Formatear fecha para que coincida con lo que espera prisma
        await api.post('/products', formData);
        alert('Producto creado con éxito');
        navigate('/admin/products');
    } catch (error) {
        alert('Permiso insuficiente o error al guardar');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Editar Coco' : 'Registrar Nuevo Coco'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-2">
              <Label>Nombre del Producto</Label>
              <Input 
                placeholder="Ej: Coco Premium Seleccionado" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo de Producto</Label>
              <select 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={formData.typeId}
                onChange={e => setFormData({...formData, typeId: e.target.value})}
                required
              >
                <option value="">Seleccione un tipo...</option>
                {types.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Fecha de Vencimiento</Label>
              <Input 
                type="date" 
                value={formData.expiration}
                onChange={e => setFormData({...formData, expiration: e.target.value})}
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" type="button" onClick={() => navigate('/admin/products')}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar Producto'}
                </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};
