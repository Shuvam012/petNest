

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, Package, LogOut } from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
    { name: "Orders", icon: <ShoppingCart size={20} />, path: "/admin/orders" }, 
    { name: "Products", icon: <Package size={20} />, path: "/admin/products" },
  ];

  return (
    /* Removed 'fixed' and 'h-full'. Added 'min-h-[80vh]' to keep it tall */
    <aside className="w-64 bg-[#6B4226] text-white flex flex-col shadow-2xl min-h-[80vh] rounded-r-[1rem] my-0.5">
      <div className="p-8">
        <h2 className="text-2xl font-black tracking-tighter italic">
          PetNest <span className="text-[#5A8B05]">Admin</span>
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                isActive
                  ? "bg-[#5A8B05] text-white shadow-lg scale-105"
                  : "text-stone-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          );
        })}
      </nav>

      {/* <div className="p-6 border-t border-white/5 mt-auto">
         <button className="flex items-center gap-4 text-stone-400 hover:text-red-400 font-bold text-sm transition-colors w-full px-4 py-2">
           <LogOut size={20} /> Logout
         </button>
      </div> */}
    </aside>
  );
};

export default AdminSidebar;