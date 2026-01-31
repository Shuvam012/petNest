import React from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { useCartContext } from "../../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCartContext();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  /* ---------------- EMPTY CART ---------------- */
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="w-24 h-24 bg-[#FAFAF5] rounded-full flex items-center justify-center mb-6">
            <ShoppingBag size={48} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-black text-[#6B4226] mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-400 mb-8 max-w-xs">
            Looks like you haven't added anything to your nest yet.
          </p>
          <Link
            to="/products"
            className="bg-[#5A8B05] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-[#4A7204] transition-all"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  /* ---------------- CART PAGE ---------------- */
  return (
    <div className="bg-[#FAFAF5] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-[#6B4226]">Your Cart</h1>
          <p className="text-gray-500 font-medium">
            You have {cartItems.length} items in your nest
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT - ITEMS */}
          <div className="lg:w-[70%] space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id || item.id}
                className="bg-white p-4 md:p-6 rounded-[2rem] shadow-sm border border-gray-50 flex items-center gap-4 md:gap-6"
              >
                {/* Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-[#6B4226] text-lg truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-400 text-xs mb-4">
                    {item.desc || "Premium pet product"}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Quantity */}
                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                      <button
                        // onClick={() =>
                        //   updateQuantity(item._id || item.id, -1)
                        // }
        onClick={() => {
    if (item.quantity > 1) {
      updateQuantity(item.product._id, item.quantity - 1);
    }
  }}

                        className="p-2 hover:bg-white rounded-lg text-gray-500"
                      >
                        <Minus size={16} strokeWidth={3} />
                      </button>

                      <span className="w-10 text-center font-bold text-[#6B4226]">
                        {item.quantity}
                      </span>

                      <button
                        // onClick={() =>
                        //   updateQuantity(item._id || item.id, 1)
                        // }
                    onClick={() =>
    updateQuantity(item.product._id, item.quantity + 1)
  }

                        className="p-2 hover:bg-white rounded-lg text-[#5A8B05]"
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        removeFromCart(item.product._id, )
                      }
                      className="text-red-400 hover:text-red-600 flex items-center gap-1 text-xs font-bold uppercase"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-xl font-black text-[#6B4226]">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    ₹{item.price} / unit
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT - SUMMARY */}
          <div className="lg:w-[30%]">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-[#6B4226] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between text-gray-500">
                  <span>Items ({cartItems.length})</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Delivery</span>
                  <span className="text-[#5A8B05] font-bold">FREE</span>
                </div>

                <div className="h-px bg-gray-100" />

                <div className="flex justify-between text-xl font-black text-[#6B4226]">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-[#5A8B05] hover:bg-[#6B4226] text-white font-bold py-4 rounded-2xl mt-8 shadow-lg flex items-center justify-center gap-2">
                Proceed to Checkout
                <ArrowRight size={18} />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase">
                <ShieldCheck size={14} className="text-[#5A8B05]" />
                Secure Checkout Guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
