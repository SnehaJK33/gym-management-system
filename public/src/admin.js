// Import Firebase Firestore
import { db } from "./firebase-config.js";
import { 
    collection, addDoc, getDocs, deleteDoc, doc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 Reference to the "members" collection in Firestore
const membersCollection = collection(db, "members");

// 🔹 Function to Add a Member
async function addMember(name, email, membershipType) {
    try {
        await addDoc(membersCollection, {
            name: name,
            email: email,
            membershipType: membershipType,
            joinedAt: new Date().toISOString()
        });
        alert("Member added successfully!");
        loadMembers();  // Refresh the list
    } catch (error) {
        alert("Error adding member: " + error.message);
    }
}

// 🔹 Function to Load Members from Firestore
async function loadMembers() {
    const memberList = document.getElementById("memberList");
    memberList.innerHTML = ""; // Clear the list

    const querySnapshot = await getDocs(membersCollection);
    querySnapshot.forEach((doc) => {
        const member = doc.data();
        const listItem = document.createElement("li");
        listItem.textContent = `${member.name} (${member.membershipType}) - ${member.email}`;
        
        // Delete Button for Each Member
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.onclick = () => deleteMember(doc.id);
        
        listItem.appendChild(deleteBtn);
        memberList.appendChild(listItem);
    });
}

// 🔹 Function to Delete a Member
async function deleteMember(memberId) {
    try {
        await deleteDoc(doc(db, "members", memberId));
        alert("Member deleted successfully!");
        loadMembers();  // Refresh the list
    } catch (error) {
        alert("Error deleting member: " + error.message);
    }
}

// Attach Event Listener to "Add Member" Button
document.getElementById("addMemberBtn").addEventListener("click", () => {
    const name = document.getElementById("memberName").value;
    const email = document.getElementById("memberEmail").value;
    const membershipType = document.getElementById("membershipType").value;
    
    if (name && email) {
        addMember(name, email, membershipType);
    } else {
        alert("Please enter all details!");
    }
});

// Load Members on Page Load
window.onload = loadMembers;
