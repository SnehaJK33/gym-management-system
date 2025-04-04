import { login, signup, logout } from './auth.js';

const authSection = document.getElementById("authSection");
const adminDashboard = document.getElementById("adminDashboard");

const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const authMessage = document.getElementById("authMessage");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");

loginBtn.addEventListener("click", async () => {
  const result = await login(authEmail.value, authPassword.value);
  if (result.success) {
    showDashboard();
  } else {
    authMessage.innerText = result.message;
  }
});

signupBtn.addEventListener("click", async () => {
  const result = await signup(authEmail.value, authPassword.value);
  if (result.success) {
    showDashboard();
  } else {
    authMessage.innerText = result.message;
  }
});

logoutBtn.addEventListener("click", () => {
  logout();
  showAuthSection();
});

function showDashboard() {
  authSection.style.display = "none";
  adminDashboard.style.display = "block";
}

function showAuthSection() {
  authSection.style.display = "block";
  adminDashboard.style.display = "none";
}
