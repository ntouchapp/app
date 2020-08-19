import React, { createContext, useState, useRef } from 'react';

export const ContactContext = createContext();

const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [userContacts, setUserContacts] = useState([]);
  const [token, setToken] = useState();

  function addContact(contactInfo, date) {
    setContacts([
      ...contacts,
      { contactInfo, id: String(Math.random()), date },
    ]);
  }

  function addUserContacts(contacts) {
    setUserContacts(contacts);
  }

  function dContact(id) {
    setContacts(contacts.filter((contact) => contact.id !== id));
  }

  function saveNote(id, text) {
    const contact = contacts.find((contact) => contact.id === id);
    if (contact.notes) {
      contact.notes.push(text);
    } else {
      contact.notes = [];
      contact.notes.push(text);
    }
    console.log(contact);
  }

  function retrieveNotes(id) {
    const contact = contacts.find((contact) => contact.id === id);

    if (contact.notes) {
      return contact.notes;
    } else {
      return [];
    }
  }

  return (
    <ContactContext.Provider
      value={{
        addContact,
        contacts,
        dContact,
        addUserContacts,
        userContacts,
        token,
        setToken,
        saveNote,
        retrieveNotes,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
