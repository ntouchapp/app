import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateButton from './DateButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ContactContext } from '../context/ContactContext';
import moment from 'moment';
import { createContactStyles } from '../styles/styles';
import { FlatList } from 'react-native-gesture-handler';
import { not } from 'react-native-reanimated';

function ScheduleContactScreen({ route }) {
  const { name, phoneNumber, email, id } = route.params;
  const { addContact, retrieveNotes } = useContext(ContactContext);
  const [notes, setNotes] = useState([
    { id: '1', text: 'example' },
    { id: '2', text: 'noice' },
  ]);

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

  useEffect(() => {
    const response = retrieveNotes(id);
    if (response.length > 0) {
      setNotes(response);
    }
  }, []);

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

      {notes.length > 0 && (
        <View style={{ padding: 30 }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 22,
              fontWeight: '600',
              textDecorationLine: 'underline',
            }}
          >
            Notes from the past
          </Text>
          <FlatList
            data={notes}
            style={{ marginTop: 20 }}
            renderItem={({ item }) => <Item item={item} />}
          />
        </View>
      )}
    </View>
  );
}

function Item({ item }) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        marginBottom: 20,
        minHeight: 100,
        padding: 10,
      }}
    >
      <Text style={{ fontSize: 18 }}>{item.text}</Text>
    </View>
  );
}

export default ScheduleContactScreen;
