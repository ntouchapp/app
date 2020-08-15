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
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
