// ✅ Import Firebase Auth functions
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebase-config.js';

// ✅ Initialize Firebase Auth
const auth = getAuth(app);

// 🔐 Login function
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log("✅ Login successful:", userCredential.user);
      return userCredential.user;
    })
    .catch(error => {
      console.error("❌ Login failed:", error.message);
      throw error;
    });
};

// ✨ Signup function
export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log("✅ Signup successful:", userCredential.user);
      return userCredential.user;
    })
    .catch(error => {
      console.error("❌ Signup failed:", error.message);
      throw error;
    });
};
