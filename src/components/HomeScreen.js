import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';
import { ContactContext } from '../context/ContactContext';
import moment from 'moment';
import useGetContacts from '../utils/useGetContacts';

const HomeScreen = ({ navigation }) => {
  const { contacts, deleteContact, addUserContacts } = useContext(
    ContactContext
  );
  const { data, error } = useGetContacts();

  if (!error) {
    addUserContacts(data);
  } else {
    Alert.alert('Contacts', error, [
      {
        text: 'Ok',
      },
    ]);
  }

  const renderItem = ({ item: { contactInfo, id, date } }) => {
    return (
      <View>
        <View>
          <Text>{contactInfo.name}</Text>
          <Text>{contactInfo.phoneNumber}</Text>
        </View>
        <View />
        <Text>
          Reminder set for:
          <Text>
            {' '}
            {moment(date).format('L')} at {moment(date).format('LT')}
          </Text>
        </Text>
        <TouchableOpacity onPress={() => deleteContact(id)}>
          <Text> Delete </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (!contacts.length) {
    return (
      <SafeAreaView>
        <View>
          <Text>Welcome to nTouch!</Text>
        </View>
        <Text>You haven't added any contacts yet.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Add Contact')}>
          <Text>Create new Contact</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fcf7e1' }}>
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={contacts}
        />
      </SafeAreaView>
    );
  }
};

export default HomeScreen;
