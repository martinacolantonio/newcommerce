import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useCart } from '../context/CartContext';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { id } = useParams();
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    const docRef = doc(db, "products", id);
    getDoc(docRef)
      .then((res) => {
        if (res.exists()) {
          setProduct({ id: res.id, ...res.data() });
        }
      })
      .catch((error) => console.log("Error al buscar producto: ", error))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubtract = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAdd = () => {
    if (product && quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
  };

  if (loading) {
    return <h2 style={{ textAlign: 'center', marginTop: '3rem' }}>Cargando detalle... ⏳</h2>;
  }

  if (!product) {
    return <h2 style={{ textAlign: 'center', marginTop: '3rem' }}>El producto no existe ❌</h2>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '2rem', display: 'flex', gap: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <img src={product.image} alt={product.title} style={{ width: '400px', height: '400px', objectFit: 'cover', borderRadius: '8px' }} />
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{product.title}</h2>
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '1.5rem' }}>{product.description}</p>
        <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '1.5rem' }}>${product.price}</p>
        <p style={{ color: '#059669', marginBottom: '1.5rem' }}>Stock disponible: {product.stock} unidades</p>

        {!added ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <button onClick={handleSubtract} style={{ padding: '0.5rem 1rem', fontSize: '1.2rem', cursor: 'pointer' }}>-</button>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{quantity}</span>
              <button onClick={handleAdd} style={{ padding: '0.5rem 1rem', fontSize: '1.2rem', cursor: 'pointer' }}>+</button>
            </div>
            <button onClick={handleAddToCart} style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '0.75rem 1.5rem', fontSize: '1rem', borderRadius: '6px', cursor: 'pointer', width: '100%' }}>
              Agregar al Carrito
            </button>
          </div>
        ) : (
          <div>
            <p style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: '1rem' }}>¡Producto agregado con éxito!</p>
            <Link to="/cart" style={{ display: 'block', textAlign: 'center', backgroundColor: '#059669', color: 'white', padding: '0.75rem', borderRadius: '6px', textDecoration: 'none', marginBottom: '1rem' }}>
              Ir al Carrito
            </Link>
            <Link to="/" style={{ display: 'block', textAlign: 'center', color: '#475569', textDecoration: 'none' }}>
              Seguir comprando
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetailContainer;