import React, { createContext, useState } from "react";

// Creamos el contexto
export const CartContext = createContext();

// Creamos el proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.id_product === product.id_product);
      if (existingProduct) {
        // Si el producto ya está en el carrito, solo aumentamos la cantidad
        return prevItems.map((item) =>
          item.id_product === product.id_product
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Si el producto no está en el carrito, lo agregamos con cantidad 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id_product !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
