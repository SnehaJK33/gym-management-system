// Import Firebase Firestore
import { db } from "./firebase-config.js";
import { 
    collection, addDoc, getDocs, query, where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 Reference to the "notifications" collection in Firestore
const notificationsCollection = collection(db, "notifications");

// 🔹 Function to Send a Notification
async function sendNotification(memberId, message) {
    try {
        await addDoc(notificationsCollection, {
            memberId: memberId,
            message: message,
            createdAt: new Date().toISOString()
        });
        alert("Notification sent successfully!");
        loadNotifications();  // Refresh the notification list
    } catch (error) {
        alert("Error sending notification: " + error.message);
    }
}

// 🔹 Function to Load Notifications from Firestore
async function loadNotifications() {
    const notificationList = document.getElementById("notificationList");
    notificationList.innerHTML = ""; // Clear the list

    const querySnapshot = await getDocs(notificationsCollection);
    querySnapshot.forEach((doc) => {
        const notification = doc.data();
        const listItem = document.createElement("li");
        listItem.textContent = `Member ID: ${notification.memberId} - Message: ${notification.message}`;
        notificationList.appendChild(listItem);
    });
}

// Attach Event Listener to "Send Notification" Button
document.getElementById("sendNotificationBtn").addEventListener("click", () => {
    const memberId = document.getElementById("notificationMemberId").value;
    const message = document.getElementById("notificationMessage").value;
    
    if (memberId && message) {
        sendNotification(memberId, message);
    } else {
        alert("Please enter all details!");
    }
});

// Load Notifications on Page Load
window.onload = loadNotifications;
