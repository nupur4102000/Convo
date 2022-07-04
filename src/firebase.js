// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyPGiZ_Ci5UuYTMokwtkaQhTQX8OVocug",
  authDomain: "convo-chat-e138b.firebaseapp.com",
  projectId: "convo-chat-e138b",
  storageBucket: "convo-chat-e138b.appspot.com",
  messagingSenderId: "525694057296",
  appId: "1:525694057296:web:9317ec56856a2a43e24a55",
  measurementId: "G-PD98LTJD2W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);