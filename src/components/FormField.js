import React from 'react';
import { Text, View, TextInput } from 'react-native';

const FormField = ({ name, fn, text }) => (
  <View>
    <Text>{text} </Text>
    <TextInput placeholder="name" onChangeText={(text) => fn(name, text)} />
  </View>
);

export default FormField;
