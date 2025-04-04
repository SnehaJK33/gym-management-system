// src/auth.js

const signUp = async (email, password) => {
  try {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABiceNcqi4onUflikpg0vkA1sNpW-wzmU",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error.message); // Logs Firebase error messages
    }

    console.log("User Signed Up:", data);
    alert("Signup successful! Please log in.");
  } catch (error) {
    console.error("Signup Error:", error.message);
    alert("Signup Failed: " + error.message); // Show user-friendly error message
  }
};

// Event Listener for Signup Button
document.getElementById("signupBtn").addEventListener("click", () => {
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;
  
  signUp(email, password);
});

