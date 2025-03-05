import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from './HomePage';
import Details from './Details';
import Header from './Header';

const NativeStack = createNativeStackNavigator();

export default function NativeStackNavigator() {
  return (
    <NavigationContainer>
      <NativeStack.Navigator>
        <NativeStack.Screen
          name="HomePage"
          component={HomePage}
          options={{
            headerTitle:(props) => <Header {...props}/>,
            title: 'Learn NativeStack',
            headerStyle: {backgroundColor: 'blue'},
            headerTintColor: '#fff',
          }}
        />
        <NativeStack.Screen
          name="Details"
          component={Details}
          options={{
            title: 'My Details',
            headerStyle: {backgroundColor: 'blue'},
            headerTintColor: '#fff',
          }}
        />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}
