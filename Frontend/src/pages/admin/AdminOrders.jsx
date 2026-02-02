

import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  ChevronDown, 
  Search, 
  Filter, 
  ShoppingCart, 
  PackageCheck,
  Calendar,
  CreditCard,
  Hash,
  Mail,
  MoreHorizontal
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
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF5]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#6B4226]/10 border-t-[#6B4226] rounded-full animate-spin"></div>
        <p className="font-black text-[#6B4226] tracking-tighter uppercase text-xs">Accessing Order Logs...</p>
      </div>
    </div>
  );

  const filteredOrders = orders.filter(o => filterStatus === "All" || o.orderStatus === filterStatus);

  return (
    <div className="flex bg-[#FAFAF5] min-h-screen font-sans">
      
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <span className="h-1 w-6 bg-[#5A8B05] rounded-full"></span>
               <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Order Fulfillment</p>
            </div>
            <h1 className="text-4xl font-black text-[#6B4226] tracking-tight">Transactions</h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
            {/* Search Mockup */}
            {/* <div className="relative flex-1 xl:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                <input 
                    type="text" 
                    placeholder="Search Order ID..." 
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-stone-100 shadow-sm text-sm font-bold text-[#6B4226] outline-none focus:ring-2 focus:ring-[#5A8B05]/10"
                />
            </div> */}

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A8B05]" size={16} />
              <select 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-11 pr-12 py-3 rounded-2xl bg-white border border-stone-100 shadow-sm text-xs font-black text-[#6B4226] appearance-none cursor-pointer outline-none hover:bg-stone-50 transition-colors"
              >
                <option value="All">All Statuses</option>
                <option value="placed">Placed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 pointer-events-none" size={14} />
            </div>
          </div>
        </header>

        {/* --- TABLE CONTAINER --- */}
        <div className="bg-white rounded-[3.5rem] shadow-sm border border-stone-100 overflow-hidden">
          <div className="p-8 border-b border-stone-50 flex justify-between items-center bg-stone-50/20">
            <div className="flex items-center gap-3">
              <div className="bg-[#6B4226] p-2.5 rounded-xl text-white shadow-lg shadow-[#6B4226]/20">
                <ShoppingCart size={18} />
              </div>
              <div>
                <h3 className="font-black text-[#6B4226] text-lg leading-none">Order Flow</h3>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Live Database Records</p>
              </div>
            </div>
            <div className="text-right">
                <span className="bg-[#5A8B05]/10 text-[#5A8B05] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                {filteredOrders.length} Entries
                </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1000px]">
              <thead className="bg-stone-50/50 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] border-b border-stone-50">
                <tr>
                  <th className="px-10 py-6"><div className="flex items-center gap-2"><Hash size={12}/> Order Ref</div></th>
                  <th className="px-10 py-6"><div className="flex items-center gap-2"><Mail size={12}/> Customer</div></th>
                  <th className="px-10 py-6">Revenue</th>
                  <th className="px-10 py-6">Method</th>
                  <th className="px-10 py-6">Status</th>
                  <th className="px-10 py-6 text-right pr-12">Update</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-50">
                {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-[#FAFAF5]/50 transition-colors group">
                      <td className="px-10 py-7">
                        <span className="font-black text-xs text-[#6B4226] bg-stone-50 px-3 py-2 rounded-xl border border-stone-100 group-hover:bg-white group-hover:border-[#5A8B05]/30 transition-all">
                          {order._id.slice(-8).toUpperCase()}
                        </span>
                      </td>

                      <td className="px-10 py-7">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-stone-700 mb-0.5">{order.user?.email || "Guest Checkout"}</span>
                          <span className="text-[10px] text-stone-300 font-bold uppercase flex items-center gap-1">
                            <Calendar size={10} className="text-[#5A8B05]" /> 
                            {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </td>

                      <td className="px-10 py-7">
                        <span className="text-lg font-black text-[#6B4226]">₹{order.totalAmount.toLocaleString()}</span>
                      </td>

                      <td className="px-10 py-7">
                        <div className="flex items-center gap-2 text-[10px] text-stone-400 font-black uppercase tracking-widest">
                          <CreditCard size={12} className="text-[#5A8B05]" /> {order.paymentMethod || "COD"}
                        </div>
                      </td>

                      <td className="px-10 py-7">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border shadow-sm ${
                          order.orderStatus === "delivered" ? "bg-green-50 text-[#5A8B05] border-green-100" :
                          order.orderStatus === "shipped" ? "bg-blue-50 text-blue-600 border-blue-100" :
                          order.orderStatus === "cancelled" ? "bg-red-50 text-red-600 border-red-100" :
                          "bg-amber-50 text-amber-600 border-amber-100"
                        }`}>
                          {order.orderStatus}
                        </span>
                      </td>

                      <td className="px-10 py-7 text-right pr-12">
                        <div className="relative inline-block">
                          <select
                            className={`appearance-none bg-stone-50 border border-stone-100 px-5 py-2.5 pr-10 rounded-2xl text-[10px] font-black uppercase text-[#6B4226] outline-none transition-all shadow-sm ${
                              (order.orderStatus === 'delivered' || order.orderStatus === 'cancelled') 
                                ? 'opacity-30 cursor-not-allowed bg-transparent' 
                                : 'hover:bg-white hover:border-[#5A8B05] cursor-pointer'
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
                          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 pointer-events-none" />
                        </div>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="py-32 text-center bg-stone-50/30">
              <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <PackageCheck size={32} className="text-stone-300" />
              </div>
              <p className="text-stone-400 font-black text-sm uppercase tracking-widest">No order matches found</p>
              <button 
                onClick={() => setFilterStatus("All")}
                className="mt-4 text-[10px] font-black text-[#5A8B05] border-b-2 border-[#5A8B05] uppercase tracking-widest hover:text-[#6B4226] hover:border-[#6B4226] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
        
        {/* Footer info */}
        <div className="mt-8 flex items-center justify-center gap-2 text-stone-300">
            <MoreHorizontal size={16} />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em]">End of Order Stream</p>
        </div>
      </main>
    </div>
  );
};

export default AdminOrders;
