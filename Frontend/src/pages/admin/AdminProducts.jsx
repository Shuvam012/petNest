

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Package,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon
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

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/products", {
        withCredentials: true,
      });
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductAdded = () => {
    fetchProducts();
    toast.success("Inventory Updated");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/api/admin/products/${id}`, {
          withCredentials: true,
        });
        fetchProducts();
        toast.success("Product Deleted");
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (stockFilter === "inStock") return matchesSearch && p.stock > 0;
    if (stockFilter === "outOfStock") return matchesSearch && p.stock <= 0;
    return matchesSearch;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center font-bold text-[#6B4226] bg-[#FAFAF5]">
      Accessing PetNest Inventory...
    </div>
  );

  return (
    /* Change 1: Added 'flex' to parent and removed 'fixed' logic from child interaction */
    <div className="flex min-h-screen bg-[#FAFAF5]">
      <Toaster />
      
      {/* Sidebar sits naturally on the left */}
      <AdminSidebar />

      {/* Change 2: Removed 'ml-64' so content flows next to Sidebar */}
      <main className="flex-1 p-8 lg:p-12 overflow-x-hidden">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#6B4226] tracking-tight">Product Management</h1>
            <p className="text-gray-400 font-medium mt-1">Manage inventory, pricing, and availability</p>
          </div>

          <button  
            onClick={() => {
              setSelectedProduct(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-[#5A8B05] hover:bg-[#4a7204] text-white px-6 py-3 rounded-2xl font-black transition-all shadow-lg active:scale-95"
          >
            <Plus size={20} /> Add Product
          </button>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-blue-50 text-blue-600 p-3 rounded-xl"><Package size={24} /></div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Products</p>
              <h4 className="text-2xl font-black text-[#6B4226]">{products.length}</h4>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-green-50 text-[#5A8B05] p-3 rounded-xl"><CheckCircle2 size={24} /></div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">In Stock</p>
              <h4 className="text-2xl font-black text-[#6B4226]">{products.filter(p => p.stock > 0).length}</h4>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-red-50 text-red-600 p-3 rounded-xl"><AlertCircle size={24} /></div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Out of Stock</p>
              <h4 className="text-2xl font-black text-[#6B4226]">{products.filter(p => p.stock <= 0).length}</h4>
            </div>
          </div>
        </div>

        {/* Filters and Table */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-gray-100 text-sm focus:ring-2 focus:ring-[#5A8B05]/20 outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex bg-[#FAFAF5] p-1.5 rounded-2xl border border-gray-100">
              {['all', 'inStock', 'outOfStock'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStockFilter(status)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                    stockFilter === status
                      ? "bg-white text-[#6B4226] shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {status === 'all' ? 'All' : status === 'inStock' ? 'In Stock' : 'Out'}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[900px]">
              <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <tr>
                  <th className="px-8 py-5">Product</th>
                  <th className="px-8 py-5">Category</th>
                  <th className="px-8 py-5">Price</th>
                  <th className="px-8 py-5">Stock</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {filteredProducts.map(product => (
                  <tr key={product._id} className="hover:bg-[#FAFAF5]/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-stone-100 rounded-2xl overflow-hidden border">
                          {product.image ? (
                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-300">
                              <ImageIcon size={20} />
                            </div>
                          )}
                        </div>
                        <span className="font-black text-stone-700 text-sm">{product.name}</span>
                      </div>
                    </td>

                    <td className="px-8 py-5 text-xs font-bold text-stone-400 uppercase">
                      {product.category}
                    </td>

                    <td className="px-8 py-5 font-black text-[#6B4226]">
                      ₹{product.price.toLocaleString()}
                    </td>

                    <td className="px-8 py-5 font-black">
                      {product.stock}
                    </td>

                    <td className="px-8 py-5">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${
                        product.isActive ? "bg-green-50 text-[#5A8B05]" : "bg-red-50 text-red-600"
                      }`}>
                        {product.isActive ? "Active" : "Disabled"}
                      </span>
                    </td>

                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowModal(true);
                          }}
                          className="p-2.5 bg-stone-100 rounded-xl hover:bg-stone-200 transition-colors"
                        >
                          <Edit3 size={18} />
                        </button>
                        
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center text-gray-400 font-bold">
                No products found.
              </div>
            )}
          </div>
        </div>
      </main>

      <AddProductModal
        isOpen={showModal}
        onClose={() => {
          setSelectedProduct(null);
          setShowModal(false);
        }}
        onSuccess={handleProductAdded}
        editProduct={selectedProduct}
      />
    </div>
  );
};

export default AdminProducts;