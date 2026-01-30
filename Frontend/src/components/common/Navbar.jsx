
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import logo from "../../assets/2.png";

const Navbar = () => {
  const { user, isAdmin, logout } = useAuthContext();

  const activeLink =
    "text-[#5A8B05] font-bold border-b-2 border-[#5A8B05]";
  const inactiveLink =
    "text-gray-600 hover:text-[#5A8B05] transition-colors duration-300";

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="PetNest Logo"
            className="h-12 w-auto object-contain transition-transform duration-300 hover:rotate-2"
          />
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8 text-sm uppercase tracking-wide">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeLink : inactiveLink
            }
          >
            Home
          </NavLink>

         

          {user && (
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive ? activeLink : inactiveLink
              }
            >
              Orders
            </NavLink>
          )}

          {isAdmin && (
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive ? activeLink : inactiveLink
              }
            >
              Admin
            </NavLink>
          )}


           {/* Cart – ALWAYS visible */}
          <NavLink
            to={user ? "/cart" : "/login"}
            className={({ isActive }) =>
              `relative ${isActive ? activeLink : inactiveLink}`
            }
          >
            <ShoppingCart className="w-5 h-5" />
          </NavLink>

          {/* Auth Section */}
          <div className="flex items-center gap-4 ml-4 border-l pl-6 border-gray-200">
            {!user ? (
              <NavLink
                to="/login"
                className="bg-[#5A8B05] text-white px-5 py-2 rounded-full text-xs font-bold shadow-md hover:bg-[#4A7204] transition-all transform hover:-translate-y-0.5"
              >
                LOGIN
              </NavLink>
            ) : (
              <button
                onClick={logout}
                className="text-[#6B4226] border border-[#6B4226] px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#6B4226] hover:text-white transition-all"
              >
                LOGOUT
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;



