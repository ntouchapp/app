import React, { useContext } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Button,
  Image,
} from 'react-native';
import { ContactContext } from '../context/ContactContext';
import moment from 'moment';
const HomeScreen = ({ navigation }) => {
  const { contacts, deleteContact } = useContext(ContactContext);

  const renderItem = ({ item: { contactInfo, id, date } }) => {
    return (
      <View>
        <View>
          <Text>{contactInfo.name}</Text>
          <Text>{contactInfo.phoneNumber}</Text>
          <Text>{contactInfo.email}</Text>
        </View>
        <View />
        <Text>
          Reminder set for:
          <Text
            style={{
              fontSize: 18,
              color: '#799ead',
              fontWeight: '300',
            }}
          >
            {' '}
            {moment(date).format('L')} at {moment(date).format('LT')}
          </Text>
        </Text>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 1,
            right: 10,
            margin: 5,
            backgroundColor: '#716992',
            borderRadius: '5',
            height: 22,
            alignSelf: 'flex-end',
            textAlign: 'center',
          }}
          onPress={() => deleteContact(id)}
        >
          <Text
            style={{
              color: '#fcf7e1',
              paddingTop: '1%',
              paddingBottom: '1%',
            }}
          >
            {' '}
            Delete{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (!contacts.length) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: '#fcf7e1',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 30,
              color: '#716992',
              textAlign: 'center',
              fontWeight: '700',
            }}
          >
            Welcome to nTouch!
          </Text>
          <Image
            style={{ width: 300, height: 300 }}
            source={{
              uri:
                'https://i.pinimg.com/originals/ab/53/c3/ab53c3258caa5c3c691b4de46cb5ad88.gif',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 25,
            alignItems: 'center',
            textAlign: 'center',
            color: '#799ead',
          }}
        >
          You haven't added any contacts yet.
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#abc7b9',
            width: '80%',
            maxWidth: 500,
            height: 100,
            borderRadius: 10,
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}
          onPress={() => navigation.navigate('Add Contact')}
        >
          <Text
            style={{
              textAlign: 'center',
              color: '#716992',
              fontSize: 30,
            }}
          >
            Create new Contact
          </Text>
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
