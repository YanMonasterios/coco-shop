import { useState } from "react";
import { Outlet } from "react-router"; // <--- 1. IMPORTANTE: Importar Outlet
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminHeader } from "../components/AdminHeader";

const AdminLayouts = () => {
   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
      <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden"> {/* Fix de scroll */}
        <AdminHeader />
        
        <main className="flex-1 p-6 overflow-auto"> 
           {/* 2. IMPORTANTE: Aquí se renderizan tus páginas hijas */}
           <Outlet /> 
        </main>
      </div>
    </div>  
  )
}

export default AdminLayouts;
