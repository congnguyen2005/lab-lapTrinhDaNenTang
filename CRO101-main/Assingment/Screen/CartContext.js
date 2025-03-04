import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  const clearPaidItems = (selectedIds) => {
    if (!Array.isArray(selectedIds) || selectedIds.length === 0) {
      console.error("clearPaidItems: selectedIds is not a valid array", selectedIds);
      return;
    }
    setCart((prevCart) => prevCart.filter((item) => !selectedIds.includes(item.id)));
  };
  

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1, size: "S" }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const updateSize = (id, newSize) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, size: newSize } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, updateSize, removeFromCart, clearPaidItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

