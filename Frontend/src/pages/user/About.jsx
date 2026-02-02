import React from 'react';
import { Heart, ShieldCheck, Truck, Users, PawPrint, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import pet from "../../assets/pet.jpg"

const About = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 overflow-hidden bg-[#6B4226]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <span className="inline-block px-4 py-1.5 bg-[#5A8B05] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                Our Story
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                Dedicated to the <br /> 
                <span className="text-[#5A8B05]">Happiness</span> of Pets.
              </h1>
              <p className="text-stone-300 text-lg leading-relaxed">
                Founded in 2026, PetNest began with a simple mission: to provide every pet with a home that feels like a nest. We believe pets aren't just animals—they're family.
              </p>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/10 transition-transform hover:scale-105 duration-500">
                <img 
                  src={pet} 
                  alt="Happy Dog" 
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Decorative Paw */}
              <PawPrint size={120} className="absolute -bottom-10 -right-10 text-[#5A8B05] opacity-20 rotate-12 -z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* --- MISSION STATS --- */}
      <section className="py-16 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="10k+" label="Happy Pets" />
            <StatCard number="500+" label="Premium Products" />
            <StatCard number="24/7" label="Support" />
            <StatCard number="100%" label="Safe Delivery" />
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#6B4226] mb-4">Why PetNest?</h2>
          <p className="text-stone-500 font-medium">We go above and beyond to ensure your furry friends get exactly what they deserve.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<ShieldCheck className="text-[#5A8B05]" size={32} />}
            title="Quality Assured"
            desc="Every product in our nest is tested for safety and pet-friendliness by experts."
          />
          <FeatureCard 
            icon={<Truck className="text-[#5A8B05]" size={32} />}
            title="Fast Delivery"
            desc="We know they're waiting! Get your treats and essentials delivered to your door in no time."
          />
          <FeatureCard 
            icon={<Heart className="text-[#5A8B05]" size={32} />}
            title="Made with Love"
            desc="A portion of every purchase goes towards local pet shelters and rescue missions."
          />
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#5A8B05] to-[#4A7204] rounded-[3rem] p-12 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-white">Ready to treat your pet?</h2>
            <p className="text-white/80 text-lg font-medium max-w-xl mx-auto">
              Join our community today and get 10% off your first order!
            </p>
            <Link 
              to="/products" 
              className="inline-block bg-white text-[#5A8B05] px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#6B4226] hover:text-white transition-all shadow-lg active:scale-95"
            >
              Shop the Collection
            </Link>
          </div>
          <PawPrint size={200} className="absolute -top-20 -left-20 text-white/10 -rotate-45" />
          <PawPrint size={200} className="absolute -bottom-20 -right-20 text-white/10 rotate-12" />
        </div>
      </section>
    </div>
  );
};

// Helper Components
const StatCard = ({ number, label }) => (
  <div className="space-y-1">
    <h3 className="text-3xl font-black text-[#6B4226]">{number}</h3>
    <p className="text-stone-400 text-xs font-black uppercase tracking-widest">{label}</p>
  </div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-10 rounded-[2.5rem] border border-stone-100 hover:border-[#5A8B05]/30 hover:shadow-xl transition-all group">
    <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#5A8B05]/10 transition-colors">
      {icon}
    </div>
    <h4 className="text-xl font-black text-[#6B4226] mb-3">{title}</h4>
    <p className="text-stone-500 text-sm leading-relaxed font-medium">{desc}</p>
  </div>
);

export default About;