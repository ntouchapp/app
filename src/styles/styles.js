import { StyleSheet } from 'react-native';

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#399ffa',
  },
  noContacts: {
    marginTop: 240,
    fontSize: 20,
    marginBottom: 35,
    color: 'white',
    fontWeight: '600',
  },
  btn: {
    padding: 14,
    borderRadius: 3,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    borderWidth: 3,
    borderColor: 'white',
    padding: 15,
  },
});
