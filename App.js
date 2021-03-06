import 'react-native-gesture-handler';
import React from 'react';
import HomeScreen from './src/components/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateContactScreen from './src/components/CreateContactScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContactProvider from './src/context/ContactContext';
import ContactListScreen from './src/components/ContactListScreen';

const Tab = createBottomTabNavigator();

// TODO: Add a splash screen
export default function App() {
  return (
    <NavigationContainer>
      <ContactProvider>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = 'ios-home';
              } else if (route.name === 'Add Contact') {
                iconName = 'ios-add-circle-outline';
              }
              return <Ionicons name={iconName} size={size} color={'#716992'} />;
            },
          })}
          tabBarOptions={{}}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Add Contact" component={CreateContactScreen} />
          <Tab.Screen name="Contacts" component={ContactListScreen} />
        </Tab.Navigator>
      </ContactProvider>
    </NavigationContainer>
  );
}
