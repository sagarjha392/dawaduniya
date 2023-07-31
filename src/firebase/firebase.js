import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3_lHKm1OUcwSYXimBtUpMpvi0N9gR8YM",
  authDomain: "dawaduniya-79b62.firebaseapp.com",
  projectId: "dawaduniya-79b62",
  storageBucket: "dawaduniya-79b62.appspot.com",
  messagingSenderId: "1056763966784",
  appId: "1:1056763966784:web:68a4a853f16c29cf3a76a5",
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
