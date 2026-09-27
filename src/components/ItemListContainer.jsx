import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useCart } from '../context/CartContext';
import ItemDetailModal from './ItemDetailModal';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const { categoryId } = useParams();
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    const productsCollection = collection(db, "products");
    const q = categoryId 
      ? query(productsCollection, where("category", "==", categoryId))
      : productsCollection;

    getDocs(q)
      .then((res) => {
        const list = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(list);
        
        // Inicializar contadores en 1 para cada producto
        const initialCounts = {};
        list.forEach(p => initialCounts[p.id] = 1);
        setQuantities(initialCounts);
      })
      .catch((error) => console.log("Error buscando productos: ", error))
      .finally(() => setLoading(false));
  }, [categoryId]);

  const handleCountChange = (id, delta, stock) => {
    setQuantities(prev => {
      const current = prev[id] || 1;
      const updated = current + delta;
      if (updated >= 1 && updated <= stock) {
        return { ...prev, [id]: updated };
      }
      return prev;
    });
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '5rem', color: '#64748b', fontSize: '1.2rem' }}>Cargando catálogo elegante... ⏳</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2.2rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.025em' }}>
        {categoryId ? `Colección: ${categoryId.toUpperCase()}` : 'Novedades Tecnológicas'}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {products.map((prod) => {
          const qty = quantities[prod.id] || 1;
          return (
            <div key={prod.id} style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
              border: '1px solid #f1f5f9',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              {/* Imagen clickeable para abrir la burbuja de detalle */}
              <div 
                onClick={() => setSelectedProduct(prod)} 
                style={{ cursor: 'pointer', overflow: 'hidden', height: '220px', backgroundColor: '#f8fafc' }}
                title="Haz clic para ver el detalle"
              >
                <img 
                  src={prod.image} 
                  alt={prod.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} 
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#3b82f6', fontWeight: 'bold', letterSpacing: '0.05em' }}>{prod.category}</span>
                  <h3 style={{ fontSize: '1.1rem', margin: '0.3rem 0 0.75rem 0', color: '#0f172a', fontWeight: '700' }}>{prod.title}</h3>
                  <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>${prod.price}</div>
                </div>

                <div>
                  {/* Selector de cantidad */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', backgroundColor: '#f8fafc', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Cantidad:</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <button 
                        onClick={() => handleCountChange(prod.id, -1, prod.stock)}
                        style={{ background: 'white', border: '1px solid #cbd5e1', width: '26px', height: '26px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                      >-</button>
                      <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{qty}</span>
                      <button 
                        onClick={() => handleCountChange(prod.id, 1, prod.stock)}
                        style={{ background: 'white', border: '1px solid #cbd5e1', width: '26px', height: '26px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                      >+</button>
                    </div>
                  </div>

                  {/* Botón de agregar al carrito */}
                  <button 
                    onClick={() => addItem(prod, qty)}
                    style={{
                      width: '100%',
                      backgroundColor: '#0f172a',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      boxShadow: '0 4px 6px rgba(15, 23, 42, 0.1)'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1e293b'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#0f172a'}
                  >
                    Agregar al Carrito 🛒
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Burbuja de detalle flotante */}
      <ItemDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addItem} 
      />
    </div>
  );
};

export default ItemListContainer;