import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar al carrito
  const addItem = (item, quantity) => {
    const existingIndex = cart.findIndex((prod) => prod.id === item.id);
    if (existingIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  // Eliminar un producto individual
  const removeItem = (id) => {
    setCart(cart.filter((prod) => prod.id !== id));
  };

  // Vaciar carrito
  const clearCart = () => {
    setCart([]);
  };

  // Calcular total de productos en el icono
  const totalQuantity = cart.reduce((acc, prod) => acc + prod.quantity, 0);

  // Calcular precio total a pagar
  const totalPrice = cart.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, totalQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};