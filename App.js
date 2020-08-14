import 'react-native-gesture-handler';
import React from 'react';
import HomeScreen from './src/components/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import CreateContactScreen from './src/components/CreateContactScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContactProvider from './src/context/ContactContext';
import ContactListScreen from './src/components/ContactListScreen';
import ScheduleContactScreen from './src/components/ScheduleContactScreen';

const Tab = createBottomTabNavigator();
const ContactStack = createStackNavigator();

function ContactStackContainer() {
  return (
    <ContactStack.Navigator>
      <ContactStack.Screen
        name="Contacts"
        component={ContactListScreen}
        options={{ tabBarLabel: 'Contacts' }}
      />
      <ContactStack.Screen
        name="Schedule Contact"
        component={ScheduleContactScreen}
      />
    </ContactStack.Navigator>
  );
}

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
          initialRouteName="Home"
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Add Contact" component={CreateContactScreen} />
          <Tab.Screen name="Contacts" component={ContactStackContainer} />
        </Tab.Navigator>
      </ContactProvider>
    </NavigationContainer>
  );
}
