









import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate, Link } from "react-router-dom";
import {
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useCartContext } from "../../context/CartContext";

const Checkout = () => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);  
  const { cartItems ,fetchCart  } = useCartContext();
  const navigate = useNavigate();

  const [addressData, setAddressData] = useState({
    fullName: "",
    phone: "",
    fullAddress: "",
    city: "",
    pincode: "",
  });

  // 🔒 Redirect if cart is empty
//   if (!cartItems || cartItems.length === 0) {
//     return <Navigate to="/cart" />;
//   }
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

  // ✅ INPUT HANDLER (YOU WERE MISSING THIS)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ PLACE ORDER
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    const { fullName, phone, fullAddress, city, pincode } = addressData;

    if (!fullName || !phone || !fullAddress || !city || !pincode) {
      alert("Please fill all address details");
      return;
    }

    try {
      const res = await axios.post(
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
    //   await fetchCart()
      navigate("/orders");
       await fetchCart()
    } catch (error) {
        setIsPlacingOrder(false);
      alert(error.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-[#6B4226]">Checkout</h1>
          <p className="text-gray-500 font-medium">
            Complete your details to place your order
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* LEFT: Address */}
          <div className="w-full lg:w-[65%]">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border">
              <div className="flex items-center gap-3 mb-8">
                <MapPin className="text-[#5A8B05]" />
                <h2 className="text-xl font-bold">Delivery Address</h2>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl bg-gray-50"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl bg-gray-50"
                  required
                />

                <textarea
                  name="fullAddress"
                  placeholder="Full Address"
                  rows="3"
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl bg-gray-50"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    onChange={handleInputChange}
                    className="p-4 rounded-xl bg-gray-50"
                    required
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    onChange={handleInputChange}
                    className="p-4 rounded-xl bg-gray-50"
                    required
                  />
                </div>

                {/* IMPORTANT: SUBMIT BUTTON MUST BE INSIDE FORM */}
                <button
                  type="submit"
                  className="w-full bg-[#5A8B05] text-white py-4 rounded-xl mt-6 font-bold hover:bg-[#6B4226]"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="w-full lg:w-[35%] sticky top-24">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Items Total</span>
                  <span>₹{itemsTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₹{totalPayable.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-gray-400 justify-center">
                <ShieldCheck size={14} className="text-[#5A8B05]" />
                Secure Checkout
              </div>
            </div>

            <Link
              to="/cart"
              className="block text-center mt-6 font-bold text-[#6B4226]"
            >
              ← Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
