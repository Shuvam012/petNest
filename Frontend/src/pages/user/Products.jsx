

import React, { useState, useEffect } from "react";
import {
    Search,
    ShoppingCart,
    Loader2,
    ChevronDown,
    Filter,
    Check,
    ShoppingBag,
    ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useCartContext } from "../../context/CartContext";

const Products = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { cartItems, addToCart } = useCartContext();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [activePet, setActivePet] = useState("All Pets");
    const [activeCategory, setActiveCategory] = useState("All Categories");
    const [searchQuery, setSearchQuery] = useState("");
    const [openDropdown, setOpenDropdown] = useState(null);

    const petTypes = ["All Pets", "dog", "cat"];
    const categories = ["All Categories", "food", "medicine", "accessories", "clothes"];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // const res = await fetch("http://localhost:5000/api/products");
                const res = await fetch("process.env.VITE_DEV_BASE_URL/api/products");
                if (!res.ok) throw new Error("Failed to fetch products");
                const data = await res.json();
                setProducts(Array.isArray(data.products) ? data.products : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter((p) => {
        return (
            (activePet === "All Pets" || p.petType === activePet) &&
            (activeCategory === "All Categories" || p.category === activeCategory) &&
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="bg-[#FAFAF5] min-h-screen">
            {/* 1. HEADER SECTION */}
            <div className="bg-white pt-12 pb-8 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#5A8B05] font-black text-xs uppercase tracking-[0.2em]">
                            <ShoppingBag size={14} /> Our Collection
                        </div>
                        <h1 className="text-5xl font-black text-[#6B4226] tracking-tight">
                            The Pet <span className="text-[#5A8B05]">Shop</span>
                        </h1>
                        <p className="text-stone-400 font-medium max-w-md">
                            Browse our curated selection of premium essentials for your furry companions.
                        </p>
                    </div>

                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#5A8B05] transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-[1.5rem] bg-stone-50 border-2 border-transparent focus:border-[#5A8B05]/20 focus:bg-white outline-none transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* 2. STICKY FILTER BAR */}
            <div className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-md border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-3 items-center">
                    <div className="flex items-center gap-2 px-3 py-2 bg-stone-100 rounded-lg text-stone-500 font-bold text-[10px] uppercase tracking-wider">
                        <Filter size={12} /> Filter
                    </div>

                    {/* Dropdowns */}
                    {[
                        { label: activePet, options: petTypes, state: setActivePet, key: "pet" },
                        { label: activeCategory, options: categories, state: setActiveCategory, key: "category" }
                    ].map((drop) => (
                        <div key={drop.key} className="relative">
                            <button
                                onClick={() => setOpenDropdown(openDropdown === drop.key ? null : drop.key)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl border-2 transition-all font-bold text-sm ${openDropdown === drop.key ? "border-[#5A8B05] text-[#5A8B05] bg-[#5A8B05]/5" : "border-stone-100 bg-white text-stone-600 hover:border-stone-200"
                                    }`}
                            >
                                {drop.label}
                                <ChevronDown size={14} className={`transition-transform ${openDropdown === drop.key ? "rotate-180" : ""}`} />
                            </button>

                            {openDropdown === drop.key && (
                                <div className="absolute mt-2 w-56 bg-white rounded-2xl shadow-2xl shadow-stone-200/50 border border-stone-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                    {drop.options.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => { drop.state(opt); setOpenDropdown(null); }}
                                            className="w-full px-5 py-3 text-left hover:bg-stone-50 text-sm font-bold text-stone-600 flex justify-between items-center transition-colors"
                                        >
                                            {opt}
                                            {drop.label === opt && <Check size={14} className="text-[#5A8B05]" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="ml-auto flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span className="text-xs font-black text-stone-400 uppercase tracking-tighter">
                            {filteredProducts.length} Products Found
                        </span>
                    </div>
                </div>
            </div>

            {/* 3. PRODUCTS GRID */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <Loader2 className="w-12 h-12 animate-spin text-[#5A8B05]" />
                        <p className="font-black text-stone-300 uppercase tracking-widest text-xs">Fetching Goodies...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-40">
                        <div className="bg-red-50 text-red-500 inline-block p-6 rounded-[2rem] font-bold">
                            Error: {error}
                        </div>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {filteredProducts.map((product) => {
                            const isInCart = cartItems?.some(item => item.product._id === product._id);
                            return (
                                <div key={product._id} className="group relative bg-white rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                                    {/* Image Container */}
                                    <div className="relative h-64 w-full mb-6 overflow-hidden rounded-[2rem] bg-stone-100">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Pet Tag */}
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#6B4226] shadow-sm">
                                            {product.petType}
                                        </div>
                                    </div>

                                    <div className="px-2 space-y-1">
                                        <p className="text-[#5A8B05] font-black text-[10px] uppercase tracking-widest">{product.category}</p>
                                        <h3 className="font-black text-[#6B4226] text-xl tracking-tight leading-tight">
                                            {product.name}
                                        </h3>
                                        <p className="text-stone-400 text-xs font-medium line-clamp-2 h-8">
                                            {product.desc}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-6 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-stone-300 uppercase leading-none">Price</span>
                                            <span className="text-2xl font-black text-[#6B4226]">₹{product.price}</span>
                                        </div>

                                        {/* <button
                                            onClick={() => {
                                                if (!user) return navigate("/login");
                                                isInCart ? navigate("/cart") : addToCart(product._id);
                                            }}
                                            className={`p-4 rounded-2xl transition-all duration-300 shadow-lg active:scale-90 ${
                                                isInCart 
                                                ? "bg-white border-2 border-[#5A8B05] text-[#5A8B05] hover:bg-[#5A8B05] hover:text-white" 
                                                : "bg-[#6B4226] text-white hover:bg-[#5A8B05]"
                                            }`}
                                        >
                                            {isInCart ? <Check size={20} strokeWidth={3} /> : <ShoppingCart size={20} strokeWidth={2.5} />}
                                        </button> */}
                                        <button
                                            onClick={() => {
                                                if (!user) return navigate("/login");
                                                isInCart ? navigate("/cart") : addToCart(product._id);
                                            }}
                                            className={`px-5 py-2.5 rounded-full flex items-center gap-2 font-black text-[11px] tracking-wider transition-all duration-300 shadow-sm active:scale-95 border-2 ${isInCart
                                                    ? "bg-[#5A8B05]/10 border-[#5A8B05] text-[#5A8B05] hover:bg-[#5A8B05] hover:text-white"
                                                    : "bg-white border-[#6B4226] text-[#6B4226] hover:bg-[#6B4226] hover:text-white"
                                                }`}
                                        >
                                            {isInCart ? (
                                                <>
                                                    <Check size={14} strokeWidth={4} />
                                                    <span>GO TO CART</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart size={14} strokeWidth={3} />
                                                    <span>ADD TO CART</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-40 space-y-4">
                        <div className="text-6xl text-stone-200 font-black">☹</div>
                        <p className="text-stone-400 font-bold text-xl">We couldn't find any results.</p>
                        <button onClick={() => { setActivePet("All Pets"); setActiveCategory("All Categories"); setSearchQuery(""); }}
                            className="text-[#5A8B05] font-black hover:underline underline-offset-4">
                            Clear all filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Products;
