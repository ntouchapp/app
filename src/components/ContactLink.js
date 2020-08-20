import React from 'react';
import { Text, Linking } from 'react-native';

const ContactLink = ({ scheme, link }) => {
  return (
    <Text onPress={async () => Linking.openURL(`${scheme}:${link}`)}>
      {link}
    </Text>
  );
};

export default ContactLink;
