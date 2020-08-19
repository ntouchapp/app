import React, { useContext } from 'react';
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
import getExpoToken from '../utils/getExpoToken';
import { homeScreenStyles, contactStyles } from '../styles/styles';

const HomeScreen = ({ navigation }) => {
  const { contacts, addUserContacts, dContact, setToken } = useContext(
    ContactContext
  );
  const token = getExpoToken();
  setToken(token);

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

  if (!contacts.length) {
    return (
      <SafeAreaView style={homeScreenStyles.container}>
        <Text style={homeScreenStyles.noContacts}>
          You haven't added any contacts yet!
        </Text>

        <TouchableOpacity
          style={homeScreenStyles.btn}
          onPress={() => navigation.navigate('Add Contact')}
        >
          <Text style={homeScreenStyles.text}>Create new Contact</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={homeScreenStyles.container}>
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

const renderItem = ({ item: { contactInfo, id, date } }) => {
  return (
    <View style={contactStyles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>{contactInfo.name}</Text>
        <Text>{contactInfo.phoneNumber}</Text>
      </View>
      <View />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 14 }}>
          Scheduled for:
          <Text>
            {' '}
            {moment(date).format('L')} at {moment(date).format('LT')}
          </Text>
        </Text>
        <TouchableOpacity onPress={() => dContact(id)}>
          <Text> Delete </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
