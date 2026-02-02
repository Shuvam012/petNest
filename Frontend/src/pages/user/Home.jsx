

import React, { useState } from 'react'
import { Search, ShieldCheck, Truck, Heart, ShoppingBag, Package, MousePointerClick, Star, ArrowRight } from 'lucide-react'
import heroImg from "../../assets/dog&cat.jpg"
import { useAuthContext } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/products?search=${searchQuery}`);
  };

  // 🟢 Matched exactly to your Backend Schema Enum
  const categories = [
    { name: "Food", slug: "food", icon: "🍖", color: "bg-orange-100" },
    { name: "Medicine", slug: "medicine", icon: "💊", color: "bg-blue-100" },
    { name: "Accessories", slug: "accessories", icon: "🎾", color: "bg-yellow-100" },
    { name: "Clothes", slug: "clothes", icon: "👕", color: "bg-pink-100" },
  ];

  return (
    <div className="bg-[#FAFAF5] min-h-screen font-sans selection:bg-[#5A8B05]/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          
          <div className="flex-1 space-y-10 z-10">
            <div className="space-y-6">
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                {/* <span className="flex h-2 w-2 rounded-full bg-[#5A8B05]"></span> */}
                {/* <span className="text-[#6B4226] font-bold text-xs uppercase tracking-tighter">New Arrivals: Summer Collection</span> */}
              {/* </div> */} 
              
              <h1 className="text-6xl md:text-7xl font-black text-[#6B4226] leading-[1.1] tracking-tight">
                Premium Care for Your <span className="text-[#5A8B05]">Fur Family.</span>
              </h1>
              <p className="text-gray-500 text-xl max-w-lg font-medium leading-relaxed">
                A handpicked selection of premium essentials delivered right to your nest.
              </p>
            </div>

            {/* Modernized Search */}
            <form onSubmit={handleSearch} className="flex p-2 bg-white rounded-[2rem] shadow-xl shadow-stone-200/50 border border-gray-100 max-w-lg transition-focus-within:ring-4 ring-[#5A8B05]/10">
              <div className="flex items-center flex-1 px-4">
                <Search className="text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="What does your pet need today?"
                  className="w-full pl-3 pr-2 py-3 bg-transparent outline-none font-medium text-stone-700 placeholder:text-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="bg-[#6B4226] hover:bg-[#5A8B05] text-white px-8 py-4 rounded-[1.5rem] font-bold transition-all shadow-lg active:scale-95">
                Search
              </button>
            </form>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate('/products')}
                className="group flex items-center gap-3 bg-[#5A8B05] text-white px-10 py-5 rounded-full font-black shadow-xl shadow-green-900/20 hover:bg-[#4A7204] transition-all">
                Shop Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              {!user && (
                <button onClick={() => navigate("/register")} className="text-[#6B4226] font-black hover:underline underline-offset-8 transition-all">
                  Create Account
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 relative animate-in fade-in zoom-in duration-700">
            {/* Decorative blobs */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#5A8B05]/10 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#6B4226]/10 rounded-full blur-[100px]"></div>
            
            <div className="relative z-10 p-4 bg-white rounded-[3rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img src={heroImg} alt="Pets" className="rounded-[2.5rem] object-cover w-full h-[550px]" />
              {/* Floating Stat Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4 animate-bounce duration-[3000ms]">
                <div className="bg-yellow-400 p-3 rounded-2xl text-white"><Star fill="currentColor" /></div>
                <div>
                  <p className="font-black text-[#6B4226]">4.9/5 Rating</p>
                  <p className="text-xs text-gray-400 font-bold uppercase">Trusted by 10k+ Parents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES - Updated with Grid Hover Effects */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-[#6B4226] tracking-tight">Shop by Category</h2>
            <p className="text-gray-400 font-medium mt-2">Everything your pet needs in one place</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <div 
              key={i} 
              onClick={() => navigate(`/products?category=${cat.slug}`)}
              className="group bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-gray-50 text-center transition-all duration-500 cursor-pointer relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-2 ${cat.color.replace('bg-', 'bg-')}`}></div>
              <div className={`${cat.color} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <span className="text-5xl">{cat.icon}</span>
              </div>
              <p className="font-black text-xl text-[#6B4226]">{cat.name}</p>
              <p className="text-gray-400 text-xs mt-1 uppercase font-black tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Explore Items</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRUST SECTION - Glassmorphism */}
      <section className="bg-white py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-black text-[#6B4226] mb-16 tracking-tight">The PetNest Promise</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <TrustCard icon={<Star className="text-yellow-500" />} title="Quality First" desc="Only the most trusted brands." />
            <TrustCard icon={<Truck className="text-blue-500" />} title="Express Shipping" desc="24-hour delivery on essentials." />
            <TrustCard icon={<ShieldCheck className="text-green-500" />} title="Verified Safety" desc="100% secure checkout." />
            <TrustCard icon={<Heart className="text-red-500" />} title="Expert Support" desc="Advice for your pet's health." />
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS - Simplified Visual Flow */}
      <section className="bg-[#6B4226] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-20 tracking-tight">Simple as 1-2-3</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <WorkStep icon={<MousePointerClick size={32} />} step="1" title="Select Gear" desc="Browse our curated catalog" />
            <WorkStep icon={<ShoppingBag size={32} />} step="2" title="Fast Checkout" desc="Safe and secure payments" />
            <WorkStep icon={<Package size={32} />} step="3" title="Joy Delivered" desc="Straight to your pet's bowl" />
          </div>
        </div>
      </section>
    </div>
  )
}

const TrustCard = ({ icon, title, desc }) => (
  <div className="group p-8 rounded-[2.5rem] bg-[#FAFAF5] space-y-4 text-center border border-transparent hover:bg-white hover:shadow-xl transition-all duration-300">
    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:rotate-12 transition-transform">{icon}</div>
    <h3 className="font-black text-[#6B4226] text-xl">{title}</h3>
    <p className="text-gray-500 text-sm font-medium leading-relaxed">{desc}</p>
  </div>
)

const WorkStep = ({ icon, step, title, desc }) => (
  <div className="flex flex-col items-center space-y-6 group">
    <div className="relative">
      <div className="w-24 h-24 bg-[#5A8B05] text-white rounded-[2rem] flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-xl shadow-black/20">
        {icon}
      </div>
      <span className="absolute -bottom-4 -right-4 bg-white text-[#6B4226] w-10 h-10 rounded-full flex items-center justify-center font-black shadow-lg">
        {step}
      </span>
    </div>
    <div>
      <h3 className="text-2xl font-black text-white mb-2">{title}</h3>
      <p className="text-stone-300 font-medium max-w-[200px]">{desc}</p>
    </div>
  </div>
)

export default Home;