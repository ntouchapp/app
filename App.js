import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
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
const HomeScreenStack = createStackNavigator();
const CreateContact = createStackNavigator();

function HomeStackContainer() {
  return (
    <HomeScreenStack.Navigator>
      <HomeScreenStack.Screen
        name="Home"
        options={{ tabBarLabel: 'Home' }}
        component={HomeScreen}
      />
    </HomeScreenStack.Navigator>
  );
}

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
        options={({ route }) => ({ title: `Contact ${route.params.name}` })}
      />
    </ContactStack.Navigator>
  );
}

function CreateContactContainer() {
  return (
    <CreateContact.Navigator>
      <CreateContact.Screen
        name="Create Contact"
        component={CreateContactScreen}
      />
    </CreateContact.Navigator>
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
              } else {
                iconName = 'ios-people';
              }
              return <Ionicons name={iconName} size={size} color={'#716992'} />;
            },
          })}
          initialRouteName="Home"
        >
          <Tab.Screen
            name="Home"
            component={HomeStackContainer}
            options={{ title: 'Home' }}
          />
          <Tab.Screen
            name="Add Contact"
            component={CreateContactContainer}
            options={{ title: 'Add New Contact' }}
          />
          <Tab.Screen name="Contacts" component={ContactStackContainer} />
        </Tab.Navigator>
      </ContactProvider>
    </NavigationContainer>
  );
}
