



import { Link } from 'react-router-dom';
import {  Mail, Phone, MapPin, Heart, Github, Linkedin } from 'lucide-react';
import logo from '../../assets/1-pet.png';

const Footer = () => {
  return (
    <footer className="bg-[#3D2616] text-[#FAFAF5] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Main Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* 1. Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="inline-block    hover:scale-105 transition-transform ">
              <img src={logo} alt="PetNest Logo" className="h-25 w-auto object-contain" />
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed font-medium">
              Your one-stop destination for pet essentials, food, toys,
              and care products. Providing a <span className="text-white">safe nest</span> for your beloved pets.
            </p>
            <div className="flex gap-3">
              <a href="https://github.com/Shuvam012" target="_blank" rel="noopener noreferrer">
                <SocialIcon icon={<Github size={18} />} />
              </a>

              <a href="https://www.linkedin.com/in/shuvam-biswal-43ab99215/" target="_blank" rel="noopener noreferrer">
                <SocialIcon icon={<Linkedin size={18} />} />
              </a>
              <a href="mailto:shuvambiswal123@gmail.com">
                <SocialIcon icon={<Mail size={18} />} />
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="md:ml-auto">
            <h4 className="text-lg font-black mb-6 border-b-2 border-[#5A8B05] pb-2 w-fit tracking-tight">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm font-bold text-stone-400">
              <li><Link to="/" className="hover:text-[#5A8B05] hover:translate-x-1 inline-block transition-all">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#5A8B05] hover:translate-x-1 inline-block transition-all">About Us</Link></li>
              <li><Link className="hover:text-[#5A8B05] hover:translate-x-1 inline-block transition-all">Contact</Link></li>
            </ul>
          </div>

          {/* 3. Account Column */}
          <div className="md:ml-auto">
            <h4 className="text-lg font-black mb-6 border-b-2 border-[#5A8B05] pb-2 w-fit tracking-tight">
              Products
            </h4>
            <ul className="space-y-3 text-sm font-bold text-stone-400">
              <li><Link to="/products" className="hover:text-[#5A8B05] hover:translate-x-1 inline-block transition-all">Shop Products</Link></li>
              <li><Link to="/orders" className="hover:text-[#5A8B05] hover:translate-x-1 inline-block transition-all">My Orders</Link></li>
            </ul>
          </div>



          {/* 4. Contact Info */}
          <div>
            <h4 className="text-lg font-black mb-6 border-b-2 border-[#5A8B05] pb-2 w-fit tracking-tight">
              Get in Touch
            </h4>
            <ul className="space-y-5 text-sm font-bold text-stone-400">
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#5A8B05]/20 transition-colors">
                  <MapPin className="w-4 h-4 text-[#5A8B05]" />
                </div>
                <span className="group-hover:text-white transition-colors pt-1">123 Pet Lane, Pawsome City, PC 4567</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#5A8B05]/20 transition-colors">
                  <Phone className="w-4 h-4 text-[#5A8B05]" />
                </div>
                <span className="group-hover:text-white transition-colors">+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#5A8B05]/20 transition-colors">
                  <Mail className="w-4 h-4 text-[#5A8B05]" />
                </div>
                <span className="group-hover:text-white transition-colors">support@petnest.com</span>
              </li>
            </ul>
          </div>

        </div>



        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500">
            © 2026 PetNest MERN Stack Project by Shuvam Biswal. All rights reserved.
          </p>
          <p className="text-xs font-black text-stone-400 flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
            Designed with <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse" /> for Pets
          </p>
        </div>
      </div>
    </footer>
  );
};


const SocialIcon = ({ icon }) => (
  <button className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-stone-400 hover:bg-[#5A8B05] hover:text-white hover:border-[#5A8B05] hover:-translate-y-1 transition-all duration-300 shadow-lg">
    {icon}
  </button>
);

export default Footer;