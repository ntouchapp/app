import * as Contacts from 'expo-contacts';
import { useEffect, useState, useContext } from 'react';
import { ContactContext } from '../context/ContactContext';
import { Alert } from 'react-native';

export default () => {
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Name,
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.Emails,
            Contacts.Fields.ID,
          ],
        });

        setData(data);
        console.log('Use get contact ran!!!');
      } else if (status === 'denied') {
        setError('You have not allowed access to your contacts');
      }
    })();
  }, []);

  return { data, error };
};
