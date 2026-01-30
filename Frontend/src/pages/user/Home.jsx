
import React, { useState } from 'react'
import { Search, ShieldCheck, Truck, Heart, ShoppingBag, Package, MousePointerClick, Star } from 'lucide-react'
import heroImg from "../../assets/dog&cat.jpg"
import { useAuthContext } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom'
// import Register from '../auth/Register'




const Home = () => {

  const { user } = useAuthContext()
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const categories = [
    { name: "Pet Food", icon: "🍖" },
    { name: "Toys & Accessories", icon: "🎾" },
    { name: "Grooming Essentials", icon: "✂️" },
    { name: "Health & Care", icon: "💊" },
    { name: "Pet Beds", icon: "🛏️" },
  ];

  return (
    <div className="bg-[#FAFAF5] min-h-screen font-sans">

      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <span className="text-[#5A8B05] font-bold tracking-widest text-sm uppercase">Welcome to PetNest</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#6B4226] leading-tight">
              Everything Your Pet Needs,<span className="text-[#5A8B05]"> All in One Nest</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-lg">
              Shop trusted pet products, manage orders easily, and give your pets the care they deserve.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-md group">
            <input
              type="text"
              placeholder="Search for food, toys..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white shadow-md border border-transparent focus:border-[#5A8B05] outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#5A8B05] w-5 h-5" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#6B4226] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#5A8B05]">
              Search
            </button>
          </form>

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/products')}
              className="bg-[#5A8B05] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-[#4A7204] transition-all">Shop Now</button>

            {!user && (
              <button
                onClick={() => navigate("/register")}

                className="border-2 border-[#6B4226] text-[#6B4226] px-8 py-4 rounded-full font-bold hover:bg-[#6B4226] hover:text-white transition-all">Sign UP</button>
            )}

          </div>
        </div>

        <div className="flex-1 relative">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-50"></div>
          <img src={heroImg} alt="Happy Pets" className="rounded-2xl shadow-2xl relative z-10 border-8 border-white object-cover w-full h-[500px]" />
        </div>
      </section>

      {/* 2. WHY CHOOSE PETNEST (Trust Section) */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6B4226] mb-12">Why Pet Parents Choose PetNest</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <TrustCard icon={<Star className="text-[#5A8B05]" />} title="Quality Products" desc="Carefully selected items for pets of all sizes." />
            <TrustCard icon={<Truck className="text-[#5A8B05]" />} title="Fast & Safe Delivery" desc="Reliable delivery straight to your doorstep." />
            <TrustCard icon={<ShieldCheck className="text-[#5A8B05]" />} title="Secure Shopping" desc="Safe payments and protected user accounts." />
            <TrustCard icon={<Heart className="text-[#5A8B05]" />} title="Made for Pet Lovers" desc="Built by people who truly care about pets." />
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#6B4226] mb-10">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md border border-gray-100 text-center transition-all cursor-pointer group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <p className="font-bold text-[#6B4226]">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="bg-[#6B4226] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">How PetNest Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <WorkStep icon={<MousePointerClick size={40} />} step="1" title="Browse Products" desc="Explore pet essentials easily" />
            <WorkStep icon={<ShoppingBag size={40} />} step="2" title="Add to Cart" desc="Pick what your pet loves" />
            <WorkStep icon={<Package size={40} />} step="3" title="Order & Relax" desc="We handle the rest" />
          </div>
        </div>
      </section>

      {/* 5. TRUST / MOTIVATION */}
      <section className="py-24 text-center px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-[#6B4226]">Caring for pets made simple, reliable, and affordable.</h2>
          <p className="text-gray-600 text-xl italic">"Providing a safe nest for your beloved pets — because they’re family"</p>
          {/* <button className="bg-[#5A8B05] text-white px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all">Join Our Community</button> */}
        </div>
      </section>
    </div>
  )
}

// Sub-components for cleaner code
const TrustCard = ({ icon, title, desc }) => (
  <div className="p-6 rounded-2xl bg-[#FAFAF5] space-y-3 text-left border border-transparent hover:border-[#5A8B05] transition-all">
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">{icon}</div>
    <h3 className="font-bold text-[#6B4226] text-lg">{title}</h3>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
)

const WorkStep = ({ icon, step, title, desc }) => (
  <div className="flex flex-col items-center space-y-4">
    <div className="relative">
      <div className="w-20 h-20 bg-[#5A8B05] rounded-full flex items-center justify-center mb-4">{icon}</div>
      <span className="absolute -top-2 -right-2 bg-white text-[#6B4226] w-8 h-8 rounded-full flex items-center justify-center font-bold">{step}</span>
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-gray-300">{desc}</p>
  </div>
)

export default Home