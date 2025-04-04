// Import Firebase Firestore
import { db } from "./firebase-config.js";
import { 
    collection, addDoc, getDocs, query, where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 Reference to the "bills" collection in Firestore
const billsCollection = collection(db, "bills");

// 🔹 Function to Create a Bill
async function createBill(memberId, amount) {
    try {
        await addDoc(billsCollection, {
            memberId: memberId,
            amount: amount,
            status: "Unpaid",
            createdAt: new Date().toISOString()
        });
        alert("Bill created successfully!");
        loadBills();  // Refresh the bill list
    } catch (error) {
        alert("Error creating bill: " + error.message);
    }
}

// 🔹 Function to Load Bills from Firestore
async function loadBills() {
    const billList = document.getElementById("billList");
    billList.innerHTML = ""; // Clear the list

    const querySnapshot = await getDocs(billsCollection);
    querySnapshot.forEach((doc) => {
        const bill = doc.data();
        const listItem = document.createElement("li");
        listItem.textContent = `Member ID: ${bill.memberId} - Amount: $${bill.amount} - Status: ${bill.status}`;
        billList.appendChild(listItem);
    });
}

// Attach Event Listener to "Create Bill" Button
document.getElementById("createBillBtn").addEventListener("click", () => {
    const memberId = document.getElementById("billMemberId").value;
    const amount = document.getElementById("billAmount").value;
    
    if (memberId && amount) {
        createBill(memberId, amount);
    } else {
        alert("Please enter all details!");
    }
});

// Load Bills on Page Load
window.onload = loadBills;
