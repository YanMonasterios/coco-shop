import { Facebook, Instagram, Twitter, Mail, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"

export const CustomFooter = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800 mt-auto">
      <div className="container mx-auto px-4 lg:px-8 pt-16 pb-8">
        
        {/* --- GRID PRINCIPAL --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Columna 1: Marca y Redes */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              BODEGA <span className="text-yellow-400">LA COCADA</span>
            </h3>
            <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
              Llevando la frescura del trópico directamente a tu puerta. 
              Sin cocos no hay paraíso.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-yellow-400 transition-colors bg-zinc-900 p-2 rounded-full">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors bg-zinc-900 p-2 rounded-full">
                <Instagram size={18} />
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors bg-zinc-900 p-2 rounded-full">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Columna 2: Tienda */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Tienda</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/product/all" className="hover:text-yellow-400 transition-colors">Todos los Productos</Link></li>
              <li><Link to="/category/coco-fresco" className="hover:text-yellow-400 transition-colors">Coco Fresco</Link></li>
              <li><Link to="/category/aceites" className="hover:text-yellow-400 transition-colors">Aceites y Derivados</Link></li>
              <li><Link to="/category/postres" className="hover:text-yellow-400 transition-colors">Postres</Link></li>
            </ul>
          </div>

          {/* Columna 3: Soporte */}

          {/* Columna 4: Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Suscríbete</h4>
            <p className="text-sm text-zinc-400 mb-4">
              Recibe ofertas exclusivas y recetas con coco cada semana.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                <Input 
                  type="email" 
                  placeholder="tu@correo.com" 
                  className="pl-9 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-yellow-400"
                />
              </div>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                Suscribirse
              </Button>
            </div>
          </div>

        </div>

        {/* --- BARRA INFERIOR --- */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Bodega La Cocada. Todos los derechos reservados.
          </p>
          
          {/* Iconos de pago simulados */}
          <div className="flex items-center space-x-3 text-zinc-500">
             <span className="text-xs font-medium mr-2">Pagos seguros:</span>
             <CreditCard size={24} />
             {/* Puedes agregar SVGs reales de Visa/Mastercard aquí si prefieres */}
          </div>
        </div>
      </div>
    </footer>
  )
}


