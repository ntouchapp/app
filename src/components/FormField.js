import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

const FormField = ({ text, name, placeholder }) => {
  const { control } = useForm();
  return (
    <View>
      <Text>{text} </Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            placeholder={placeholder}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name={name}
        rules={{ required: true }}
        defaultValue=""
      />
    </View>
  );
};

export default FormField;
