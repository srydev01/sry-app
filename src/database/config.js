import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCdGzCiOpzBW-vubwXMh5crAmUg1Jzkr2M",
  authDomain: "sry-app.firebaseapp.com",
  databaseURL: "https://sry-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sry-app",
  storageBucket: "sry-app.appspot.com",
  messagingSenderId: "65562504769",
  appId: "1:65562504769:web:c658bfddfd82bf1cd360c0",
  measurementId: "G-BK2NWXRSDG"
};

const app = initializeApp(firebaseConfig);
const firebase = getFirestore(app);

export default firebase;