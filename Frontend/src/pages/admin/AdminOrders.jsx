

import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  ChevronDown, 
  Search, 
  Filter, 
  ShoppingCart, 
  PackageCheck,
  Calendar,
  CreditCard
} from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/orders/admin/all", {
        withCredentials: true,
      });
      setOrders(res.data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch orders", err);
      setError("Failed to connect to PetNest Server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `/api/orders/admin/update/${orderId}`,
        { orderStatus: newStatus },
        { withCredentials: true }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus: newStatus }
            : order
        )
      );
    } catch (err) {
      console.error("Failed to update order status", err);
      alert("Status update failed");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center font-bold text-[#6B4226] bg-[#FAFAF5]">
      Fetching PetNest Orders...
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF5]">
      <p className="font-black text-red-500 bg-red-50 px-6 py-3 rounded-2xl border border-red-100">{error}</p>
    </div>
  );

  return (
    /* Changed to 'flex' so Sidebar and Main sit side-by-side */
    <div className="flex bg-[#FAFAF5] min-h-screen">
      
      {/* 1. SIDEBAR (Not fixed anymore) */}
      <AdminSidebar />

      {/* 2. MAIN CONTENT (Removed ml-64) */}
      <main className="flex-1 p-8 lg:p-12 overflow-x-hidden">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#6B4226] tracking-tight">Order Logs</h1>
            <p className="text-gray-400 font-medium mt-1">Real-time customer transaction management.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A8B05]" size={16} />
              <select 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-10 py-2.5 rounded-xl bg-white border-none shadow-sm text-sm font-black text-[#6B4226] appearance-none cursor-pointer outline-none"
              >
                <option value="All">All Status</option>
                <option value="placed">Placed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </header>

        {/* TABLE CONTAINER */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <div className="flex items-center gap-3">
              <div className="bg-[#6B4226] p-2 rounded-lg text-white">
                <ShoppingCart size={18} />
              </div>
              <h3 className="font-black text-[#6B4226] text-lg tracking-tight">Current Transactions</h3>
            </div>
            <span className="bg-[#5A8B05]/10 text-[#5A8B05] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              {orders.filter(o => filterStatus === "All" || o.orderStatus === filterStatus).length} Records found
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[900px]">
              <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <tr>
                  <th className="px-8 py-5">Order Ref</th>
                  <th className="px-8 py-5">Customer Email</th>
                  <th className="px-8 py-5">Amount</th>
                  <th className="px-8 py-5">Payment</th>
                  <th className="px-8 py-5">Current Status</th>
                  <th className="px-8 py-5 text-right">Update Order</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {orders
                  .filter(o => filterStatus === "All" || o.orderStatus === filterStatus)
                  .map((order) => (
                    <tr key={order._id} className="hover:bg-[#FAFAF5] transition-colors group">
                      <td className="px-8 py-6">
                        <span className="font-black text-xs text-[#6B4226] bg-stone-100 px-3 py-1.5 rounded-lg">
                          #{order._id.slice(-6).toUpperCase()}
                        </span>
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-stone-700">{order.user?.email || "Guest"}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter flex items-center gap-1">
                            <Calendar size={10} /> {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <span className="text-lg font-black text-[#6B4226]">₹{order.totalAmount.toLocaleString()}</span>
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-[10px] text-[#5A8B05] font-black uppercase tracking-widest">
                          <CreditCard size={12} /> {order.paymentMethod || "COD"}
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <span className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-full border ${
                          order.orderStatus === "delivered" ? "bg-green-50 text-[#5A8B05] border-green-100" :
                          order.orderStatus === "shipped" ? "bg-blue-50 text-blue-600 border-blue-100" :
                          order.orderStatus === "cancelled" ? "bg-red-50 text-red-600 border-red-100" :
                          "bg-yellow-50 text-yellow-600 border-yellow-100"
                        }`}>
                          {order.orderStatus}
                        </span>
                      </td>

                      <td className="px-8 py-6 text-right">
                        <div className="relative inline-block">
                          <select
                            className={`appearance-none bg-[#FAFAF5] border-none px-4 py-2 pr-10 rounded-xl text-xs font-black uppercase text-[#6B4226] focus:ring-2 focus:ring-[#5A8B05]/20 cursor-pointer transition-all ${
                              (order.orderStatus === 'delivered' || order.orderStatus === 'cancelled') ? 'opacity-30 cursor-not-allowed' : 'hover:bg-stone-200'
                            }`}
                            value={order.orderStatus}
                            disabled={order.orderStatus === "delivered" || order.orderStatus === "cancelled"}
                            onChange={(e) => updateStatus(order._id, e.target.value)}
                          >
                            <option value="placed">Placed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                        </div>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="py-24 text-center">
              <PackageCheck size={48} className="mx-auto text-stone-200 mb-4" />
              <p className="text-stone-400 font-bold italic tracking-tight">No orders found in the database.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminOrders;
