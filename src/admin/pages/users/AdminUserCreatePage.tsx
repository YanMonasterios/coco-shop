import { useState } from 'react';
import { useNavigate } from 'react-router';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const AdminUserCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'VIEWER' // Valor por defecto
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/users', formData);
      alert('Usuario creado. Deberá cambiar su contraseña al ingresar.');
      navigate('/admin/users');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error creando usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Registrar Nuevo Colaborador</CardTitle>
          <CardDescription>
            El usuario deberá cambiar su contraseña en el primer inicio de sesión.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-2">
              <Label>Nombre Completo</Label>
              <Input 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Juan Pérez"
              />
            </div>

            <div className="space-y-2">
              <Label>Correo Electrónico</Label>
              <Input 
                type="email" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="juan@cocos.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Contraseña Temporal</Label>
              <Input 
                type="text" 
                required 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                placeholder="Ej: Temporal123"
              />
            </div>

            <div className="space-y-2">
              <Label>Rol / Permisos</Label>
              <select 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
              >
                <option value="VIEWER">Viewer (Solo ver)</option>
                <option value="EDITOR">Editor (Crear productos)</option>
                <option value="ADMIN">Admin (Todo)</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => navigate('/admin/users')}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Creando...' : 'Crear Usuario'}
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};
