import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { createContactStyles } from '../styles/styles';

const FormField = ({ name, fn, text, placeholder }) => (
  <View style={createContactStyles.formField}>
    <Text style={createContactStyles.text}>{text} </Text>
    <TextInput
      style={createContactStyles.textInput}
      placeholder={placeholder}
      placeholderTextColor="white"
      onChangeText={(text) => fn(name, text)}
    />
  </View>
);

export default FormField;
