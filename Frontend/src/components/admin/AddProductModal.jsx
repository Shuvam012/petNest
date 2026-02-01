



import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, Image as ImageIcon, Loader2 } from "lucide-react";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editProduct && isOpen) {
      setFormData({
        name: editProduct.name || "",
        description: editProduct.description || "",
        price: editProduct.price || "",
        stock: editProduct.stock || "", // Corrected: use stock field
        category: editProduct.category || "food",
        petType: editProduct.petType || "dog",
      });
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
    }
  }, [editProduct, isOpen]);

  if (!isOpen) return null;

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
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("stock", formData.stock); // Corrected: sending to 'stock'
      data.append("category", formData.category);
      data.append("petType", formData.petType);
      
      if (image) data.append("image", image);

      if (editProduct) {
        await axios.put(`/api/admin/products/${editProduct._id}`, data, {
          withCredentials: true,
        });
      } else {
        await axios.post("/api/admin/products", data, {
          withCredentials: true,
        });
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

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-black text-[#6B4226] mb-6">
          {editProduct ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <input name="name" value={formData.name} placeholder="Product Name" onChange={handleChange} required className="w-full p-3.5 rounded-2xl bg-[#FAFAF5] border-none outline-none font-bold" />
            </div>
            
            <div className="col-span-2">
              <textarea name="description" value={formData.description} placeholder="Description" onChange={handleChange} required className="w-full p-3.5 rounded-2xl bg-[#FAFAF5] border-none outline-none font-medium h-24 resize-none" />
            </div>

            <input name="price" type="number" value={formData.price} placeholder="Price" onChange={handleChange} required className="w-full p-3.5 rounded-2xl bg-[#FAFAF5] border-none outline-none font-bold" />
            
            <input name="stock" type="number" value={formData.stock} placeholder="Stock" onChange={handleChange} required className="w-full p-3.5 rounded-2xl bg-[#FAFAF5] border-none outline-none font-bold" />

            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3.5 rounded-2xl bg-[#FAFAF5] border-none outline-none font-bold appearance-none">
              <option value="food">Food</option>
              <option value="medicine">Medicine</option>
              <option value="accessories">Accessories</option>
              <option value="clothes">Clothes</option>
            </select>

            <select name="petType" value={formData.petType} onChange={handleChange} className="w-full p-3.5 rounded-2xl bg-[#FAFAF5] border-none outline-none font-bold appearance-none">
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </div>

          <label className="flex items-center gap-3 cursor-pointer bg-[#FAFAF5] p-4 rounded-2xl border-2 border-dashed border-gray-100 hover:border-[#5A8B05]/30 transition-all">
            <ImageIcon className="text-gray-400" size={20} />
            <span className="text-sm font-bold text-gray-400 truncate">
              {image ? image.name : editProduct ? "Change Product Image (Optional)" : "Upload Product Image"}
            </span>
            <input type="file" accept="image/*" hidden onChange={(e) => setImage(e.target.files[0])} />
          </label>

          <button disabled={loading} type="submit" className="w-full bg-[#5A8B05] hover:bg-[#4a7204] text-white py-4 rounded-2xl font-black shadow-lg transition-all active:scale-95 flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : editProduct ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;