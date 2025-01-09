const apiUrl = "http://localhost:5000/api/contacts"; // Update with your backend API URL

// Select DOM elements
const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");
const contactIdInput = document.getElementById("contactId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

// Fetch and display contacts
async function fetchContacts() {
  try {
    const response = await fetch(apiUrl);
    const contacts = await response.json();
    displayContacts(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
}

// Display contacts in the list
function displayContacts(contacts) {
  contactList.innerHTML = "";
  contacts.forEach(contact => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${contact.name} - ${contact.email} - ${contact.phone}
      <button class="edit" onclick="editContact(${contact.id}, '${contact.name}', '${contact.email}', '${contact.phone}')">Edit</button>
      <button onclick="deleteContact(${contact.id})">Delete</button>
    `;
    contactList.appendChild(li);
  });
}

// Add or update a contact
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = contactIdInput.value;
  const contactData = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
  };

  try {
    if (id) {
      // Update contact
      await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });
    } else {
      // Add contact
      await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });
    }
    contactForm.reset();
    fetchContacts();
  } catch (error) {
    console.error("Error saving contact:", error);
  }
});

// Edit contact
function editContact(id, name, email, phone) {
  contactIdInput.value = id;
  nameInput.value = name;
  emailInput.value = email;
  phoneInput.value = phone;
}

// Delete contact
async function deleteContact(id) {
  try {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchContacts();
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
}

// Initialize
fetchContacts();
