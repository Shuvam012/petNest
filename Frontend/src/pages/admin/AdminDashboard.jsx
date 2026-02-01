
import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Package, ShoppingCart, Users, DollarSign, 
  Clock, TrendingUp, CheckCircle2, XCircle, 
  ChevronRight, Search 
} from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, ordersRes] = await Promise.all([
        axios.get("/api/admin/stats", { withCredentials: true }),
        axios.get("/api/orders/admin/all", { withCredentials: true }),
      ]);
      setStats(statsRes.data);
      setRecentOrders(ordersRes.data.slice(0, 5));
    } catch (err) {
      console.error("Admin dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const normalizeOrderStatusStats = (data = []) => {
    const base = { placed: 0, shipped: 0, delivered: 0, cancelled: 0 };
    data.forEach((item) => { 
      if (item._id && base.hasOwnProperty(item._id)) {
        base[item._id] = item.count; 
      }
    });
    return [
      { label: "Placed", value: base.placed, icon: <Clock size={16} />, color: "bg-yellow-500", shadow: "shadow-yellow-100" },
      { label: "Shipped", value: base.shipped, icon: <TrendingUp size={16} />, color: "bg-blue-500", shadow: "shadow-blue-100" },
      { label: "Delivered", value: base.delivered, icon: <CheckCircle2 size={16} />, color: "bg-[#5A8B05]", shadow: "shadow-green-100" },
      { label: "Cancelled", value: base.cancelled, icon: <XCircle size={16} />, color: "bg-red-500", shadow: "shadow-red-100" },
    ];
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center font-bold text-[#6B4226] bg-[#FAFAF5]">
      Loading PetNest Admin...
    </div>
  );

  if (!stats) return (
    <div className="min-h-screen flex items-center justify-center text-red-500 bg-[#FAFAF5]">
      Failed to connect to MERN Server
    </div>
  );

  return (
    /* This container holds the Sidebar + Main Content side-by-side */
    <div className="flex bg-[#FAFAF5] min-h-screen">
      
      {/* 1. Sidebar - Naturally sits on the left */}
      <AdminSidebar />

      {/* 2. Main Content - NO 'ml-64' because it is in a flex container now */}
      <main className="flex-1 p-8 lg:p-12 overflow-x-hidden">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#6B4226] tracking-tight">Dashboard Overview</h1>
            <p className="text-gray-400 font-medium mt-1">Manage your pet shop business with ease.</p>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-2 pr-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-[#6B4226] text-white rounded-xl flex items-center justify-center font-black uppercase text-xl">A</div>
            <div className="text-xs">
              <p className="font-black text-[#6B4226]">Admin Mode</p>
              <p className="text-[#5A8B05] font-bold tracking-wider">VERIFIED</p>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Users" value={stats.users?.totalUsers || 0} icon={<Users size={22}/>} color="text-blue-600" bg="bg-blue-50" />
          <StatCard title="Active Products" value={stats.products || 0} icon={<Package size={22}/>} color="text-orange-600" bg="bg-orange-50" />
          <StatCard title="Total Orders" value={stats.orders || 0} icon={<ShoppingCart size={22}/>} color="text-purple-600" bg="bg-purple-50" />
          <StatCard title="Total Revenue" value={`₹${(stats.revenue || 0).toLocaleString()}`} icon={<DollarSign size={22}/>} color="text-emerald-600" bg="bg-emerald-50" />
        </div>

        {/* Pipeline Section */}
        <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-gray-100 mb-12">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp size={20} className="text-[#5A8B05]" />
            <h3 className="font-black text-[#6B4226] uppercase tracking-widest text-sm">Order Status Pipeline</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {normalizeOrderStatusStats(stats.orderStatusStats).map((s) => (
              <div key={s.label} className="bg-[#FAFAF5] p-6 rounded-[2.5rem] text-center border border-gray-50 group hover:shadow-md transition-all">
                <div className={`${s.color} text-white inline-flex p-4 rounded-full mb-4 shadow-lg ${s.shadow}`}>
                  {s.icon}
                </div>
                <p className="text-3xl font-black text-[#6B4226]">{s.value}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <h3 className="font-black text-[#6B4226] text-lg">Recent Transactions</h3>
            <button className="text-xs font-black text-[#5A8B05] uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
              View All Orders <ChevronRight size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50">
                  <th className="px-8 py-5">Order ID</th>
                  <th className="px-8 py-5">Customer Email</th>
                  <th className="px-8 py-5">Amount Paid</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((o) => (
                  <tr key={o._id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-8 py-5 font-black text-sm text-[#6B4226]">#{o._id.slice(-6).toUpperCase()}</td>
                    <td className="px-8 py-5 text-sm text-gray-500 font-medium">{o.user?.email || "Guest User"}</td>
                    <td className="px-8 py-5 text-sm font-black text-[#6B4226]">₹{o.totalAmount}</td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-full ${
                        o.orderStatus === 'delivered' ? 'bg-green-50 text-[#5A8B05]' : 'bg-yellow-50 text-yellow-600'
                      }`}>
                        {o.orderStatus}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 hover:bg-[#6B4226] hover:text-white rounded-xl transition-all text-gray-300">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, bg }) => (
  <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-500">
    <div className={`${bg} ${color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{title}</p>
    <h2 className="text-3xl font-black text-[#6B4226] mt-1">{value}</h2>
  </div>
);

export default AdminDashboard;