




import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, PawPrint } from 'lucide-react';
import logo from '../../assets/4-pet.png';
import { useAuthContext } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
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
      await login(formData);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center p-4 md:p-6 font-sans">
      <Toaster position="top-center" />
      
      <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(107,66,38,0.05)] overflow-hidden flex flex-col md:flex-row border border-stone-100">

        {/* --- LEFT SIDE: BRANDING --- */}
        <div className="md:w-[45%] bg-[#5A8B05] p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Circles/Patterns */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-black/5 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-md border border-white/30  rounded-t-full w-fit shadow-xl mb-12">
              <img src={logo} alt="PetNest" className="h-25 w-auto" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-1 w-10 bg-white/40 rounded-full"></span>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-green-100">Member Access</p>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                Welcome Back to the <span className="text-[#6B4226]">Nest.</span>
              </h2>
              <p className="text-green-50/80 text-lg font-medium max-w-xs">
                Log in to manage your pet's favorite goodies and track your orders.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-12 flex items-center gap-3 text-white/60">
             <PawPrint size={20} />
             <span className="text-sm font-bold italic tracking-tight">Trusted by 10,000+ pet parents</span>
          </div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className="md:w-[55%] p-10 md:p-16 bg-white flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-[#6B4226] tracking-tight">Sign In</h1>
            <p className="text-stone-400 font-medium mt-2">
              Enter your credentials to access your account.
            </p>
          </div>

          {error && (
            <div className="mb-8 flex items-center gap-3 text-sm font-bold text-rose-600 bg-rose-50 p-4 rounded-2xl border border-rose-100 animate-in fade-in slide-in-from-top-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-black text-stone-400 uppercase tracking-widest">
                  Password
                </label>
                {/* <Link to="/forgot-password" size="sm" className="text-[10px] font-black text-[#5A8B05] uppercase tracking-widest hover:underline">
                  Forgot?
                </Link> */}
              </div>
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
              className="w-full bg-[#6B4226] hover:bg-[#5A8B05] text-white font-black py-5 rounded-2xl shadow-xl shadow-[#6B4226]/10 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span className="uppercase tracking-[0.2em] text-xs">Authorize & Enter</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-12 text-center">
            <p className="text-stone-400 text-sm font-medium">
              New to PetNest?{' '}
              <Link to="/register" className="text-[#5A8B05] font-black hover:underline ml-1">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;