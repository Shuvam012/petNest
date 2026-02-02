
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  ChevronLeft
} from "lucide-react";

import { useCartContext } from "../../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCartContext();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  /* ---------------- EMPTY STATE ---------------- */
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-[#FAFAF5]">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-stone-200/50 text-center max-w-sm border border-stone-100">
          <div className="w-24 h-24 bg-[#F2F2EB] rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag size={48} className="text-stone-300" />
          </div>
          <h2 className="text-3xl font-black text-[#6B4226] mb-3">Empty Nest?</h2>
          <p className="text-stone-400 mb-10 font-medium">
            Your pet is waiting for some treats! Add something special to your cart.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#5A8B05] text-white px-10 py-4 rounded-2xl font-black text-sm shadow-lg shadow-[#5A8B05]/30 hover:bg-[#4A7204] transition-all active:scale-95"
          >
            EXPLORE SHOP <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* STEP PROGRESSOR */}
        <div className="flex items-center justify-center gap-4 mb-12">
           <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#5A8B05] text-white flex items-center justify-center text-xs font-black">1</span>
              <span className="text-sm font-black text-[#6B4226]">CART</span>
           </div>
           <div className="w-12 h-[2px] bg-stone-200" />
           <div className="flex items-center gap-2 opacity-30">
              <span className="w-8 h-8 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center text-xs font-black">2</span>
              <span className="text-sm font-black text-stone-500">CHECKOUT</span>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT - ITEM LIST */}
          <div className="lg:w-[65%] space-y-6">
            <header className="flex justify-between items-end mb-4">
               <div>
                  <h1 className="text-4xl font-black text-[#6B4226] tracking-tight">Your Cart</h1>
                  <p className="text-stone-400 font-bold text-xs uppercase tracking-widest mt-1">
                    {cartItems.length} Products Reserved
                  </p>
               </div>
               <Link to="/products" className="text-[#5A8B05] font-black text-xs uppercase flex items-center gap-1 hover:underline">
                  <ChevronLeft size={14} /> Continue Shopping
               </Link>
            </header>

            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="group bg-white p-5 rounded-[2.5rem] shadow-sm border border-stone-100 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-all duration-300"
              >
                {/* Product Image */}
                <div className="w-32 h-32 rounded-[1.5rem] overflow-hidden bg-stone-50 shrink-0 border border-stone-50">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 w-full space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-black text-[#6B4226] text-lg leading-tight">
                        {item.product.name}
                      </h3>
                      <p className="text-stone-400 text-[11px] font-bold uppercase tracking-wide mt-1">
                         {item.product.category || "General Pet Care"}
                      </p>
                    </div>
                    <p className="text-xl font-black text-[#6B4226]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-stone-50 rounded-xl p-1 border border-stone-100">
                      <button
                        onClick={() => item.quantity > 1 && updateQuantity(item.product._id, item.quantity - 1)}
                        className="p-2 hover:bg-white rounded-lg text-stone-400 hover:text-red-500 transition-colors disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} strokeWidth={3} />
                      </button>
                      <span className="w-8 text-center font-black text-[#6B4226] text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="p-2 hover:bg-white rounded-lg text-[#5A8B05]"
                      >
                        <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="group/del flex items-center gap-1.5 text-stone-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} className="group-hover/del:animate-bounce" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT - SUMMARY */}
          <div className="lg:w-[35%]">
            <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-stone-200/40 border border-stone-100 sticky top-24 space-y-8">
              <h2 className="text-2xl font-black text-[#6B4226] tracking-tight">Order Summary</h2>

              {/* Promo Code Box */}
              <div className="relative">
                 <input 
                  type="text" 
                  placeholder="PROMO CODE" 
                  className="w-full bg-stone-50 border border-stone-100 py-4 pl-12 pr-4 rounded-2xl text-[10px] font-black tracking-widest focus:outline-none focus:ring-2 focus:ring-[#5A8B05]/20 uppercase"
                 />
                 <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" />
                 <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A8B05] font-black text-[10px] hover:underline">APPLY</button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-stone-400 font-bold text-xs uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-[#6B4226]">₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-stone-400 font-bold text-xs uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-[#5A8B05]">FREE</span>
                </div>

                <div className="pt-4 border-t border-stone-50 flex justify-between items-end">
                  <div className="text-[10px] font-black text-stone-300 uppercase">Total Amount</div>
                  <div className="text-3xl font-black text-[#5A8B05]">₹{total.toLocaleString()}</div>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-[#6B4226] hover:bg-[#5A8B05] text-white font-black py-5 rounded-[1.5rem] shadow-lg shadow-stone-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-sm tracking-widest"
                >
                  PROCEED TO CHECKOUT <ArrowRight size={18} />
                </button>

                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-[10px] text-stone-400 font-black uppercase tracking-tighter">
                    <ShieldCheck size={16} className="text-[#5A8B05]" />
                    Safe & Secure Checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
