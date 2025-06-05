// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBOupSQRfg9D_gyRk2d2NVPHZ9uB6znqHY",
  authDomain: "club-management-2d0c5.firebaseapp.com",
  projectId: "club-management-2d0c5",
  storageBucket: "club-management-2d0c5.firebasestorage.app",
  messagingSenderId: "211279805816",
  appId: "1:211279805816:web:3d6c1e19ae0e2902125c8d",
  measurementId: "G-90VGGK0NJD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
