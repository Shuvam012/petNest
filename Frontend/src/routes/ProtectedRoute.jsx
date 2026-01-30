import {Navigate ,Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ adminOnly = false }) => {
    const { user, loading ,isAdmin } = useAuthContext()

    //wait for auth check
    if (loading) {
        return <div className="text-center mt-10">Loading...</div>
    }

    //if user is not logged in
    if (!user) {
        return <Navigate to="/login" replace />
    }

    //if adminOnly and user is not admin
    if (adminOnly && !isAdmin) {
        return <Navigate to="/" replace />
    }

    return <Outlet /> //if everything is ok render outlet


}

export default ProtectedRoute 
