// Import Firebase Firestore
import { db } from "./firebase-config.js";
import { 
    collection, getDocs, query, where 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 Function to Load Member Details
async function loadMemberDetails(memberId) {
    const memberDetails = document.getElementById("memberDetails");
    memberDetails.innerHTML = "Loading...";

    const membersCollection = collection(db, "members");
    const q = query(membersCollection, where("memberId", "==", memberId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const member = querySnapshot.docs[0].data();
        memberDetails.innerHTML = `
            <p>Name: ${member.name}</p>
            <p>Email: ${member.email}</p>
            <p>Membership Type: ${member.membershipType}</p>
            <p>Joined At: ${new Date(member.joinedAt).toLocaleDateString()}</p>
        `;
    } else {
        memberDetails.innerHTML = "Member not found.";
    }
}

// 🔹 Function to Load Bills for a Member
async function loadMemberBills(memberId) {
    const billList = document.getElementById("billList");
    billList.innerHTML = "Loading...";

    const billsCollection = collection(db, "bills");
    const q = query(billsCollection, where("memberId", "==", memberId));
    const querySnapshot = await getDocs(q);

    billList.innerHTML = "";
    querySnapshot.forEach((doc) => {
        const bill = doc.data();
        const listItem = document.createElement("li");
        listItem.textContent = `Amount: $${bill.amount} - Status: ${bill.status}`;
        billList.appendChild(listItem);
    });
}

// 🔹 Function to Load Notifications for a Member
async function loadMemberNotifications(memberId) {
    const notificationList = document.getElementById("notificationList");
    notificationList.innerHTML = "Loading...";

    const notificationsCollection = collection(db, "notifications");
    const q = query(notificationsCollection, where("memberId", "==", memberId));
    const querySnapshot = await getDocs(q);

    notificationList.innerHTML = "";
    querySnapshot.forEach((doc) => {
        const notification = doc.data();
        const listItem = document.createElement("li");
        listItem.textContent = `Message: ${notification.message}`;
        notificationList.appendChild(listItem);
    });
}

// Load data when a member logs in
document.getElementById("loadMemberDataBtn").addEventListener("click", () => {
    const memberId = document.getElementById("memberIdInput").value;
    if (memberId) {
        loadMemberDetails(memberId);
        loadMemberBills(memberId);
        loadMemberNotifications(memberId);
    } else {
        alert("Please enter your Member ID!");
    }
});


