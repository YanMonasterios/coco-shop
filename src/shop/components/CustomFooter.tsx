import {CreditCard } from "lucide-react"


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
          </div>
        </div>
      </div>
    </footer>
  )
}


