import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios.js";
// import { use } from "react";


const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
    

const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

// check auth on page refresh

const checkAuth = async () => {
    try {
        const res = await api.get("/auth/me");
        // setUser(res.data.user); //role
        setUser(res.data);
    } catch (error) {
        setUser(null);
    } finally {
        setLoading(false);
    }
}

useEffect(() => {
    checkAuth();
}, []);


//login

const login = async (formData) => {
    try{
    await api.post("/auth/login", formData);
    await checkAuth();
    return true;
    } catch (error){
        throw error;
    }
}


//logout
const logout = async () => {
  try {
    await api.post("/auth/logout");
  } finally {
    setUser(null);
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
)
}

export const useAuthContext = () => useContext(AuthContext);

