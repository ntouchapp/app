import * as Contacts from 'expo-contacts';
import { useEffect, useState, useContext } from 'react';
import { ContactContext } from '../context/ContactContext';

export default () => {
  const [error, setError] = useState();
  const { setUserContacts } = useContext(ContactContext);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        try {
          const { data } = await Contacts.getContactsAsync({
            fields: [
              Contacts.Fields.Name,
              Contacts.Fields.PhoneNumbers,
              Contacts.Fields.Emails,
              Contacts.Fields.ID,
            ],
          });
          setUserContacts(data);
        } catch (e) {
          setError(e);
        }
      }
    })();
  }, []);

  return { error };
};
