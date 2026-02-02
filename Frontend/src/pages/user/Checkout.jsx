

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate, Link } from "react-router-dom";
import {
  MapPin,
  ShieldCheck,
  ChevronLeft,
  Truck,
  CreditCard,
  ShoppingBag,
  CheckCircle2
} from "lucide-react";
import { useCartContext } from "../../context/CartContext";

const Checkout = () => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { cartItems, fetchCart } = useCartContext();
  const navigate = useNavigate();

  const [addressData, setAddressData] = useState({
    fullName: "",
    phone: "",
    fullAddress: "",
    city: "",
    pincode: "",
  });

  // 🔒 Redirect if cart is empty and not currently placing an order
  if (!isPlacingOrder && (!cartItems || cartItems.length === 0)) {
    return <Navigate to="/cart" />;
  }

  // 💰 Price calculation
  const itemsTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = 0;
  const totalPayable = itemsTotal + deliveryFee;

  // ✅ Input Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Place Order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    const { fullName, phone, fullAddress, city, pincode } = addressData;

    try {
      await axios.post(
        "/api/orders/place",
        {
          paymentMethod: "COD",
          shippingAddress: {
            fullName,
            phone,
            address: fullAddress,
            city,
            pincode,
          },
        },
        { withCredentials: true }
      );

      alert("Order placed successfully 🎉");
      await fetchCart(); // Refresh cart state
      navigate("/orders");
    } catch (error) {
      setIsPlacingOrder(false);
      alert(error.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* --- HEADER --- */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Link to="/cart" className="flex items-center gap-1 text-stone-400 font-black text-[10px] uppercase tracking-widest hover:text-[#6B4226] mb-2 transition-colors">
              <ChevronLeft size={14} /> Back to Cart
            </Link>
            <h1 className="text-4xl font-black text-[#6B4226] tracking-tight">Checkout</h1>
          </div>
          <p className="text-stone-500 font-medium">Secure Delivery for your Pets</p>
        </div>

        {/* --- STEPPER --- */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {/* Step 1: Cart (Marked as Done) */}
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#5A8B05]/10 text-[#5A8B05] flex items-center justify-center text-xs font-black border border-[#5A8B05]">
              <CheckCircle2 size={16} />
            </span>
            <span className="text-sm font-black text-stone-400">CART</span>
          </div>

          <div className="w-12 h-[2px] bg-[#5A8B05]" />

          {/* Step 2: Checkout (Active) */}
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#5A8B05] text-white flex items-center justify-center text-xs font-black shadow-lg shadow-[#5A8B05]/30">
              2
            </span>
            <span className="text-sm font-black text-[#6B4226]">CHECKOUT</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* --- LEFT: ADDRESS FORM --- */}
          <div className="w-full lg:w-[60%]">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-stone-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-[#FAFAF5] rounded-2xl text-[#5A8B05]">
                  <MapPin size={24} />
                </div>
                <h2 className="text-2xl font-black text-[#6B4226]">Delivery Address</h2>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-2xl bg-stone-50 border border-transparent focus:bg-white focus:border-[#5A8B05] focus:ring-4 focus:ring-[#5A8B05]/5 transition-all outline-none font-bold text-[#6B4226]"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-2xl bg-stone-50 border border-transparent focus:bg-white focus:border-[#5A8B05] focus:ring-4 focus:ring-[#5A8B05]/5 transition-all outline-none font-bold text-[#6B4226]"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <textarea
                      name="fullAddress"
                      placeholder="Full Address (House No, Building, Street, Area)"
                      rows="3"
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-2xl bg-stone-50 border border-transparent focus:bg-white focus:border-[#5A8B05] focus:ring-4 focus:ring-[#5A8B05]/5 transition-all outline-none font-bold text-[#6B4226] resize-none"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl bg-stone-50 border border-transparent focus:bg-white focus:border-[#5A8B05] focus:ring-4 focus:ring-[#5A8B05]/5 transition-all outline-none font-bold text-[#6B4226]"
                    required
                  />

                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl bg-stone-50 border border-transparent focus:bg-white focus:border-[#5A8B05] focus:ring-4 focus:ring-[#5A8B05]/5 transition-all outline-none font-bold text-[#6B4226]"
                    required
                  />
                </div>

                {/* Payment Method Preview */}
                <div className="mt-8 p-5 bg-[#FAFAF5] rounded-[1.5rem] border border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="text-[#6B4226]" />
                    <div>
                      <p className="text-sm font-black text-[#6B4226]">Cash on Delivery</p>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Pay at your doorstep</p>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-4 border-[#5A8B05] bg-white"></div>
                </div>

                <button
                  type="submit"
                  disabled={isPlacingOrder}
                  className="w-full bg-[#5A8B05] text-white py-5 rounded-[1.5rem] mt-6 font-black text-sm uppercase tracking-widest shadow-lg shadow-[#5A8B05]/30 hover:bg-[#4a7204] transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isPlacingOrder ? "Placing Order..." : "Confirm & Place Order"}
                </button>
              </form>
            </div>
          </div>

          {/* --- RIGHT: ORDER SUMMARY --- */}
          <div className="w-full lg:w-[40%] sticky top-24">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-stone-200/40 border border-stone-100">
              <h2 className="text-xl font-black text-[#6B4226] mb-6 flex items-center gap-2">
                <ShoppingBag size={20} /> Order Summary
              </h2>

              {/* Mini Item List */}
              <div className="space-y-4 mb-8 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="flex justify-between items-center text-sm font-bold">
                    <span className="text-stone-500 line-clamp-1 flex-1 pr-4">
                      {item.product.name} <span className="text-[10px] text-stone-300 ml-1">x{item.quantity}</span>
                    </span>
                    <span className="text-[#6B4226]">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-stone-50">
                <div className="flex justify-between text-stone-400 font-bold text-[10px] uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-[#6B4226]">₹{itemsTotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-stone-400 font-bold text-[10px] uppercase tracking-widest">
                  <span>Shipping Fee</span>
                  <span className="text-[#5A8B05]">FREE</span>
                </div>

                <div className="pt-4 flex justify-between items-end">
                  <span className="text-[10px] font-black text-stone-300 uppercase">Total Payable</span>
                  <span className="text-3xl font-black text-[#5A8B05]">₹{totalPayable.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-center gap-6">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck size={18} className="text-[#5A8B05]" />
                  <span className="text-[8px] font-black text-stone-400 uppercase">Secure</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck size={18} className="text-stone-300" />
                  <span className="text-[8px] font-black text-stone-400 uppercase">Trackable</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;