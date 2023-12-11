const { readFile } = require("fs");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const foundContact = contacts.find((contact) => contact.id === contactId);
  return foundContact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const i = contacts.findIndex((contact) => contact.id === contactId);
  if (i === -1) return null;
  const [result] = contacts.splice(i, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
