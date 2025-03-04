import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore"; // Dùng Firestore từ Firebase Web SDK

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAnhg4GkDDP9EdeZ91PAO-AFQuCDSKDZIE",
  authDomain: "apicro101.firebaseapp.com",
  projectId: "apicro101",
  storageBucket: "apicro101.firebasestorage.app",
  messagingSenderId: "480901701002",
  appId: "1:480901701002:web:dc6fa8916433f3c5d3fc73",
  measurementId: "G-PFSYDD946G"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Khởi tạo Firestore
const ordersCollection = collection(db, "orders"); // ✅ Truy cập collection 'orders'

export { auth, db, ordersCollection };
