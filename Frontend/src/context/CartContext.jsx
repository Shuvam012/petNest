import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuthContext(); // check login
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    

    // axios config (cookies enabled)
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = "http://localhost:5000";

    // ✅ Fetch cart when user logs in
    const fetchCart = async () => {
        if (!user) {
            setCartItems([]);
            return;
        }

        try {
            setLoading(true);
            const res = await axios.get("/api/cart");
            setCartItems(res.data.items || []);
        } catch (error) {
            console.error("Fetch cart failed", error);
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    };


// add to cart
const addToCart = async (productId) => {
  try {
    const res = await axios.post("/api/cart/add", {
      productId,
      quantity: 1,
    });
    setCartItems(res.data.items);
  } catch (error) {
    console.error("Add to cart failed", error);
  }
};

// update quantity
const updateQuantity = async (productId, quantity) => {
  try {
    const res = await axios.put("/api/cart/update", {
      productId,
      quantity,
    });
    setCartItems(res.data.items);
  } catch (error) {
    console.error("Update quantity failed", error);
  }
};

// remove from cart
const removeFromCart = async (productId) => {
  try {
    const res = await axios.delete("/api/cart/remove", {
      data: { productId } ,
    });
    setCartItems(res.data.items);
  } catch (error) {
    console.error("Remove from cart failed", error);
  }
};



    // 🔁 Re-fetch cart when login/logout changes
    useEffect(() => {
        fetchCart();
    }, [user]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount: cartItems.length,
                addToCart,
                removeFromCart,
                updateQuantity,
                fetchCart,
                loading,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// custom hook
export const useCartContext = () => useContext(CartContext);

