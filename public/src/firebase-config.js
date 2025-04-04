import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyABiceNcqi4onUflikpg0vkA1sNpW-wzmU",
  authDomain: "gym-management-system-f1bea.firebaseapp.com",
  projectId: "gym-management-system-f1bea",
  storageBucket: "gym-management-system-f1bea.appspot.com",
  messagingSenderId: "507559405778",
  appId: "1:507559405778:web:a382544b6c2d9361bbe50b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
