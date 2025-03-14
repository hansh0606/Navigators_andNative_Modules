import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import AddExpenseScreen from './AddExpenseScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{ headerShown: false }} // Hide header globally
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen 
          name="AddExpenseScreen" 
          component={AddExpenseScreen} 
          options={{ headerShown: false }} // Show header only for AddExpenseScreen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;

