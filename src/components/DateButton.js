import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Keyboard, Text } from 'react-native';

const DateButton = ({ dateFn, text }) => (
  <TouchableOpacity
    onPress={() => {
      Keyboard.dismiss();
      dateFn();
    }}
  >
    <Text>{text}</Text>
  </TouchableOpacity>
);

export default DateButton;
