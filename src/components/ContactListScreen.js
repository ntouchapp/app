import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ContactContext } from '../context/ContactContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';
import { contactStyles } from '../styles/styles';

function ContactListScreen() {
  const { userContacts } = useContext(ContactContext);

  if (!userContacts) {
    return <View>Looking for your contacts 👀</View>;
  } else
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0a4684', margin: 0 }}>
        <FlatList
          data={userContacts}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
          extraData={userContacts}
        />
      </SafeAreaView>
    );
}

function checkField(field, key) {
  return typeof field === 'undefined' ? 'No email provided' : field[0][key];
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
      style={contactStyles.container}
    >
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <View style={contactStyles.top}>
          <Text style={{ fontSize: 16 }}>{name}</Text>
          <Text style={{ color: 'black' }}>{phoneNumber}</Text>
        </View>
        <View style={contactStyles.bot}>
          <Text style={contactStyles.botText}>{email}</Text>
          <Text>{'>'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ContactListScreen;
