import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDKAX0ldn_rWcVqEqxshb3FxpY-t-USXzo",
  authDomain: "qrcode-4fde3.firebaseapp.com",
  projectId: "qrcode-4fde3",
  storageBucket: "qrcode-4fde3.firebasestorage.app",
  messagingSenderId: "522071707723",
  appId: "1:522071707723:web:a4452b278f3406a7fbfdce"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
