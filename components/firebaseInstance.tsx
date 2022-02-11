import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAJ0LZQwX8IT4snF3bJ5Y-KYfW79YhM-AE",
  authDomain: "laughter-87bbb.firebaseapp.com",
  projectId: "laughter-87bbb",
  storageBucket: "laughter-87bbb.appspot.com",
  messagingSenderId: "722043368517",
  appId: "1:722043368517:web:716e9ef14037902e059f2c",
  measurementId: "G-5EM63LKBJF",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
