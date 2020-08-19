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
    const strId = Math.floor(Math.random() * 300).toString();
    if (contact.notes) {
      contact.notes.push({ id: strId, text });
    } else {
      contact.notes = [
        {
          id: strId,
          text,
        },
      ];
    }
  }

  function retrieveNotes(id) {
    const contact = contacts.find((contact) => contact.id === id);

    if (contacts.notes) {
      return contacts.notes;
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
