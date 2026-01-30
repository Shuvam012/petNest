





import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../../assets/2.png';

const Footer = () => {
  return (
    <footer className="bg-[#6B4226] text-[#FAFAF5] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Grid Container - Changed to 4 columns to fit everything */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* 1. Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 bg-white p-2 rounded-lg w-fit">
              <img src={logo} alt="PetNest Logo" className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-gray-200 leading-relaxed">

              Your one-stop destination for pet essentials, food, toys,
              and care products.
              {/* Providing a safe nest for your beloved pets. From premium supplies to caring adoptions. */}
            </p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-[#5A8B05] transition-colors" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-[#5A8B05] transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-[#5A8B05] transition-colors" />
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-[#5A8B05] pb-2 w-fit">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-gray-200">
              <li><Link to="/" className="hover:text-[#5A8B05] transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-[#5A8B05] transition-colors">Shop Products</Link></li>
              <li><Link to="/about" className="hover:text-[#5A8B05] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#5A8B05] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* 3. Account Column */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-[#5A8B05] pb-2 w-fit">
              Account
            </h4>
            <ul className="space-y-3 text-sm text-gray-200">
              <li><Link to="/login" className="hover:text-[#5A8B05]">Login</Link></li>
              <li><Link to="/register" className="hover:text-[#5A8B05]">Sign Up</Link></li>
              <li><Link to="/orders" className="hover:text-[#5A8B05]">My Orders</Link></li>
            </ul>
          </div>

          {/* 4. Contact Info - Now inside the grid */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-[#5A8B05] pb-2 w-fit">
              Get in Touch
            </h4>
            <ul className="space-y-4 text-sm text-gray-200">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#5A8B05] shrink-0" />
                <span>123 Pet Lane, Pawsome City, PC 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#5A8B05] shrink-0" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#5A8B05] shrink-0" />
                <span>support@petnest.com</span>
              </li>
            </ul>
          </div>

        </div> {/* End of Grid */}

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2026 PetNest MERN Stack Project. All rights reserved.</p>
          <span>Designed with ❤️ for Pets</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;