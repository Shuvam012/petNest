// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
// import logo from '../../assets/2.png';

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Logging in with:", formData);
//     // Integration point for your MERN backend (e.g., axios.post('/api/login', formData))
//   };

//   return (
//     <div className="min-h-[90vh] bg-[#FAFAF5] flex items-center justify-center p-6">
//       <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
//         {/* Left Side: Visual/Welcome */}
//         <div className="md:w-1/2 bg-[#5A8B05] p-12 text-white flex flex-col justify-center relative overflow-hidden">
//           {/* Decorative Background Pattern */}
//           <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
//           <div className="relative z-10 space-y-6">
//             <div className="bg-white p-3 rounded-2xl w-fit shadow-lg">
//               <img src={logo} alt="PetNest" className="h-12 w-auto" />
//             </div>
//             <h2 className="text-4xl font-bold leading-tight">
//               Welcome Back to the <span className="text-[#6B4226]">Nest!</span>
//             </h2>
//             <p className="text-green-50 text-lg">
//               Your pets have missed you. Log in to check your orders or find something new for your furry friends.
//             </p>
//           </div>
          
//           {/* Bottom Decoration */}
//           <div className="absolute bottom-4 right-4 opacity-10">
//             {/* <img src={logo} alt="" className="h-32 w-auto grayscale invert" /> */}
//           </div>
//         </div>

//         {/* Right Side: Login Form */}
//         <div className="md:w-1/2 p-8 md:p-14 bg-white">
//           <div className="mb-10">
//             <h1 className="text-3xl font-bold text-[#6B4226]">Sign In</h1>
//             <p className="text-gray-500 mt-2">Enter your details to access your account.</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Field */}
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700">Email Address</label>
//               <div className="relative group">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#5A8B05] transition-colors w-5 h-5" />
//                 <input 
//                   type="email" 
//                   name="email"
//                   required
//                   placeholder="your@email.com"
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#5A8B05] focus:ring-4 focus:ring-[#5A8B05]/5 outline-none transition-all"
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <div className="flex justify-between items-center">
//                 <label className="text-sm font-semibold text-gray-700">Password</label>
//                 {/* <Link to="/forgot-password" size="sm" className="text-xs font-bold text-[#5A8B05] hover:underline">
//                   Forgot Password?
//                 </Link> */}
//               </div>
//               <div className="relative group">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#5A8B05] transition-colors w-5 h-5" />
//                 <input 
//                   type={showPassword ? "text" : "password"} 
//                   name="password"
//                   required
//                   placeholder="••••••••"
//                   className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#5A8B05] focus:ring-4 focus:ring-[#5A8B05]/5 outline-none transition-all"
//                   onChange={handleChange}
//                 />
//                 <button 
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#5A8B05]"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>

//             {/* Login Button */}
//             <button 
//               type="submit"
//               className="w-full bg-[#6B4226] hover:bg-[#54331d] text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
//             >
//               LOG IN
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </form>

//           {/* Bottom Link */}
//           <div className="mt-10 text-center">
//             <p className="text-gray-600 text-sm">
//               New to PetNest?{' '}
//               <Link to="/register" className="text-[#5A8B05] font-bold hover:underline">
//                 Create an account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;






import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import logo from '../../assets/2.png';
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
      await login(formData); // AuthContext handles API + user state
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] bg-[#FAFAF5] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">

        {/* Left Side */}
        <div className="md:w-1/2 bg-[#5A8B05] p-12 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 space-y-6">
            <div className="bg-white p-3 rounded-2xl w-fit shadow-lg">
              <img src={logo} alt="PetNest" className="h-12 w-auto" />
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              Welcome Back to the <span className="text-[#6B4226]">Nest!</span>
            </h2>
            <p className="text-green-50 text-lg">
              Your pets have missed you. Log in to manage orders and explore new goodies.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 p-8 md:p-14 bg-white">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#6B4226]">Sign In</h1>
            <p className="text-gray-500 mt-2">
              Enter your details to access your account.
            </p>
          </div>

          {error && (
            <div className="mb-6 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                  className="w-full pl-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#5A8B05] outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
               {/* <Link to="/forgot-password" size="sm" className="text-xs font-bold text-[#5A8B05] hover:underline">
//                   Forgot Password?
//                 </Link> */}
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#5A8B05] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#5A8B05]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6B4226] hover:bg-[#54331d] text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? "LOGGING IN..." : "LOG IN"}
              {!loading && (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-600 text-sm">
              New to PetNest?{' '}
              <Link to="/register" className="text-[#5A8B05] font-bold hover:underline">
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
