import { useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/auth/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router';

export const ChangePasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/change-password', { newPassword });
      // Forzamos logout para que entre limpio con la nueva clave
      alert('Contraseña actualizada. Por favor ingresa nuevamente.');
      logout();
      navigate('/auth/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al cambiar contraseña');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Cambio de Contraseña Obligatorio</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nueva Contraseña</label>
              <Input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required 
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">Actualizar y Salir</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
