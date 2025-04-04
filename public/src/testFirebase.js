import { db, auth } from "./firebase-config.js";

// Test Firestore Connection
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function testFirestore() {
    try {
        const membersCollection = collection(db, "members");
        const memberSnapshot = await getDocs(membersCollection);
        console.log("Firestore Connected! Members:", memberSnapshot.docs.map(doc => doc.data()));
    } catch (error) {
        console.error("Firestore Error:", error);
    }
}

// Run the test when the page loads
window.onload = testFirestore;
