

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, PawPrint, Eye, EyeOff } from 'lucide-react';
import logo from '../../assets/2.png';
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
      // 1️⃣ Register user
      await api.post("/auth/signup", formData);
      toast.success("Account created successfully 🎉");

      // 2️⃣ Auto login after register
      await login({
        email: formData.email,
        password: formData.password,
      });

      // 3️⃣ Redirect to home
      navigate("/");
    } catch (err) {
      setError(
        toast.error(
          error?.response?.data?.message || "Signup failed",

          err.response?.data?.message || "Registration failed. Try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        {/* Left Side */}
        <div className="md:w-1/2 bg-[#6B4226] p-12 text-white flex flex-col justify-center items-center text-center space-y-6">
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <img src={logo} alt="PetNest Logo" className="h-16 w-auto" />
          </div>
          <h2 className="text-3xl font-bold italic">
            "Where every pet finds their nest."
          </h2>
          <p className="text-gray-300">
            Join thousands of pet parents and get access to exclusive treats,
            healthcare, and a loving community.
          </p>
          <div className="pt-8">
            <PawPrint size={80} className="text-[#5A8B05] opacity-20 rotate-12" />
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#6B4226]">Create Account</h1>
            <p className="text-gray-500 mt-2">
              Start your journey with PetNest today.
            </p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                Full Name
              </label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="username"
                  required
                  onChange={handleChange}
                  className="w-full pl-10 py-3 bg-gray-50 border rounded-xl focus:border-[#5A8B05] outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                Email Address
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                  className="w-full pl-10 py-3 bg-gray-50 border rounded-xl focus:border-[#5A8B05] outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border rounded-xl focus:border-[#5A8B05] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5A8B05] text-white py-4 rounded-xl font-bold hover:bg-[#4A7204] transition disabled:opacity-60"
            >
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-8 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-[#6B4226] font-bold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
