import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router';
import { api } from '@/lib/api';
import { useAuth } from '@/auth/context/AuthContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data } = await api.post('/auth/login', formData);
      
      // Guardar en contexto
      login(data.token, data.user, data.mustChangePass);

      // Redirección inteligente
      if (data.mustChangePass) {
        navigate('/auth/change-password');
      } else {
        navigate('/admin');
      }

    } catch (err: any) {
      // Mensajes específicos (Bloqueo o credenciales)
      setError(err.response?.data?.error || 'Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={'flex flex-col gap-6'}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <span className="font-bold text-2xl">COCOS APP</span>
                <p className="text-balance text-muted-foreground">Sistema de Inventario</p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email">Correo</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@cocos.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Ingresando...' : 'Ingresar'}
              </Button>
            </div>
          </form>
          
          <div className="relative hidden bg-muted md:block bg-zinc-900 text-white p-10">
             <div className="h-full flex items-center justify-center">
                <h2 className="text-3xl font-light">Sin cocos no hay paraíso.</h2>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
