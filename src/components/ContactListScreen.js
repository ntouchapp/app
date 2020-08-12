import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ContactContext } from '../context/ContactContext';

function ContactListScreen() {
  const { userContacts } = useContext(ContactContext);
  console.log(userContacts);
  return (
    <View>
      <Text></Text>
    </View>
  );
}

export default ContactListScreen;
