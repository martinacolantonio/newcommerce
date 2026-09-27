import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDCjJxJMrQDtnw1gCX7_-QRL0ckPdaGQmo",
  authDomain: "newcommerce-eea8c.firebaseapp.com",
  projectId: "newcommerce-eea8c",
  storageBucket: "newcommerce-eea8c.firebasestorage.app",
  messagingSenderId: "220345916556",
  appId: "1:220345916556:web:83dee25eb8103b6d9aefa9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const misProductos = [
  // --- CATEGORÍA: celulares ---
  {
    title: "Celular Samsung Galaxy S23",
    price: 799,
    category: "celulares",
    stock: 15,
    description: "Pantalla Dynamic AMOLED 2X y excelente cámara nocturna.",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500"
  },
  {
    title: "Smartphone iPhone 14",
    price: 999,
    category: "celulares",
    stock: 10,
    description: "Chip A15 Bionic y batería de larga duración con gran diseño.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
  },
  {
    title: "Xiaomi Redmi Note 12",
    price: 299,
    category: "celulares",
    stock: 25,
    description: "Pantalla AMOLED de 120Hz y carga rápida de 33W.",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500"
  },

  // --- CATEGORÍA: computacion ---
  {
    title: "Notebook Lenovo IdeaPad 3",
    price: 650,
    category: "computacion",
    stock: 8,
    description: "Procesador Ryzen 5, 8GB RAM y disco SSD de 256GB.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
  },
  {
    title: "MacBook Air M1",
    price: 1100,
    category: "computacion",
    stock: 6,
    description: "Diseño ultradelgado, rendimiento increíble y sin ventilador.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"
  },
  {
    title: "Monitor Gamer Curvo 27''",
    price: 320,
    category: "computacion",
    stock: 12,
    description: "Resolución Full HD, 165Hz y tiempo de respuesta de 1ms.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500"
  },

  // --- CATEGORÍA: audio ---
  {
    title: "Auriculares Inalámbricos Sony WH-1000XM4",
    price: 280,
    category: "audio",
    stock: 20,
    description: "Cancelación de ruido líder en la industria y sonido de alta fidelidad.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    title: "Parlante Bluetooth JBL Flip 6",
    price: 130,
    category: "audio",
    stock: 18,
    description: "Resistente al agua IP67 y sonido potente para llevar a todos lados.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"
  },
  {
    title: "Auriculares HyperX Cloud Stinger",
    price: 75,
    category: "audio",
    stock: 14,
    description: "Cómodos para largas sesiones de juego con micrófono con cancelación.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500"
  },

  // --- CATEGORÍA: gamer ---
  {
    title: "Teclado Mecánico RGB Redragon",
    price: 65,
    category: "gamer",
    stock: 30,
    description: "Switches mecánicos, iluminación RGB personalizable y diseño compacto.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"
  },
  {
    title: "Mouse Gamer Logitech G203",
    price: 40,
    category: "gamer",
    stock: 25,
    description: "Sensor con calidad para juegos y 6 botones programables.",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500"
  },
  {
    title: "Silla Gamer Ergonómica Pro",
    price: 290,
    category: "gamer",
    stock: 5,
    description: "Reclinable, con soporte lumbar y almohadones ajustables.",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500"
  }
];

// Función para subirlos a Firebase
async function subirDatos() {
  try {
    console.log("🚀 Subiendo catálogo masivo de tecnología a Firebase...");
    for (const prod of misProductos) {
      await addDoc(collection(db, "products"), prod);
      console.log(`✅ Subido: ${prod.title} (${prod.category})`);
    }
    console.log("🎉 ¡Todos los productos se cargaron correctamente!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al subir los productos: ", error);
  }
}

subirDatos();