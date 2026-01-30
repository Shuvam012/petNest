import {  Routes, Route } from "react-router-dom"
import ProtectedRoute from "./routes/ProtectedRoute"

//pages
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Home from "./pages/user/Home"
import Cart from "./pages/user/Cart"
import Orders from "./pages/user/Orders"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminProducts from "./pages/admin/Products"
import Products from "./pages/user/Products"


//common
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"



function App() {


  return (
   <>
      <Navbar />
        <Routes>

          {/* public routes */}
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/products" element={<Products />} />




          {/* user routes */}

          <Route element={<ProtectedRoute />}>
            
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Route>


          {/* admin routes */}

          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
          </Route>


        </Routes>
      <Footer />



   </>
  )
}

export default App
