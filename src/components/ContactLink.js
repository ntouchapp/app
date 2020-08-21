import React from 'react';
import { Text, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ContactLink = ({ scheme, link }) => {
  const isNotEmail = link.includes('No email');

  async function handlePress() {
    try {
      await Linking.openURL(`${scheme}:${link}`);
    } catch (e) {
      console.log(e);
    }
  }

  if (isNotEmail) {
    return <Text>{link}</Text>;
  } else
    return (
      <TouchableOpacity
        style={{ backgroundColor: 'red', padding: 5 }}
        onPress={handlePress}
      >
        <Text>{link}</Text>
      </TouchableOpacity>
    );
};

export default ContactLink;
