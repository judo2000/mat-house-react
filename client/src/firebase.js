import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCq_ZuLq7tAJSapV5pbwXaCzj4bBQZeXms',
  authDomain: 'mathouse-7ebb9.firebaseapp.com',
  projectId: 'mathouse-7ebb9',
  storageBucket: 'mathouse-7ebb9.appspot.com',
  messagingSenderId: '403081693223',
  appId: '1:403081693223:web:2b2de85d92e6e360952602',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
