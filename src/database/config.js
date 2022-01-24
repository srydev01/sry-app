import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAKvhC5kNg1mlGCplR-3a70Wnrmp0Pag5A",
  authDomain: "test-project-ea750.firebaseapp.com",
  databaseURL: "https://test-project-ea750-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-project-ea750",
  storageBucket: "test-project-ea750.appspot.com",
  messagingSenderId: "156246530657",
  appId: "1:156246530657:web:6d5a06c8aefce76377a820",
  measurementId: "G-2W2ZK99PHS"
};

const app = initializeApp(firebaseConfig);
const firebase = getFirestore(app);

export default firebase;