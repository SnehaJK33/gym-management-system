import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { app } from "./firebase-config.js"; 

const auth = getAuth(app);
export { auth };

// ✅ Function for user signup
export async function signup(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return { success: true, message: "Account created successfully!" };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// ✅ Function for user login
export async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// ✅ Function for logout
export function logout() {
    signOut(auth)
        .then(() => alert("Logged out successfully!"))
        .catch(error => alert("Logout Error: " + error.message));
}
