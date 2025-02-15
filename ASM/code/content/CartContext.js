import React, { createContext, useContext, useState } from "react";

// Tạo Context
export const CartContext = createContext();

// Provider để bọc toàn bộ ứng dụng
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook để sử dụng CartContext dễ dàng hơn
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
