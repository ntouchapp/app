import React, { useState, useContext, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import { createContactStyles } from '../styles/styles';

import moment from 'moment';
import { ContactContext } from '../context/ContactContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm } from 'react-hook-form';

import sendPushNotification from '../utils/sendPushNotification';
import DateButton from './DateButton';
import FormField from './FormField';

export const CreateContactScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const { addContact, token } = useContext(ContactContext);

  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    register('name');
    register('phoneNumber');
    register('email');
  }, [register]);

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

  function showAlert() {
    try {
      Alert.alert(
        'Success!',
        'You have successfully added a contact',
        [
          {
            text: 'Cancel',
          },
          {
            text: 'Ok',
            onPress: () => navigation.navigate('Home'),
          },
        ],
        { cancelable: 'false' }
      );
    } catch (e) {
      console.log(e);
    }
  }
  function successOption(data) {
    addContact(data, moment(date));
    Keyboard.dismiss();
    sendPushNotification(token, data, date);
    reset({
      name: '',
      phoneNumber: '',
      email: '',
    });
    showAlert();
  }

  const onSubmit = (data) => {
    try {
      successOption(data);
    } catch (e) {
      console.log(e);
    }
    setShow(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={createContactStyles.container}>
        <View style={createContactStyles.fieldContainer}>
          <FormField
            name="name"
            text="Name: "
            fn={setValue}
            placeholder="Sam Brown"
          />
          <FormField
            name="phoneNumber"
            text="Number: "
            fn={setValue}
            placeholder="777-888-222"
          />
          <FormField
            placeholder="example@gmail.com"
            text="Email: "
            name="email"
            fn={setValue}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <View style={createContactStyles.dateContainer}>
            <DateButton text="Choose Time" dateFn={showTimePicker} />
            <DateButton text="Choose Date" dateFn={showDatePicker} />
          </View>

          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text style={createContactStyles.ctaBtn}>Add to contacts</Text>
          </TouchableOpacity>
        </View>
      </View>

      {show && (
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CreateContactScreen;
