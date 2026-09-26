import axios from "axios";
import { useState, createContext, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {

  // Always read token fresh from localStorage per-request
  function getHeaders() {
    return { token: localStorage.getItem('userToken') };
  }

  const [cart, setCart] = useState(null);
  const [cartLoading, setCartLoading] = useState(true);

  async function addProductToCart(productId) {
    try {
      let { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId },
        { headers: getHeaders() }
      );
      await getProductToCart();
      toast.success(data.message || 'Added to cart!', { duration: 2000 });
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to add to cart');
      console.error(err);
    }
  }

  async function deleteProductToCart(productId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: getHeaders() }
      );
      setCart(data);
      toast.success('Item removed from cart', { duration: 2000 });
    } catch (err) {
      toast.error('Failed to remove item');
      console.error(err);
    }
  }

  async function updatProductCountToCart(productId, count) {
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers: getHeaders() }
      );
      setCart(data);
    } catch (err) {
      toast.error('Failed to update quantity');
      console.error(err);
    }
  }

  async function clearCart() {
    try {
      await axios.delete(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { headers: getHeaders() }
      );
      setCart(null);
      toast.success('Cart cleared!', { duration: 2000 });
    } catch (err) {
      toast.error('Failed to clear cart');
      console.error(err);
    }
  }

  async function getProductToCart() {
    try {
      let { data } = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { headers: getHeaders() }
      );
      setCart(data);
      setCartLoading(false);
    } catch (err) {
      // 404 means cart is empty
      setCart(null);
      setCartLoading(false);
      console.error(err);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      getProductToCart();
    } else {
      setCartLoading(false);
    }
  }, []);

  return (
    <CartContext.Provider value={{
      addProductToCart,
      cart,
      cartLoading,
      updatProductCountToCart,
      deleteProductToCart,
      clearCart,
      getProductToCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}
