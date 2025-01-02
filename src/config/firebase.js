import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAC2LqB_JrxynKYznLeA5aF7zE7hJnTfC4",
  authDomain: "qrcode-5ae7e.firebaseapp.com",
  projectId: "qrcode-5ae7e",
  storageBucket: "qrcode-5ae7e.firebasestorage.app",
  messagingSenderId: "1009898620854",
  appId: "1:1009898620854:web:31220720fe710a4e15e317"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);