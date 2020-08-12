import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ContactContext } from '../context/ContactContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';

function ContactListScreen() {
  const { userContacts } = useContext(ContactContext);

  if (!userContacts) {
    return <View>Looking for your contacts 👀</View>;
  } else
    return (
      <SafeAreaView style={{ backgroundColor: 'yellow', flex: 1 }}>
        <FlatList
          data={userContacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={userContacts}
        />
      </SafeAreaView>
    );
}

function checkField(field, key) {
  return typeof field === 'undefined' ? 'N/A' : field[0][key];
}

const renderItem = ({ item: { phoneNumbers, name, emails } }) => {
  let phoneNumber = checkField(phoneNumbers, 'number');
  let email = checkField(emails, 'email');

  return (
    <View>
      <Text style={{ color: 'black' }}>{name}</Text>
      <Text style={{ color: 'black' }}>{phoneNumber}</Text>
      <Text style={{ color: 'black' }}>{email}</Text>
    </View>
  );
};

export default ContactListScreen;
