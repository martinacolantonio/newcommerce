import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '3rem' }}>404 - Página no encontrada</h2>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;