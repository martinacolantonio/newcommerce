import React from 'react';

const ItemDetailModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="modal-overlay" style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        maxWidth: '750px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        position: 'relative'
      }}>
        {/* Botón de cerrar */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            transition: 'background 0.2s'
          }}
        >
          ✕
        </button>

        <img src={product.image} alt={product.title} style={{ width: '50%', objectFit: 'cover', minHeight: '350px' }} />
        
        <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '50%' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#3b82f6', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {product.category}
          </span>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#0f172a' }}>{product.title}</h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>{product.description}</p>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem' }}>${product.price}</div>
          
          <button 
            onClick={() => {
              onAddToCart(product, 1);
              onClose();
            }}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '0.85rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.2s',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
            }}
          >
            Agregar al Carrito 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailModal;