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
import DateButton from './DateButton';
import { TextInput } from 'react-native-gesture-handler';

export const CreateContactScreen = ({ navigation }) => {
  const { addContact } = useContext(ContactContext);
  const { handleSubmit, reset, getValues, control } = useForm();
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
          <View>
            <Text>Name: </Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  placeholder="name"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="name"
              rules={{ required: true }}
            />
          </View>

          <View>
            <Text>Phone number: </Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  placeholder="Phone number..."
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="phoneNumber"
              rules={{ required: true }}
            />
          </View>

          <View>
            <Text>Email: </Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  placeholder="Email..."
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="email"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
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
