// import { createContext, useContext, useEffect, useState } from "react";
// import api from "../api/axios.js";
// import toast from "react-hot-toast";
// // import { use } from "react";


// const AuthContext = createContext(null);


// export const AuthProvider = ({ children }) => {


//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // check auth on page refresh

//     const checkAuth = async () => {
//         try {
//             const res = await api.get("/auth/me");
//             // setUser(res.data.user); //role
//             setUser(res.data);
//         } catch (error) {
//             setUser(null);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         checkAuth();
//     }, []);


//     //login

//     const login = async (formData) => {
//         try {
//             await api.post("/auth/login", formData);
//             await checkAuth();
//             toast.success("Login successful 🐾");
//             return true;
//         } catch (error) {
//             toast.error(
//                 error?.response?.data?.message || "Login failed"
//             );
//             throw error;
//         }
//     }


//     //logout
//     const logout = async () => {
//         try {
//             await api.post("/auth/logout");
//             setUser(null);
//             toast.success("Logged out successfully");
//         } catch (error) {
//             toast.error("Logout failed");
//         }
//     };


//     return (
//         <AuthContext.Provider
//             value={{
//                 user,
//                 loading,
//                 login,
//                 logout,
//                 isAdmin: user?.role === "admin",

//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export const useAuthContext = () => useContext(AuthContext);



import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check auth on page refresh
  const checkAuth = async () => {
    try {
      const res = await api.get("/api/auth/me"); // ✅ FIXED
      setUser(res.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // login
  const login = async (formData) => {
    try {
      await api.post("/api/auth/login", formData); // ✅ FIXED
      await checkAuth();
      toast.success("Login successful 🐾",{
        duration: 2000
      });
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed",{
        duration: 2000
      });
      throw error;
    }
  };

  // logout
//   const logout = async () => {
//     try {
//       await api.post("/api/auth/logout"); // ✅ FIXED
//       localStorage.removeItem("token");
//       setUser(null);
//       toast.success("Logged out successfully");
//     } catch (error) {
//       toast.error("Logout failed");
//     }
//   };

const logout = async () => {
  try {
    await api.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
    toast.success("Logged out successfully",{
      duration: 2000
    });
  } catch (error) {
    toast.error("Logout failed");
  }
};


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
