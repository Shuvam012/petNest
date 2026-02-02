


import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { 
  ShoppingCart, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Menu, 
  X, 
  ShieldCheck 
} from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import { useCartContext } from "../../context/CartContext";
import logo from "../../assets/2-pet.png";

const Navbar = () => {
  const { user, isAdmin, logout } = useAuthContext();
  const { cartCount } = useCartContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeLink = "text-[#5A8B05] bg-[#5A8B05]/5 px-4 py-2 rounded-xl font-black transition-all";
  const inactiveLink = "text-stone-500 px-4 py-2 font-bold hover:text-[#6B4226] transition-all duration-300 hover:bg-stone-50 rounded-xl";

  return (
    <nav className="bg-white/90 backdrop-blur-xl sticky top-0 z-[100] border-b border-stone-100/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
        
        {/* --- LOGO AREA (Corrected) --- */}
        <Link to="/" className="flex items-center group  py-2">
          <div className="relative h-full flex items-center">
            <img
              src={logo}
              
              alt="PetNest"
              className="h-35 max-h-[140%] w-auto object-contain transition-all duration-500 group-hover:scale-105 group-hover:rotate-2"
            />
            {/* Soft glow behind the corrected logo */}
            <div className="absolute inset-0 bg-[#5A8B05]/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>
        </Link>

        {/* --- CENTRAL NAVIGATION (Desktop) --- */}
        <div className="hidden lg:flex items-center gap-2 p-1 bg-stone-50/50 rounded-2xl border border-stone-100">
          <NavLink to="/" className={({ isActive }) => isActive ? activeLink : inactiveLink}>
            Home
          </NavLink>
          
          <NavLink to="/products" className={({ isActive }) => isActive ? activeLink : inactiveLink}>
            Products
          </NavLink>

          {user && (
            <NavLink to="/orders" className={({ isActive }) => isActive ? activeLink : inactiveLink}>
              Orders
            </NavLink>
          )}

           <NavLink to="/about" className={({ isActive }) => isActive ? activeLink : inactiveLink}>
            About Us
          </NavLink>


        </div>

        {/* --- ACTION AREA --- */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Admin Dashboard Quick Link */}
          {isAdmin && (
            <Link 
              to="/admin/dashboard" 
              className="hidden md:flex items-center gap-2 text-white font-black bg-[#6B4226] px-4 py-2 rounded-xl text-[10px] tracking-widest hover:bg-[#5A8B05] transition-all shadow-md active:scale-95"
            >
              <LayoutDashboard size={14} />
              DASHBOARD
            </Link>
          )}

          {/* CART ICON */}
          <NavLink
            to={user ? "/cart" : "/login"}
            className={({ isActive }) => 
              `relative p-3 rounded-2xl transition-all duration-300 flex items-center justify-center ${
                isActive ? "bg-[#5A8B05] text-white shadow-lg shadow-[#5A8B05]/20" : "text-stone-600 hover:bg-stone-100"
              }`
            }
          >
            <ShoppingCart size={20} strokeWidth={2.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-bounce">
                {cartCount}
              </span>
            )}
          </NavLink>

          <div className="h-8 w-[1px] bg-stone-200 mx-1 hidden sm:block"></div>

          {/* AUTH SECTION */}
          {!user ? (
            <Link
              to="/login"
              className="group flex items-center gap-2 bg-[#6B4226] text-white px-6 py-3 rounded-[1.2rem] text-xs font-black tracking-widest shadow-xl shadow-[#6B4226]/10 hover:bg-[#5A8B05] transition-all active:scale-95"
            >
              <User size={16} className="group-hover:rotate-12 transition-transform" />
              LOGIN
            </Link>
          ) : (
            <div className={`flex items-center gap-3 p-1.5 pr-4 rounded-[1.5rem] border transition-all ${
              isAdmin ? "bg-orange-50 border-orange-200" : "bg-stone-50 border-stone-100 shadow-sm"
            }`}>
              {/* Profile Avatar */}
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-inner ${
                isAdmin ? "bg-gradient-to-tr from-orange-500 to-amber-400" : "bg-gradient-to-tr from-[#5A8B05] to-[#86b33a]"
              }`}>
                {isAdmin ? <ShieldCheck size={18} strokeWidth={2.5} /> : <User size={18} strokeWidth={3} />}
              </div>
              
              <div className="hidden sm:block">
                <p className="text-[9px] font-black text-stone-400 uppercase tracking-tighter leading-none">
                  {isAdmin ? "System" : "Hello,"}
                </p>
                <p className={`text-xs font-black truncate max-w-[80px] ${isAdmin ? "text-orange-700" : "text-[#6B4226]"}`}>
                  {isAdmin ? "Admin" : (user.username?.split(' ')[0] || 'Parent')}
                </p>
              </div>

              <button
                onClick={logout}
                className="ml-1 p-2 text-stone-400 hover:text-rose-500 hover:bg-white rounded-xl transition-all duration-300 group"
                title="Logout"
              >
                <LogOut size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-100 p-6 space-y-4 shadow-xl animate-in slide-in-from-top-5 duration-300">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold text-stone-600 hover:text-[#5A8B05]">Home</NavLink>
          <NavLink to="/products" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold text-stone-600 hover:text-[#5A8B05]">Products</NavLink>
          {user && <NavLink to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold text-stone-600 hover:text-[#5A8B05]">Orders</NavLink>}
          {isAdmin && <NavLink to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-black text-orange-600">Admin Dashboard</NavLink>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;