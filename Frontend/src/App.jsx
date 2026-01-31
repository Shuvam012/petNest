import {  Routes, Route } from "react-router-dom"
import ProtectedRoute from "./routes/ProtectedRoute"
import {Toaster} from 'react-hot-toast'

//pages
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Home from "./pages/user/Home"
import Cart from "./pages/user/Cart"
import Orders from "./pages/user/Orders"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminProducts from "./pages/admin/Products"
import Products from "./pages/user/Products"
import Checkout from "./pages/user/Checkout"


//common
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"



function App() {




  return (
   <>
      <Navbar />
      <Toaster position="top-right" reverseOrder= {false}/>
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
            <Route path="/checkout" element={<Checkout/>}/>
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
