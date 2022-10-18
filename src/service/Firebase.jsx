import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBOnGbBdG-5Gy_AXEKj9OsbPR2PPwiZYW0",
  authDomain: "storange-facturacion.firebaseapp.com",
  projectId: "storange-facturacion",
  storageBucket: "storange-facturacion.appspot.com",
  messagingSenderId: "970902455152",
  appId: "1:970902455152:web:18c8becdbe451b0e5f05b5"
}

export const db = getFirestore(initializeApp(firebaseConfig))