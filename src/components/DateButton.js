import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Keyboard, Text } from 'react-native';
import { createContactStyles } from '../styles/styles';

const DateButton = ({ dateFn, text }) => (
  <TouchableOpacity
    onPress={() => {
      Keyboard.dismiss();
      dateFn();
    }}
    style={createContactStyles.dateBtn}
  >
    <Text style={createContactStyles.dateTxt}>{text}</Text>
  </TouchableOpacity>
);

export default DateButton;
