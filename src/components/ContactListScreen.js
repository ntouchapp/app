import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ContactContext } from '../context/ContactContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

function ContactListScreen({ navigation }) {
  const { userContacts } = useContext(ContactContext);

  if (!userContacts) {
    return <View>Looking for your contacts 👀</View>;
  } else
    return (
      <SafeAreaView style={{ backgroundColor: 'yellow', flex: 1 }}>
        <FlatList
          data={userContacts}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
          extraData={userContacts}
          navigation={navigation}
        />
      </SafeAreaView>
    );
}

function checkField(field, key) {
  return typeof field === 'undefined' ? 'N/A' : field[0][key];
}

function Item({ item: { phoneNumbers, name, emails } }) {
  let phoneNumber = checkField(phoneNumbers, 'number');
  let email = checkField(emails, 'email');
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Schedule Contact', {
          name: name,
          phoneNumber: phoneNumber,
          email: email,
        })
      }
    >
      <Text style={{ color: 'black' }}>{name}</Text>
      <Text style={{ color: 'black' }}>{phoneNumber}</Text>
      <Text style={{ color: 'black' }}>{email}</Text>
    </TouchableOpacity>
  );
}

export default ContactListScreen;
