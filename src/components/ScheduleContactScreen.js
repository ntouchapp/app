import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateButton from './DateButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ContactContext } from '../context/ContactContext';
import moment from 'moment';
import { createContactStyles } from '../styles/styles';

function ScheduleContactScreen({ route }) {
  const { name, phoneNumber, email } = route.params;
  const { addContact } = useContext(ContactContext);

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

  function handleSubmit() {
    const contact = { name, phoneNumber, email };
    addContact(contact, moment(date));
  }

  return (
    <View style={{ backgroundColor: '#0a4684', flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 40,
        }}
      >
        <DateButton text="Choose Time" dateFn={showTimePicker} />
        <DateButton text="Choose Date" dateFn={showDatePicker} />
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        style={createContactStyles.ctaBtn}
      >
        <Text style={{ textAlign: 'center' }}>Add to contacts</Text>
      </TouchableOpacity>

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
    </View>
  );
}

export default ScheduleContactScreen;
