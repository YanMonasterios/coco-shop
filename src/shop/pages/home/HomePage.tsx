import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { ShoppingBag, ArrowRight, Star, Truck, ShieldCheck } from "lucide-react"

export const HomePage = () => {
  return (
    // CAMBIO AQUÍ: Eliminado 'min-h-screen' para que la altura se ajuste al contenido
    <div className="flex flex-col w-full"> 
     
      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        {/* Imagen de Fondo con Overlay Mejorado */}
        <div className="absolute inset-0">
          <img
            src="/background.jpg"
            alt="Bodega La Cocada Background"
            className="h-full w-full object-cover object-center"
          />
          {/* Gradiente para mejorar lectura de texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        </div>

        {/* Contenido Central */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in-up space-y-6 max-w-3xl mx-auto">
           
            {/* Badge */}
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-wider uppercase mb-4">
              La frescura del trópico
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-lg">
              BODEGA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">
                LA COCADA
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
              "Sin cocos no hay paraíso". <br />
              Descubre nuestra selección premium de productos derivados del coco.
            </p>

            {/* Botones de Acción (Ejemplo restaurado) */}
             <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/product/all">
                <Button size="lg" className="w-full sm:w-auto text-lg h-12 px-8 bg-white text-black hover:bg-gray-100 font-semibold rounded-full transition-all hover:scale-105">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Comprar Ahora
                </Button>
              </Link>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <span className="text-white/50 text-sm">Descubre más</span>
        </div>
      </section>

      {/* Aquí podrías agregar más secciones (Categorías, etc.) y se pegarán inmediatamente al footer */}

    </div>
  )
}
