
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   Plus, Search, Edit3, Trash2, Package,
//   AlertCircle, CheckCircle2, Image as ImageIcon,
//   MoreHorizontal, Filter, Info
// } from "lucide-react";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import AddProductModal from "../../components/admin/AddProductModal";

// const AdminProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [stockFilter, setStockFilter] = useState("all");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("/api/admin/products", { withCredentials: true });
//       setProducts(res.data || []);
//     } catch (err) {
//       console.error("Error fetching products", err);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleProductAdded = () => {
//     fetchProducts();
//     toast.success("Inventory Updated");
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Move this product to archives?")) {
//       try {
//         await axios.delete(`/api/admin/products/${id}`, { withCredentials: true });
//         fetchProducts();
//         toast.success("Product Removed");
//       } catch (err) {
//         toast.error("Deletion failed");
//       }
//     }
//   };

//   const filteredProducts = products.filter((p) => {
//     const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
//     if (stockFilter === "inStock") return matchesSearch && p.stock > 0;
//     if (stockFilter === "outOfStock") return matchesSearch && p.stock <= 0;
//     return matchesSearch;
//   });

//   if (loading) return (
//     <div className="min-h-screen flex items-center justify-center bg-[#FAFAF5]">
//       <div className="flex flex-col items-center gap-4">
//         <div className="w-10 h-10 border-4 border-[#6B4226]/10 border-t-[#6B4226] rounded-full animate-spin"></div>
//         <p className="font-black text-[#6B4226] uppercase text-[10px] tracking-widest">Loading Catalog...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex min-h-screen bg-[#FAFAF5] font-sans">
//       <Toaster position="bottom-right" />
//       <AdminSidebar />

//       <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
        
//         {/* --- HEADER --- */}
//         <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-10 gap-6">
//           <div>
//             <div className="flex items-center gap-2 mb-1">
//                <span className="h-1 w-6 bg-[#5A8B05] rounded-full"></span>
//                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Inventory Management</p>
//             </div>
//             <h1 className="text-4xl font-black text-[#6B4226] tracking-tight">Product Catalog</h1>
//           </div>

//           <button  
//             onClick={() => { setSelectedProduct(null); setShowModal(true); }}
//             className="flex items-center gap-2 bg-[#5A8B05] text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-[#5A8B05]/20 hover:bg-[#4a7204] active:scale-95 text-sm uppercase tracking-widest"
//           >
//             <Plus size={18} /> Add New Entry
//           </button>
//         </header>

//         {/* --- SUMMARY STATS --- */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           <QuickStat label="Total SKU" value={products.length} icon={<Package size={20}/>} color="blue" />
//           <QuickStat label="Available" value={products.filter(p => p.stock > 0).length} icon={<CheckCircle2 size={20}/>} color="green" />
//           <QuickStat label="Stock Alerts" value={products.filter(p => p.stock <= 0).length} icon={<AlertCircle size={20}/>} color="red" />
//         </div>

//         {/* --- DATA TABLE CARD --- */}
//         <div className="bg-white rounded-[3.5rem] shadow-sm border border-stone-100 overflow-hidden">
          
//           {/* Table Controls */}
//           <div className="p-8 border-b border-stone-50 bg-stone-50/20 flex flex-col xl:flex-row justify-between items-center gap-6">
//             <div className="relative w-full max-w-md">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
//               <input
//                 type="text"
//                 placeholder="Search catalog by name..."
//                 className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-stone-100 text-sm font-bold text-[#6B4226] focus:ring-4 focus:ring-[#5A8B05]/5 outline-none transition-all placeholder:text-stone-300"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <div className="flex bg-stone-100/50 p-1.5 rounded-2xl border border-stone-100">
//               {['all', 'inStock', 'outOfStock'].map((status) => (
//                 <button
//                   key={status}
//                   onClick={() => setStockFilter(status)}
//                   className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
//                     stockFilter === status
//                       ? "bg-white text-[#6B4226] shadow-md"
//                       : "text-stone-400 hover:text-stone-600"
//                   }`}
//                 >
//                   {status === 'all' ? 'All Items' : status === 'inStock' ? 'Live' : 'Sold Out'}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full text-left min-w-[1000px]">
//               <thead>
//                 <tr className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] border-b border-stone-50">
//                   <th className="px-10 py-6">Identity</th>
//                   <th className="px-10 py-6 text-center">Department</th>
//                   <th className="px-10 py-6">Pricing</th>
//                   <th className="px-10 py-6">Inventory</th>
//                   <th className="px-10 py-6">Visibility</th>
//                   <th className="px-10 py-6 text-right pr-12">Operations</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-stone-50">
//                 {filteredProducts.map(product => (
//                   <tr key={product._id} className="hover:bg-[#FAFAF5]/50 transition-colors group">
//                     <td className="px-10 py-6">
//                       <div className="flex items-center gap-4">
//                         <div className="w-16 h-16 bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 p-1 group-hover:border-[#5A8B05]/30 transition-all flex-shrink-0">
//                           {product.image ? (
//                             <img src={product.image} alt="" className="w-full h-full object-cover rounded-xl" />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center text-stone-200">
//                               <ImageIcon size={24} />
//                             </div>
//                           )}
//                         </div>
//                         <div className="flex flex-col">
//                             <span className="font-black text-[#6B4226] text-sm leading-tight">{product.name}</span>
//                             <span className="text-[10px] font-bold text-stone-300 uppercase tracking-tighter mt-1">ID: {product._id.slice(-6).toUpperCase()}</span>
//                         </div>
//                       </div>
//                     </td>

//                     <td className="px-10 py-6 text-center">
//                       <span className="text-[9px] font-black text-stone-400 bg-stone-50 border border-stone-100 px-3 py-1.5 rounded-lg uppercase tracking-widest">
//                         {product.category}
//                       </span>
//                     </td>

//                     <td className="px-10 py-6">
//                       <span className="font-black text-[#6B4226] text-lg">₹{product.price.toLocaleString()}</span>
//                     </td>

//                     <td className="px-10 py-6">
//                       <div className="flex items-center gap-2">
//                         <span className={`font-black text-sm ${product.stock <= 5 ? 'text-amber-500' : 'text-stone-700'}`}>
//                             {product.stock}
//                         </span>
//                         {product.stock <= 5 && <Info size={14} className="text-amber-400 animate-pulse" />}
//                       </div>
//                     </td>

//                     <td className="px-10 py-6">
//                       <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm ${
//                         product.isActive ? "bg-green-50 text-[#5A8B05] border-green-100" : "bg-red-50 text-red-600 border-red-100"
//                       }`}>
//                         {product.isActive ? "Online" : "Archived"}
//                       </span>
//                     </td>

//                     <td className="px-10 py-6 text-right pr-12">
//                       <div className="flex justify-end gap-3">
//                         <button 
//                           onClick={() => { setSelectedProduct(product); setShowModal(true); }}
//                           className="p-3 bg-stone-50 text-stone-400 rounded-2xl hover:bg-[#6B4226] hover:text-white transition-all shadow-sm"
//                         >
//                           <Edit3 size={18} />
//                         </button>
                        
//                         <button
//                           onClick={() => handleDelete(product._id)}
//                           className="p-3 rounded-2xl bg-rose-50 text-rose-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {filteredProducts.length === 0 && (
//               <div className="py-32 text-center">
//                 <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-stone-200">
//                     <Package size={32} className="text-stone-200" />
//                 </div>
//                 <p className="text-stone-300 font-black text-xs uppercase tracking-[0.2em]">No matching products found</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer Meta */}
//         <div className="mt-8 flex justify-center items-center gap-4 opacity-30">
//             <div className="h-[1px] w-12 bg-stone-400"></div>
//             <MoreHorizontal size={20} />
//             <div className="h-[1px] w-12 bg-stone-400"></div>
//         </div>
//       </main>

//       <AddProductModal
//         isOpen={showModal}
//         onClose={() => { setSelectedProduct(null); setShowModal(false); }}
//         onSuccess={handleProductAdded}
//         editProduct={selectedProduct}
//       />
//     </div>
//   );
// };

// // --- HELPER COMPONENT ---
// const QuickStat = ({ label, value, icon, color }) => {
//   const themes = {
//     blue: "bg-blue-50 text-blue-600",
//     green: "bg-green-50 text-[#5A8B05]",
//     red: "bg-rose-50 text-rose-600"
//   };
//   return (
//     <div className="bg-white p-7 rounded-[2.5rem] border border-stone-100 shadow-sm flex items-center gap-5 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 group">
//       <div className={`${themes[color]} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>{icon}</div>
//       <div>
//         <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">{label}</p>
//         <h4 className="text-3xl font-black text-[#6B4226]">{value}</h4>
//       </div>
//     </div>
//   );
// };

// export default AdminProducts;




import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  Plus, Search, Edit3, Trash2, Package,
  AlertCircle, CheckCircle2, Image as ImageIcon,
  MoreHorizontal, Info, RefreshCw
} from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AddProductModal from "../../components/admin/AddProductModal";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // --- FETCH DATA ---
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/products", { withCredentials: true });
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products", err);
      toast.error("Failed to load catalog");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- ACTIONS ---
  const handleProductAdded = () => {
    fetchProducts();
    toast.success("Inventory Updated");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Move this product to archives?")) {
      try {
        await axios.delete(`/api/admin/products/${id}`, { withCredentials: true });
        fetchProducts();
        toast.success("Product Archived");
      } catch (err) {
        toast.error("Deletion failed");
      }
    }
  };

  const handleActivate = async (id) => {
    try {
      await axios.put(`/api/admin/products/active/${id}`, {}, { withCredentials: true });
      fetchProducts();
      toast.success("Product is now LIVE");
    } catch (err) {
      toast.error("Activation failed");
    }
  };

  // --- FILTERING LOGIC ---
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (stockFilter === "inStock") return matchesSearch && p.stock > 0;
    if (stockFilter === "outOfStock") return matchesSearch && p.stock <= 0;
    return matchesSearch;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF5]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#6B4226]/10 border-t-[#6B4226] rounded-full animate-spin"></div>
        <p className="font-black text-[#6B4226] uppercase text-[10px] tracking-widest">Loading Catalog...</p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#FAFAF5] font-sans">
      <Toaster position="bottom-right" />
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <span className="h-1 w-6 bg-[#5A8B05] rounded-full"></span>
               <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Inventory Management</p>
            </div>
            <h1 className="text-4xl font-black text-[#6B4226] tracking-tight">Product Catalog</h1>
          </div>

          <button  
            onClick={() => { setSelectedProduct(null); setShowModal(true); }}
            className="flex items-center gap-2 bg-[#5A8B05] text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-[#5A8B05]/20 hover:bg-[#4a7204] active:scale-95 text-sm uppercase tracking-widest"
          >
            <Plus size={18} /> Add New Entry
          </button>
        </header>

        {/* --- SUMMARY STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <QuickStat label="Total SKU" value={products.length} icon={<Package size={20}/>} color="blue" />
          <QuickStat label="Available" value={products.filter(p => p.stock > 0).length} icon={<CheckCircle2 size={20}/>} color="green" />
          <QuickStat label="Stock Alerts" value={products.filter(p => p.stock <= 0).length} icon={<AlertCircle size={20}/>} color="red" />
        </div>

        {/* --- DATA TABLE CARD --- */}
        <div className="bg-white rounded-[3.5rem] shadow-sm border border-stone-100 overflow-hidden">
          
          {/* Table Controls */}
          <div className="p-8 border-b border-stone-50 bg-stone-50/20 flex flex-col xl:flex-row justify-between items-center gap-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
              <input
                type="text"
                placeholder="Search catalog by name..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-stone-100 text-sm font-bold text-[#6B4226] focus:ring-4 focus:ring-[#5A8B05]/5 outline-none transition-all placeholder:text-stone-300"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex bg-stone-100/50 p-1.5 rounded-2xl border border-stone-100">
              {['all', 'inStock', 'outOfStock'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStockFilter(status)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    stockFilter === status
                      ? "bg-white text-[#6B4226] shadow-md"
                      : "text-stone-400 hover:text-stone-600"
                  }`}
                >
                  {status === 'all' ? 'All Items' : status === 'inStock' ? 'Live' : 'Sold Out'}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1000px]">
              <thead>
                <tr className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] border-b border-stone-50">
                  <th className="px-10 py-6">Identity</th>
                  <th className="px-10 py-6 text-center">Department</th>
                  <th className="px-10 py-6">Pricing</th>
                  <th className="px-10 py-6">Inventory</th>
                  <th className="px-10 py-6">Visibility Status</th>
                  <th className="px-10 py-6 text-right pr-12">Operations</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-50">
                {filteredProducts.map(product => (
                  <tr key={product._id} className="hover:bg-[#FAFAF5]/50 transition-colors group">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 p-1 group-hover:border-[#5A8B05]/30 transition-all flex-shrink-0">
                          {product.image ? (
                            <img src={product.image} alt="" className="w-full h-full object-cover rounded-xl" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-200">
                              <ImageIcon size={24} />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-[#6B4226] text-sm leading-tight">{product.name}</span>
                            <span className="text-[10px] font-bold text-stone-300 uppercase tracking-tighter mt-1">ID: {product._id.slice(-6).toUpperCase()}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-10 py-6 text-center">
                      <span className="text-[9px] font-black text-stone-400 bg-stone-50 border border-stone-100 px-3 py-1.5 rounded-lg uppercase tracking-widest">
                        {product.category}
                      </span>
                    </td>

                    <td className="px-10 py-6">
                      <span className="font-black text-[#6B4226] text-lg">₹{product.price.toLocaleString()}</span>
                    </td>

                    <td className="px-10 py-6">
                      <div className="flex items-center gap-2">
                        <span className={`font-black text-sm ${product.stock <= 5 ? 'text-amber-500' : 'text-stone-700'}`}>
                            {product.stock}
                        </span>
                        {product.stock <= 5 && <Info size={14} className="text-amber-400 animate-pulse" />}
                      </div>
                    </td>

                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm ${
                          product.isActive ? "bg-green-50 text-[#5A8B05] border-green-100" : "bg-red-50 text-red-600 border-red-100"
                        }`}>
                          {product.isActive ? "Online" : "Archived"}
                        </span>
                      </div>
                    </td>

                    <td className="px-10 py-6 text-right pr-12">
                      <div className="flex justify-end gap-3">
                        {/* EDIT BUTTON */}
                        <button 
                          onClick={() => { setSelectedProduct(product); setShowModal(true); }}
                          className="p-3 bg-stone-50 text-stone-400 rounded-2xl hover:bg-[#6B4226] hover:text-white transition-all shadow-sm"
                          title="Edit Details"
                        >
                          <Edit3 size={18} />
                        </button>
                        
                        {/* TOGGLE STATUS BUTTON (Archive or Active) */}
                        {product.isActive ? (
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-3 rounded-2xl bg-rose-50 text-rose-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm group/archive"
                            title="Move to Archive"
                          >
                            <Trash2 size={18} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActivate(product._id)}
                            className="p-3 rounded-2xl bg-[#5A8B05]/10 text-[#5A8B05] hover:bg-[#5A8B05] hover:text-white transition-all shadow-sm"
                            title="Restore to Shop"
                          >
                            <RefreshCw size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div className="py-32 text-center">
                <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-stone-200">
                    <Package size={32} className="text-stone-200" />
                </div>
                <p className="text-stone-300 font-black text-xs uppercase tracking-[0.2em]">No matching products found</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-8 flex justify-center items-center gap-4 opacity-30">
            <div className="h-[1px] w-12 bg-stone-400"></div>
            <MoreHorizontal size={20} />
            <div className="h-[1px] w-12 bg-stone-400"></div>
        </div>
      </main>

      <AddProductModal
        isOpen={showModal}
        onClose={() => { setSelectedProduct(null); setShowModal(false); }}
        onSuccess={handleProductAdded}
        editProduct={selectedProduct}
      />
    </div>
  );
};

// --- HELPER COMPONENT ---
const QuickStat = ({ label, value, icon, color }) => {
  const themes = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-[#5A8B05]",
    red: "bg-rose-50 text-rose-600"
  };
  return (
    <div className="bg-white p-7 rounded-[2.5rem] border border-stone-100 shadow-sm flex items-center gap-5 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 group">
      <div className={`${themes[color]} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>{icon}</div>
      <div>
        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">{label}</p>
        <h4 className="text-3xl font-black text-[#6B4226]">{value}</h4>
      </div>
    </div>
  );
};

export default AdminProducts;