

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import {
//   Package,
//   ChevronRight,
//   XCircle,
//   CheckCircle2,
//   Truck,
//   Clock,
// } from "lucide-react";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ FETCH USER ORDERS
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("/api/orders/my", {
//         withCredentials: true,
//       });
//       setOrders(res.data || []);
//     } catch (error) {
//       console.error("Failed to fetch orders", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // ✅ CANCEL ORDER
//   const handleCancelOrder = async (orderId) => {
//     const confirmCancel = window.confirm(
//       "Are you sure you want to cancel this order?"
//     );
//     if (!confirmCancel) return;

//     try {
//       await axios.delete(`/api/orders/cancel/${orderId}`, {
//         withCredentials: true,
//       });

//       alert("Order cancelled successfully ❌");
//       fetchOrders(); // refresh list
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to cancel order");
//     }
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "placed":
//         return "bg-yellow-50 text-yellow-600 border-yellow-100";
//       case "shipped":
//         return "bg-blue-50 text-blue-600 border-blue-100";
//       case "delivered":
//         return "bg-green-50 text-[#5A8B05] border-green-100";
//       case "cancelled":
//         return "bg-red-50 text-red-600 border-red-100";
//       default:
//         return "bg-gray-50 text-gray-600";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "placed":
//         return <Clock size={14} />;
//       case "shipped":
//         return <Truck size={14} />;
//       case "delivered":
//         return <CheckCircle2 size={14} />;
//       case "cancelled":
//         return <XCircle size={14} />;
//       default:
//         return null;
//     }
//   };

//   // 🔄 LOADING STATE
//   if (loading) {
//     return (
//       <div className="min-h-[70vh] flex items-center justify-center bg-[#FAFAF5]">
//         <p className="font-bold text-gray-400">Loading orders...</p>
//       </div>
//     );
//   }

//   // 📦 EMPTY STATE
//   if (orders.length === 0) {
//     return (
//       <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#FAFAF5]">
//         <div className="bg-white p-12 rounded-[3rem] shadow-sm text-center border border-gray-100">
//           <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Package size={40} className="text-gray-300" />
//           </div>
//           <h2 className="text-2xl font-black text-[#6B4226]">No orders yet</h2>
//           <p className="text-gray-400 mt-2 mb-8 max-w-xs">
//             You haven't placed any orders yet.
//           </p>
//           <Link
//             to="/products"
//             className="bg-[#5A8B05] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#6B4226]"
//           >
//             Browse Products
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#FAFAF5] min-h-screen py-12">
//       <div className="max-w-4xl mx-auto px-6">
//         {/* HEADER */}
//         <div className="mb-10">
//           <h1 className="text-3xl font-black text-[#6B4226]">My Orders</h1>
//           <p className="text-gray-500 font-medium">
//             Track and manage your purchases
//           </p>
//         </div>

//         {/* ORDERS LIST */}
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden"
//             >
//               {/* TOP */}
//               <div className="p-6 border-b flex justify-between items-center flex-wrap gap-4">
//                 <div>
//                   <p className="text-xs text-gray-400 font-bold uppercase">
//                     Order ID
//                   </p>
//                   <p className="font-black text-[#6B4226]">
//                     #{order._id.slice(-6)}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {new Date(order.createdAt).toDateString()}
//                   </p>
//                 </div>

//                 <div className="flex gap-3 items-center">
//                   <span
//                     className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusStyle(
//                       order.orderStatus
//                     )}`}
//                   >
//                     {getStatusIcon(order.orderStatus)}
//                     {order.orderStatus.toUpperCase()}
//                   </span>

//                   <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
//                     {order.paymentMethod}
//                   </span>
//                 </div>
//               </div>

//               {/* ITEMS */}
//               <div className="p-6 bg-gray-50/40 space-y-2">
//                 {order.items.map((item) => (
//                   <div key={item._id} className="flex gap-2 items-center">
//                     <span className="w-2 h-2 bg-[#5A8B05] rounded-full" />
//                     <p className="text-sm text-gray-600">
//                       {item.product?.name} ×{" "}
//                       <span className="font-bold">{item.quantity}</span>
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* BOTTOM */}
//               <div className="p-6 flex justify-between items-center flex-wrap gap-4">
//                 <div>
//                   <p className="text-xs text-gray-400 font-bold uppercase">
//                     Total Amount
//                   </p>
//                   <p className="text-2xl font-black text-[#6B4226]">
//                     ₹{order.totalAmount}
//                   </p>
//                 </div>

//                 <div className="flex gap-3">
//                   {order.orderStatus === "placed" && (
//                     <button
//                       onClick={() => handleCancelOrder(order._id)}
//                       className="px-6 py-3 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl"
//                     >
//                       Cancel Order
//                     </button>
//                   )}

//                   {/* <button className="flex items-center gap-2 border-2 border-[#6B4226] text-[#6B4226] px-6 py-3 rounded-xl text-xs font-bold hover:bg-[#6B4226] hover:text-white">
//                     View Details
//                     <ChevronRight size={14} />
//                   </button> */}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orders;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Package,
  XCircle,
  CheckCircle2,
  Truck,
  Clock,
} from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(null); // 🔥 per-order loader

  // ✅ FETCH USER ORDERS
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/orders/my", {
        withCredentials: true,
      });
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

  // ✅ CANCEL ORDER
  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;

    try {
      setCancelLoading(orderId);
      await axios.delete(`/api/orders/cancel/${orderId}`, {
        withCredentials: true,
      });

      alert("Order cancelled successfully ❌");
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelLoading(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "placed":
        return "bg-yellow-50 text-yellow-600 border-yellow-100";
      case "shipped":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "delivered":
        return "bg-green-50 text-[#5A8B05] border-green-100";
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  // 🔥 ORDER STATUS TIMELINE
  const OrderTimeline = ({ status }) => {
    const steps = [
      { key: "placed", label: "Placed", icon: <Clock size={16} /> },
      { key: "shipped", label: "Shipped", icon: <Truck size={16} /> },
      { key: "delivered", label: "Delivered", icon: <CheckCircle2 size={16} /> },
    ];

    const activeIndex = steps.findIndex((s) => s.key === status);

    return (
      <div className="flex items-center justify-between mt-6">
        {steps.map((step, index) => {
          const isActive = index <= activeIndex;
          return (
            <div key={step.key} className="flex-1 flex items-center">
              <div
                className={`flex items-center justify-center w-9 h-9 rounded-full border
                  ${
                    isActive
                      ? "bg-[#5A8B05] text-white border-[#5A8B05]"
                      : "bg-gray-100 text-gray-400 border-gray-200"
                  }`}
              >
                {step.icon}
              </div>
              <p
                className={`ml-2 text-xs font-bold ${
                  isActive ? "text-[#5A8B05]" : "text-gray-400"
                }`}
              >
                {step.label}
              </p>

              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-2 ${
                    isActive ? "bg-[#5A8B05]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // 🔄 LOADING STATE
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FAFAF5]">
        <p className="font-bold text-gray-400">Loading orders...</p>
      </div>
    );
  }

  // 📦 EMPTY STATE
  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#FAFAF5]">
        <div className="bg-white p-12 rounded-[3rem] shadow-sm text-center border border-gray-100">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={40} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-black text-[#6B4226]">No orders yet</h2>
          <p className="text-gray-400 mt-2 mb-8 max-w-xs">
            You haven't placed any orders yet.
          </p>
          <Link
            to="/products"
            className="bg-[#5A8B05] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#6B4226]"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-[#6B4226]">My Orders</h1>
          <p className="text-gray-500 font-medium">
            Track and manage your purchases
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => {
            const canCancel = order.orderStatus === "placed";

            return (
              <div
                key={order._id}
                className="bg-white rounded-[2rem] shadow-sm border overflow-hidden"
              >
                {/* TOP */}
                <div className="p-6 border-b flex justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">
                      Order ID
                    </p>
                    <p className="font-black text-[#6B4226]">
                      #{order._id.slice(-6)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toDateString()}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-4.5 rounded-full text-xs font-bold border ${getStatusStyle(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus.toUpperCase()}
                  </span>
                </div>

                {/* 🔥 TIMELINE */}
                <div className="px-6">
                  <OrderTimeline status={order.orderStatus} />
                </div>

                {/* ITEMS */}
                <div className="p-6 bg-gray-50/40 space-y-2">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex gap-2 items-center">
                      <span className="w-2 h-2 bg-[#5A8B05] rounded-full" />
                      <p className="text-sm text-gray-600">
                        {item.product?.name} ×{" "}
                        <span className="font-bold">{item.quantity}</span>
                      </p>
                    </div>
                  ))}
                </div>

                {/* BOTTOM */}
                <div className="p-6 flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">
                      Total Amount
                    </p>
                    <p className="text-2xl font-black text-[#6B4226]">
                      ₹{order.totalAmount}
                    </p>
                  </div>

                  <div>
                    {canCancel ? (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        disabled={cancelLoading === order._id}
                        className="px-6 py-3 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl disabled:opacity-50"
                      >
                        {cancelLoading === order._id
                          ? "Cancelling..."
                          : "Cancel Order"}
                      </button>
                    ) : (
                      <p className="text-xs text-gray-400 font-bold">
                        This order can no longer be cancelled
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;

