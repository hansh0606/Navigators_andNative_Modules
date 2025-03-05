import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, Text, StyleSheet,Button} from 'react-native';
import Header from './Header';


export default function HomeScreen({ navigation}) {
  return (
    
    <View style={styles.container}>
      
      <Text style={styles.text}>HomeScreen</Text>
      <Button
        title="Go to LoginPage"
        onPress={() => navigation.navigate("LoginPage", { message: "Welcome to Login Page!" })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:5,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding:5,
    color: '#333',
  },
});
