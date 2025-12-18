import axios from "axios";
import { useState, createContext, useEffect } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem('userToken')
  };
  
  const [cart, setCart] = useState(null);

  async function addProductToCart(productId) {
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
        productId: productId
      }, {
        headers: headers
      });
      console.log(data);
      getProductToCart();
      toast.success(data.message, { duration: 2000 });
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteProductToCart(productId) {
    try {
      let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: headers
      });
      console.log(data);
      setCart(data);
      toast.success(data.status, { duration: 2000 });
    } catch (err) {
      console.log(err);
    }
  }

  async function updatProductCountToCart(productId, count) {
    try {
      let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        count
      }, {
        headers: headers
      });
      console.log(data);
      setCart(data);
      toast.success(data.status, { duration: 2000 });
    } catch (err) {
      console.log(err);
    }
  }

  async function getProductToCart() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: headers
      });
      //console.log(data);
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProductToCart();
  }, []);

  return (
    <CartContext.Provider value={{ addProductToCart, cart, updatProductCountToCart, deleteProductToCart }}>
      {children}
    </CartContext.Provider>
  );
}
