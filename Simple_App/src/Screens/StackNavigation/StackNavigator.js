import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import LoginPage from './LoginPage';
import details from './details';
import Header from './Header';
import HeaderLoginPage from './HeaderLoginPage';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MyLoft">
        <Stack.Screen
          name="MyLoft"
          component={HomeScreen}
          options={{
            headerTitle:(props) => <Header {...props}/>,
            headerStyle: {backgroundColor: '#ADD8E6'},  
          }}
        />

        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{
          headerTitle:(props)=><HeaderLoginPage {...props}/>,
          headerLeft: () => null,
          headerShown: false
          }}
        />

        <Stack.Screen
          name="details"
          component={details}
          options={{
            headerStyle: {backgroundColor: '#ADD8E6'},
             
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
