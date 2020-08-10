import React, { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Notifications from 'expo-notifications';
import {
  SafeAreaView,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import { ContactContext } from '../context/ContactContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import sendPushNotification from '../utils/sendPushNotification';
import getToken from '../utils/getExpoToken';
import FormField from './FormField';
import DateButton from './DateButton';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const CreateContactScreen = ({ navigation }) => {
  const { addContact } = useContext(ContactContext);
  const { handleSubmit, reset, getValues } = useForm();
  const expoToken = getToken();

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const showTimePicker = () => {
    showMode('time');
  };

  function onSubmit(data) {
    addContact(data, moment(date));
    Keyboard.dismiss();
    sendPushNotification(expoToken, data, date);

    reset({
      name: '',
      phoneNumber: '',
      email: '',
    });

    navigation.navigate('Home');
  }

  return (
    <SafeAreaView>
      <Text>Create new contact</Text>
      <View>
        <View>
          <FormField text="Name:" name="name" placeholder="Name..." />

          <FormField
            text="Phone number:"
            name="phoneNumber"
            placeholder="Phone number..."
          />

          <FormField text="Email:" name="email" placeholder="Email..." />
        </View>

        <View>
          <DateButton text="Choose Time:" dateFn={showTimePicker} />
          <DateButton text="Choose Date:" dateFn={showDatePicker} />
        </View>

        <TouchableOpacity
          onPress={() => {
            handleSubmit(onSubmit(getValues()));
          }}
        >
          <Text>Add to contacts</Text>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};

export default CreateContactScreen;
