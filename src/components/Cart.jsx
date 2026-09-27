import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeItem, clearCart, totalPrice } = useCart();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', cardNumber: '' });
    const [orderId, setOrderId] = useState(null);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.cardNumber) {
            alert("Por favor completa todos los campos obligatorios.");
            return;
        }
        // Generamos un número de orden ficticio aleatorio
        const randomId = Math.floor(100000 + Math.random() * 900000);
        setOrderId(randomId);
        clearCart();
    };

    if (orderId) {
        return (
            <div style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem' }}>
                <h2 style={{ color: '#059669', fontSize: '2rem' }}>¡Compra realizada con éxito! 🎉</h2>
                <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>Tu número de orden es: <strong>#{orderId}</strong></p>
                <p style={{ color: '#64748b' }}>Te enviamos los detalles de pago y envío a {formData.email}</p>
                <Link to="/" style={{ display: 'inline-block', marginTop: '2rem', backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '6px', textDecoration: 'none' }}>
                    Volver al Inicio
                </Link>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <h2>Tu carrito está vacío 🛒</h2>
                <p style={{ color: '#64748b', margin: '1rem 0' }}>¿Todavía no encontraste lo que buscabas?</p>
                <Link to="/" style={{ display: 'inline-block', backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '6px', textDecoration: 'none' }}>
                    Ver productos
                </Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '2rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>Carrito de Compras</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {cart.map((prod) => (
                    <div key={prod.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src={prod.image} alt={prod.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                            <div>
                                <h4>{prod.title}</h4>
                                <p style={{ color: '#64748b' }}>Cantidad: {prod.quantity} x ${prod.price}</p>
                            </div>
                        </div>
                        <div>
                            <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>${prod.price * prod.quantity}</p>
                            <button onClick={() => removeItem(prod.id)} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                <button onClick={clearCart} style={{ backgroundColor: '#64748b', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                    Vaciar Carrito
                </button>
                <h3 style={{ fontSize: '1.5rem' }}>Total a pagar: ${totalPrice}</h3>
            </div>

            {/* Formulario de Checkout / Simulación de Pago */}
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Datos de Envío y Pago</h3>
                <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nombre completo:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Ej: Juan Pérez" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Correo electrónico:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Ej: juan@email.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Teléfono:</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Ej: 1122334455" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Número de Tarjeta (Simulación):</label>
                        <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="4532 XXXX XXXX XXXX" maxLength="16" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                    </div>
                    <button type="submit" style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '1rem', fontSize: '1.1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginTop: '1rem' }}>
                        Finalizar Compra
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Cart;