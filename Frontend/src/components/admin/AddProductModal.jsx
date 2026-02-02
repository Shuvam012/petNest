



import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, Image as ImageIcon, Loader2, UploadCloud, Info } from "lucide-react";

const AddProductModal = ({ isOpen, onClose, onSuccess, editProduct = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "food",
    petType: "dog",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editProduct && isOpen) {
      setFormData({
        name: editProduct.name || "",
        description: editProduct.description || "",
        price: editProduct.price || "",
        stock: editProduct.stock || "",
        category: editProduct.category || "food",
        petType: editProduct.petType || "dog",
      });
      setImagePreview(editProduct.image || null);
    } else if (!editProduct && isOpen) {
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "food",
        petType: "dog",
      });
      setImage(null);
      setImagePreview(null);
    }
  }, [editProduct, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image && !editProduct) {
      alert("Product image is required");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (image) data.append("image", image);

      if (editProduct) {
        await axios.put(`/api/admin/products/${editProduct._id}`, data, { withCredentials: true });
      } else {
        await axios.post("/api/admin/products", data, { withCredentials: true });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#6B4226]/20 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] p-8 lg:p-10 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] relative animate-in zoom-in-95 fade-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 p-2 bg-stone-50 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1.5 w-8 bg-[#5A8B05] rounded-full"></div>
            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Inventory Management</span>
          </div>
          <h2 className="text-3xl font-black text-[#6B4226] tracking-tight">
            {editProduct ? "Modify Product" : "Launch New Product"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Details */}
            <div className="space-y-4">
              <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest ml-1">Basic Information</p>
              <input 
                name="name" 
                value={formData.name} 
                placeholder="Product Title" 
                onChange={handleChange} 
                required 
                className="w-full p-4 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-[#5A8B05]/20 focus:bg-white transition-all outline-none font-bold text-[#6B4226] placeholder:text-stone-300" 
              />
              <textarea 
                name="description" 
                value={formData.description} 
                placeholder="Write a compelling description..." 
                onChange={handleChange} 
                required 
                className="w-full p-4 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-[#5A8B05]/20 focus:bg-white transition-all outline-none font-medium text-stone-600 h-32 resize-none placeholder:text-stone-300" 
              />
            </div>

            {/* Right Column: Numbers & Categories */}
            <div className="space-y-4">
              <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest ml-1">Inventory & Type</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A8B05] font-black text-xs">₹</span>
                  <input name="price" type="number" value={formData.price} placeholder="Price" onChange={handleChange} required className="w-full pl-8 pr-4 py-4 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-[#5A8B05]/20 focus:bg-white outline-none font-black text-[#6B4226]" />
                </div>
                <input name="stock" type="number" value={formData.stock} placeholder="Stock Qty" onChange={handleChange} required className="w-full p-4 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-[#5A8B05]/20 focus:bg-white outline-none font-black text-[#6B4226]" />
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="relative">
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full p-4 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-[#5A8B05]/20 focus:bg-white outline-none font-black text-[#6B4226] appearance-none cursor-pointer">
                    <option value="food">Pet Food</option>
                    <option value="medicine">Healthcare</option>
                    <option value="accessories">Toys & Gear</option>
                    <option value="clothes">Pet Apparel</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-300"><Info size={16}/></div>
                </div>

                <select name="petType" value={formData.petType} onChange={handleChange} className="w-full p-4 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-[#5A8B05]/20 focus:bg-white outline-none font-black text-[#6B4226] appearance-none cursor-pointer">
                  <option value="dog">For Dogs</option>
                  <option value="cat">For Cats</option>
                </select>
              </div>
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200 flex items-center justify-center overflow-hidden flex-shrink-0">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="text-stone-200" size={32} />
              )}
            </div>
            <label className="flex-1 flex flex-col items-center justify-center cursor-pointer bg-stone-50/50 p-4 rounded-3xl border-2 border-dashed border-stone-200 hover:border-[#5A8B05]/30 hover:bg-[#FAFAF5] transition-all group">
              <UploadCloud className="text-stone-300 group-hover:text-[#5A8B05] transition-colors mb-1" size={24} />
              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest group-hover:text-[#6B4226]">
                {image ? image.name : editProduct ? "Replace Image" : "Upload High-Res Media"}
              </span>
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </label>
          </div>

          {/* Action Button */}
          <button 
            disabled={loading} 
            type="submit" 
            className="w-full bg-[#6B4226] hover:bg-[#5A8B05] text-white py-5 rounded-[2rem] font-black shadow-xl shadow-[#6B4226]/10 transition-all active:scale-[0.98] flex justify-center items-center gap-3 uppercase tracking-[0.15em] text-xs"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>{editProduct ? "Apply Modifications" : "Confirm & Catalog Product"}</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;