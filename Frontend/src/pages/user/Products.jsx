

import React, { useState, useEffect } from "react";
import {
    Search,
    ShoppingCart,
    Loader2,
    ChevronDown,
    Filter,
    Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useCartContext } from "../../context/CartContext";

const Products = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { cartItems, addToCart } = useCartContext();

    // Backend state
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filters
    const [activePet, setActivePet] = useState("All Pets");
    const [activeCategory, setActiveCategory] = useState("All Categories");
    const [searchQuery, setSearchQuery] = useState("");

    // Dropdown
    const [openDropdown, setOpenDropdown] = useState(null);

    const petTypes = ["All Pets", "dog", "cat"];
    const categories = ["All Categories", "food", "medicine", "accessories", "clothes"];

    // 🔹 Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch("http://localhost:5000/api/products");
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

    // 🔹 Filter products
    const filteredProducts = products.filter((p) => {
        return (
            (activePet === "All Pets" || p.petType === activePet) &&
            (activeCategory === "All Categories" || p.category === activeCategory) &&
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <div className="bg-[#FAFAF5] min-h-screen pb-20">
            {/* HEADER */}
            <header className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-[#6B4226]">
                            Shop for Your Pet
                        </h1>
                        <p className="text-gray-500 text-lg">
                            Quality food, toys & essentials your pet will love.
                        </p>
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border-2 focus:border-[#5A8B05]/30 outline-none"
                        />
                    </div>
                </div>
            </header>

            {/* FILTER BAR */}
            <div className="sticky top-16 z-40 bg-white/90 backdrop-blur border-b">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-4 items-center">
                    <span className="text-xs font-bold text-gray-400 flex items-center gap-2">
                        <Filter size={14} /> Filter By
                    </span>

                    {/* PET */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown("pet")}
                            className="flex items-center gap-2 px-5 py-2 rounded-xl border font-bold"
                        >
                            {activePet}
                            <ChevronDown size={16} />
                        </button>

                        {openDropdown === "pet" && (
                            <div className="absolute mt-2 w-52 bg-white rounded-xl shadow-lg">
                                {petTypes.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => {
                                            setActivePet(type);
                                            setOpenDropdown(null);
                                        }}
                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex justify-between"
                                    >
                                        {type}
                                        {activePet === type && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* CATEGORY */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown("category")}
                            className="flex items-center gap-2 px-5 py-2 rounded-xl border font-bold"
                        >
                            {activeCategory}
                            <ChevronDown size={16} />
                        </button>

                        {openDropdown === "category" && (
                            <div className="absolute mt-2 w-52 bg-white rounded-xl shadow-lg">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setActiveCategory(cat);
                                            setOpenDropdown(null);
                                        }}
                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex justify-between"
                                    >
                                        {cat}
                                        {activeCategory === cat && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <span className="ml-auto text-sm text-gray-400">
                        Showing {filteredProducts.length} results
                    </span>
                </div>
            </div>

            {/* PRODUCTS */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                {loading && (
                    <div className="flex justify-center py-32">
                        <Loader2 className="w-10 h-10 animate-spin text-[#5A8B05]" />
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-500 font-bold py-32">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredProducts.map((product) => {
                                const isInCart = cartItems?.some(
                                    (item) => item.product._id === product._id
                                );

                                return (
                                    <div
                                        key={product._id}
                                        className="bg-white rounded-3xl p-4 shadow hover:shadow-xl transition"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-56 w-full object-cover rounded-2xl mb-4"
                                        />

                                        <h3 className="font-black text-[#6B4226] text-lg">
                                            {product.name}
                                        </h3>

                                        <p className="text-gray-400 text-sm line-clamp-2">
                                            {product.desc}
                                        </p>

                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-xl font-black">
                                                ₹ {product.price}
                                            </span>

                                            <button
                                                onClick={() => {
                                                    if (!user) {
                                                        navigate("/login");
                                                        return;
                                                    }

                                                    if (isInCart) {
                                                        navigate("/cart");
                                                    } else {
                                                        addToCart(product._id);
                                                    }
                                                }}
                                                className="bg-[#5A8B05] text-white px-4 py-3 rounded-xl flex items-center gap-2"
                                            >
                                                <ShoppingCart size={18} />
                                                <span>{isInCart ? "Go to Cart" : "Add to Cart"}</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400 font-bold py-32">
                            No products found
                        </p>
                    )
                )}
            </main>
        </div>
    );
};

export default Products;
