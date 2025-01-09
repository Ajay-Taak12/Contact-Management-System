const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactsModels");

// Get All Contact
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// Create Contact
const createContacts = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { name, email, mobile } = req.body;

  if (!name || !email || !mobile) {
    res.status(400);
    throw new Error("ALL the fields are mandatory");
  }

  const contacts = await Contact.create({
    name,
    email,
    mobile,
    user_id: req.user.id,
  });

  res.status(201).json(contacts);
});

// Update Contact
const updateContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(400);
    throw new Error(
      "User dont have the permission to update other user contacts"
    );
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updateContact);
});

// Delete Contact
const deleteContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(400);
    throw new Error(
      "User dont have the permission to delete  other user contacts"
    );
  }
  const deleteContact = await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(deleteContact);
});

// Get Specific Contact
const getContactsById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContacts,
  updateContacts,
  deleteContacts,
  getContactsById,
};
