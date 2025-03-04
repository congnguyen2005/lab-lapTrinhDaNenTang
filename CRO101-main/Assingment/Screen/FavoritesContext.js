import React, { createContext, useContext, useState } from "react";

// Tạo Context
const FavoritesContext = createContext();

// Provider quản lý danh sách yêu thích
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Hàm thêm/xóa sản phẩm yêu thích
  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((item) => item.id === product.id);
      if (isFavorite) {
        return prevFavorites.filter((item) => item.id !== product.id); // Xóa nếu đã có
      } else {
        return [...prevFavorites, product]; // Thêm nếu chưa có
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook để sử dụng FavoritesContext
export const useFavorites = () => {
  return useContext(FavoritesContext);
};
