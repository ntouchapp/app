import React, { useState, useContext } from 'react';
import { View, Text, Keyboard } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { ContactContext } from '../context/ContactContext';

const CreateNoteScreen = () => {
  const [text, setText] = useState('');
  const { saveNote } = useContext(ContactContext);
  const { id } = useRoute().params;

  function handlePress() {
    saveNote(id, text);
  }

  return (
    <View style={{ backgroundColor: '#0a4684', flex: 1, padding: 24 }}>
      <Text
        style={{ fontFamily: 'Inter_900Black', fontSize: 24, color: 'white' }}
      >
        Add anything you would like to to remember from the conversation below
      </Text>
      <TextInput
        multiline={true}
        numberOfLines={10}
        placeholder="Our conversation was about...."
        placeholderTextColor="grey"
        onChangeText={(value) => setText(value)}
        style={{
          borderWidth: 1,
          backgroundColor: 'white',
          marginTop: 25,
          height: 300,
          padding: 20,
          fontSize: 20,
        }}
        onSubmitEditing={() => Keyboard.dismiss()}
        returnKeyType={'done'}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#5ade7d',
          padding: 15,
          color: 'white',
          borderRadius: 3,
          marginTop: 50,
        }}
        onPress={handlePress}
      >
        <Text style={{ textAlign: 'center' }}>Save Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateNoteScreen;
