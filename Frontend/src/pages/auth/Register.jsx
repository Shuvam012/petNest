

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, PawPrint, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import logo from '../../assets/4-pet.png';
import api from '../../api/axios';
import { useAuthContext } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/signup", formData);
      toast.success("Welcome to the family! 🎉");

      await login({
        email: formData.email,
        password: formData.password,
      });

      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center p-4 md:p-6 font-sans">
      <Toaster position="top-center" />
      
      <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(107,66,38,0.05)] overflow-hidden flex flex-col md:flex-row border border-stone-100">

        {/* --- LEFT SIDE: THE NEST WELCOME --- */}
        <div className="md:w-[45%] bg-[#6B4226] p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative background paw */}
          <PawPrint size={300} className="absolute -bottom-20 -left-20 text-white/[0.03] -rotate-12 pointer-events-none" />
          
          <div className="relative z-10">
            <div className=" bg-white/10 border-white/30   rounded-t-full w-fit shadow-xl mb-10 transition-transform hover:scale-105 duration-300">
              <img src={logo} alt="PetNest Logo" className="h-25 w-auto" />
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-6">
              Where every pet finds their <span className="text-[#5A8B05]">nest.</span>
            </h2>
            
            <div className="space-y-6">
              <BenefitItem icon={<PawPrint size={18}/>} text="Access to premium treats & toys" />
              <BenefitItem icon={<ShieldCheck size={18}/>} text="Expert healthcare recommendations" />
              <BenefitItem icon={<User size={18}/>} text="Join a community of 10k+ parents" />
            </div>
          </div>

          <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
            <p className="text-stone-400 text-sm font-medium italic">
              "The best pet care platform I've ever used. Simple and loving!"
            </p>
            <p className="text-[10px] font-black uppercase tracking-widest mt-2 text-[#5A8B05]">
              — Happy Pet Parent
            </p>
          </div>
        </div>

        {/* --- RIGHT SIDE: REGISTRATION FORM --- */}
        <div className="md:w-[55%] p-10 md:p-16 bg-white flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-[#6B4226] tracking-tight">Create Account</h1>
            <p className="text-stone-400 font-medium mt-2">
              Start your journey with PetNest today.
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 text-sm font-bold text-rose-600 bg-rose-50 p-4 rounded-2xl border border-rose-100 animate-in fade-in slide-in-from-top-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="group space-y-2">
              <label className="text-[11px] font-black text-stone-400 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-4 text-stone-300 group-focus-within:text-[#5A8B05] transition-colors" size={20} />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Full Name"
                  required
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-stone-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#5A8B05]/20 focus:ring-4 focus:ring-[#5A8B05]/5 outline-none transition-all font-bold text-[#6B4226] placeholder:text-stone-300"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="group space-y-2">
              <label className="text-[11px] font-black text-stone-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 text-stone-300 group-focus-within:text-[#5A8B05] transition-colors" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-stone-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#5A8B05]/20 focus:ring-4 focus:ring-[#5A8B05]/5 outline-none transition-all font-bold text-[#6B4226] placeholder:text-stone-300"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group space-y-2">
              <label className="text-[11px] font-black text-stone-400 uppercase tracking-widest ml-1">
                Secure Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 text-stone-300 group-focus-within:text-[#5A8B05] transition-colors" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-4 bg-stone-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#5A8B05]/20 focus:ring-4 focus:ring-[#5A8B05]/5 outline-none transition-all font-bold text-[#6B4226] placeholder:text-stone-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-stone-300 hover:text-[#6B4226] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5A8B05] hover:bg-[#4A7204] text-white font-black py-5 rounded-2xl shadow-xl shadow-[#5A8B05]/10 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 group mt-4"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span className="uppercase tracking-[0.2em] text-xs">Begin Your Journey</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-10 text-center">
            <p className="text-stone-400 text-sm font-medium">
              Already a member?{' '}
              <Link to="/login" className="text-[#6B4226] font-black hover:underline ml-1">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for the list
const BenefitItem = ({ icon, text }) => (
  <div className="flex items-center gap-4 group">
    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-[#5A8B05] transition-colors duration-300">
      {icon}
    </div>
    <span className="text-sm font-bold text-stone-200">{text}</span>
  </div>
);

export default Register;
