const { readFile } = require("node:fs");
const fs = require("node:fs/promises");
const path = require("node:path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
const { nanoid } = require("nanoid");

async function read() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return await JSON.parse(data);
}

// TODO: задокументувати кожну функцію
async function listContacts() {
  //Повертає масив контактів.
  const contacts = await read();
  return contacts;
}

async function getContactById(contactId) {
  //Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  contactId = String(contactId);
  const contacts = await read();
  const getContact = await contacts.find((contact) => contact.id === contactId);
  return getContact || null;
}

async function removeContact(contactId) {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  contactId = String(contactId);
  const contacts = await read();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const removeContact = contacts[index];
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removeContact;
}

async function addContact(name, email, phone) {
  // Повертає об'єкт доданого контакту.
  const contacts = await read();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
