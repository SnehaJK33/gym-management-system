import { auth, login, signup, logout } from "../src/auth.js";

document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const authSection = document.getElementById("authSection");
    const adminDashboard = document.getElementById("adminDashboard");

    const authEmail = document.getElementById("authEmail");
    const authPassword = document.getElementById("authPassword");
    const authMessage = document.getElementById("authMessage");

    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    // ✅ Login Function
    loginBtn.addEventListener("click", async () => {
        const email = authEmail.value;
        const password = authPassword.value;

        const result = await login(email, password);
        if (result.success) {
            showDashboard();
        } else {
            authMessage.innerText = result.message;
        }
    });

    // ✅ Signup Function
    signupBtn.addEventListener("click", async () => {
        const email = authEmail.value;
        const password = authPassword.value;

        const result = await signup(email, password);
        if (result.success) {
            showDashboard();
        } else {
            authMessage.innerText = result.message;
        }
    });

    // ✅ Logout Function
    logoutBtn.addEventListener("click", () => {
        logout();
        showAuthSection();
    });

    // ✅ Show Dashboard
    function showDashboard() {
        authSection.style.display = "none";
        adminDashboard.style.display = "block";
    }

    // ✅ Show Login/Signup Section
    function showAuthSection() {
        authSection.style.display = "block";
        adminDashboard.style.display = "none";
    }
});
