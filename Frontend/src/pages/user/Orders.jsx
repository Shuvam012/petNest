


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Package,
  XCircle,
  CheckCircle2,
  Truck,
  Clock,
  ChevronRight,
  AlertCircle
} from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/orders/my", { withCredentials: true });
      setOrders(res.data || []);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      setCancelLoading(orderId);
      await axios.delete(`/api/orders/cancel/${orderId}`, { withCredentials: true });
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelLoading(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "placed": return "bg-amber-50 text-amber-600 border-amber-100";
      case "shipped": return "bg-blue-50 text-blue-600 border-blue-100";
      case "delivered": return "bg-green-50 text-[#5A8B05] border-green-100";
      case "cancelled": return "bg-red-50 text-red-600 border-red-100";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  // 🔥 CUSTOM TIMELINE COMPONENT
  const OrderTimeline = ({ status }) => {
    const steps = [
      { key: "placed", label: "Placed", icon: <Clock size={14} /> },
      { key: "shipped", label: "Shipped", icon: <Truck size={14} /> },
      { key: "delivered", label: "Delivered", icon: <CheckCircle2 size={14} /> },
    ];

    if (status === "cancelled") {
      return (
        <div className="flex items-center gap-2 py-4 px-6 bg-red-50/50 rounded-2xl border border-red-100 text-red-600 text-xs font-bold">
          <XCircle size={16} /> ORDER WAS CANCELLED
        </div>
      );
    }

    const activeIndex = steps.findIndex((s) => s.key === status);

    return (
      <div className="flex items-center justify-between py-6 px-2">
        {steps.map((step, index) => {
          const isDone = index <= activeIndex;
          const isCurrent = index === activeIndex;
          
          return (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center gap-2 relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  isDone ? "bg-[#5A8B05] border-[#5A8B05] text-white" : "bg-white border-gray-200 text-gray-300"
                } ${isCurrent ? "ring-4 ring-[#5A8B05]/20" : ""}`}>
                  {step.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-wider ${isDone ? "text-[#5A8B05]" : "text-gray-400"}`}>
                  {step.label}
                </span>
              </div>
              {index !== steps.length - 1 && (
                <div className="flex-1 h-[2px] -mt-6 mx-2 bg-gray-100 relative">
                  <div className={`absolute inset-0 transition-all duration-1000 ${isDone && index < activeIndex ? "bg-[#5A8B05]" : "bg-transparent"}`} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAFAF5] gap-4">
        <div className="w-12 h-12 border-4 border-[#5A8B05]/20 border-t-[#5A8B05] rounded-full animate-spin" />
        <p className="font-black text-stone-400 text-xs uppercase tracking-widest">Finding your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#FAFAF5]">
        <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-xl shadow-stone-200/50 text-center">
          <Package size={60} className="text-stone-200 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-[#6B4226] mb-2">No Orders Yet</h2>
          <p className="text-stone-400 mb-8 font-medium">Looks like you haven't treated your pet to anything special recently!</p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-[#5A8B05] text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-[#4a7204] transition-all shadow-lg shadow-[#5A8B05]/30">
            START SHOPPING <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 space-y-2">
          <h1 className="text-4xl font-black text-[#6B4226] tracking-tight">Order History</h1>
          <p className="text-stone-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#5A8B05]"></span> 
            {orders.length} Total Purchases
          </p>
        </header>

        <div className="space-y-10">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              {/* TOP HEADER */}
              <div className="p-8 border-b border-stone-50 flex justify-between items-start flex-wrap gap-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-stone-300 uppercase tracking-tighter">Receipt Number</span>
                  <p className="font-mono text-lg font-bold text-[#6B4226]">#{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span className={`px-5 py-2 rounded-full text-[10px] font-black border tracking-[0.15em] ${getStatusStyle(order.orderStatus)}`}>
                    {order.orderStatus.toUpperCase()}
                  </span>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-stone-300 uppercase">Total Paid</p>
                    <p className="text-2xl font-black text-[#5A8B05]">₹{order.totalAmount}</p>
                  </div>
                </div>
              </div>

              {/* TIMELINE SECTION */}
              <div className="bg-stone-50/30 px-8">
                <OrderTimeline status={order.orderStatus} />
              </div>

              {/* ITEMS SECTION */}
              <div className="p-8 space-y-4">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Items in this order</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-stone-100">
                      <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-[#5A8B05]">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#6B4226] line-clamp-1">{item.product?.name}</p>
                        <p className="text-xs font-bold text-stone-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="px-8 py-6 bg-stone-50/50 border-t border-stone-100 flex justify-between items-center">
                <div className="flex items-center gap-2 text-stone-400 font-bold text-[10px] uppercase">
                  <AlertCircle size={14} /> Payment via {order.paymentMethod}
                </div>
                
                {order.orderStatus === "placed" && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    disabled={cancelLoading === order._id}
                    className="group/btn relative px-6 py-2.5 overflow-hidden rounded-xl border-2 border-red-100 text-red-500 text-[11px] font-black uppercase tracking-widest transition-all hover:bg-red-500 hover:text-white hover:border-red-500 disabled:opacity-30"
                  >
                    {cancelLoading === order._id ? "Processing..." : "Cancel Order"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;

