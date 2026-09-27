// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const NavBar = () => {
  const { totalQuantity } = useCart();

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1.25rem 3rem', 
      backgroundColor: '#ffffff', 
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      fontFamily: 'Georgia, serif'
    }}>
      <Link to="/" style={{ color: '#111827', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.025em' }}>
        New Commerce
      </Link>
      
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link to="/category/celulares" style={{ color: '#4b5563', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem' }}>Celulares</Link>
        <Link to="/category/computacion" style={{ color: '#4b5563', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem' }}>Computación</Link>
        <Link to="/category/audio" style={{ color: '#4b5563', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem' }}>Audio</Link>
        <Link to="/category/gamer" style={{ color: '#4b5563', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem' }}>Gamer</Link>
      </div>

      <div>
        <Link to="/cart" style={{ 
          backgroundColor: '#111827', 
          color: 'white', 
          padding: '0.6rem 1.25rem', 
          borderRadius: '4px', 
          textDecoration: 'none', 
          display: 'flex', 
          gap: '0.5rem', 
          alignItems: 'center',
          fontWeight: '600',
          fontSize: '0.95rem'
        }}>
          🛒 Carrito {totalQuantity > 0 && <span style={{ backgroundColor: '#dc2626', padding: '0.1rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem' }}>{totalQuantity}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;