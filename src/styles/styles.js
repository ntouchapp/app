import { StyleSheet } from 'react-native';

const shadowStyles = {
  shadowColor: '#000000',
  shadowOpacity: 0.4,
  shadowRadius: 1,
  shadowOffset: {
    height: 1,
    width: 1,
  },
};

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0a4684',
    paddingTop: 50,
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
    ...shadowStyles,
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

export const createContactStyles = StyleSheet.create({
  container: {
    backgroundColor: '#0a4684',
    flex: 1,
  },
  fieldContainer: {
    alignSelf: 'stretch',
  },
  dateContainer: {
    flexDirection: 'column',
  },
  formField: {
    margin: 30,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  textInput: {
    flex: 2.5,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    paddingLeft: 10,
    color: 'white',
    fontSize: 16,
  },
  text: {
    color: 'white',
    flex: 1,
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
  },
  dateBtn: {
    backgroundColor: '#5ade7d',
    padding: 15,
    color: 'white',
    borderRadius: 3,
    marginBottom: 20,
    ...shadowStyles,
  },
  dateTxt: {
    fontWeight: '600',
  },

  ctaBtn: {
    borderRadius: 3,
    backgroundColor: '#ec5a12',
    padding: 15,
    marginTop: 2,
    color: 'white',
    fontWeight: '600',
  },
});

export const contactStyles = StyleSheet.create({
  container: {
    margin: 5,
    marginTop: 20,
    height: 90,
    borderRadius: 2,
    padding: 8,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
  },
  top: { flexDirection: 'row', justifyContent: 'space-between' },
  bot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
