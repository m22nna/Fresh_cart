import axios from "axios";
import { useState, createContext, useEffect } from "react";
import toast from "react-hot-toast";

export let WishContext = createContext();

export default function WishContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem('userToken')
  };

  const [wishlist, setWishlist] = useState([]);
  const [wishlistIds, setWishlistIds] = useState(new Set());

  async function addProductToWishlist(productId) {
    try {
      await axios.post(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { productId },
        { headers }
      );
      toast.success('Added to Wishlist', { duration: 2000 });
      getWishlist();
    } catch (err) {
      console.error(err);
    }
  }

  async function removeProductFromWishlist(productId) {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
      toast('Removed from Wishlist', { duration: 2000 });
      setWishlist(prev => prev.filter(item => item._id !== productId && item.id !== productId));
      setWishlistIds(prev => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function getWishlist() {
    try {
      let { data } = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { headers }
      );
      setWishlist(data.data);
      setWishlistIds(new Set(data.data.map(item => item._id || item.id)));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      getWishlist();
    }
  }, []);

  return (
    <WishContext.Provider value={{ wishlist, wishlistIds, addProductToWishlist, removeProductFromWishlist, getWishlist }}>
      {children}
    </WishContext.Provider>
  );
}
