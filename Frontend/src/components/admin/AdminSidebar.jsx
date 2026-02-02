


import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  LogOut, 
  User,
  Settings,
  ChevronRight
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin/dashboard" },
    { name: "Orders", icon: <ShoppingCart size={18} />, path: "/admin/orders" }, 
    { name: "Products", icon: <Package size={18} />, path: "/admin/products" },
  ];

  return (
    <aside className="w-72 bg-[#6B4226] text-white flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.05)] min-h-screen sticky top-0 border-r border-white/5">
      
      {/* --- LOGO SECTION --- */}
      <div className="p-10">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5A8B05] rounded-xl flex items-center justify-center shadow-lg shadow-[#5A8B05]/20">
                <Package size={20} className="text-white" />
            </div>
            <div>
                <h2 className="text-2xl font-black tracking-tighter leading-none">
                    PetNest
                </h2>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#5A8B05]">System Admin</span>
            </div>
        </div>
      </div>

      {/* --- MENU SECTION --- */}
      <div className="px-6 mb-4">
        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-4 mb-4">Main Menu</p>
        <nav className="space-y-1.5">
            {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
                <Link
                key={item.name}
                to={item.path}
                className={`group relative w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                    isActive
                    ? "bg-[#5A8B05] text-white shadow-xl shadow-[#5A8B05]/20 translate-x-2"
                    : "text-stone-400 hover:bg-white/5 hover:text-white"
                }`}
                >
                <div className="flex items-center gap-4">
                    <span className={`${isActive ? "text-white" : "text-stone-500 group-hover:text-[#5A8B05]"} transition-colors`}>
                        {item.icon}
                    </span>
                    <span className="tracking-tight">{item.name}</span>
                </div>
                
                {isActive && (
                    <div className="bg-white/20 p-1 rounded-lg">
                        <ChevronRight size={12} />
                    </div>
                )}
                </Link>
            );
            })}
        </nav>
      </div>

      {/* --- SECONDARY SECTION --- */}
      {/* <div className="px-6 mt-8">
        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-4 mb-4">Preferences</p>
        <div className="space-y-1">
            <button className="w-full flex items-center gap-4 px-5 py-3 rounded-2xl font-bold text-sm text-stone-400 hover:bg-white/5 hover:text-white transition-all">
                <Settings size={18} /> Settings
            </button>
        </div>
      </div> */}

      {/* --- FOOTER / PROFILE SECTION --- */}
      {/* <div className="mt-auto p-6">
        <div className="bg-black/10 rounded-[2rem] p-4 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5A8B05] to-[#86b33a] flex items-center justify-center border-2 border-[#6B4226]">
                    <User size={18} className="text-white" />
                </div>
                <div className="overflow-hidden">
                    <p className="text-xs font-black truncate">Admin Staff</p>
                    <p className="text-[9px] text-stone-400 font-bold truncate">support@petnest.com</p>
                </div>
            </div> */}
            
            {/* <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-rose-500/10 hover:text-rose-400 text-stone-400 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all group">
                <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" /> 
                Sign Out
            </button> */}
        {/* </div> */}
      {/* </div> */}

      {/* SubtlePaw Decorative Element */}
      <div className="absolute bottom-0 right-0 opacity-[0.03] pointer-events-none">
          <ShoppingCart size={200} />
      </div>
    </aside>
  );
};

export default AdminSidebar;