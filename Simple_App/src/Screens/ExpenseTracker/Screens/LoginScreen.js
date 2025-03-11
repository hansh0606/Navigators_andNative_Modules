import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { createUserTable, insertUser, checkUserExists } from './database';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const storedUsername = await AsyncStorage.getItem('loggedInUser');
      if (storedUsername) {
        navigation.replace('Home', { username: storedUsername });
      }
    };
    checkLoggedInUser();
    createUserTable();
  }, []);

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }

    checkUserExists(username, async (exists) => {
      if (exists) {
        Alert.alert('Success', `New account created! Welcome, ${username}!`);

        await AsyncStorage.setItem('loggedInUser', username);
        navigation.replace('Home', { username });
      } else {
        insertUser(
          username,
          async () => {
            await AsyncStorage.setItem('loggedInUser', username);
            Alert.alert('Success', 'New account created!');
            navigation.replace('Home', { username });
          },
          error => Alert.alert('Error', 'Username already exists')
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Images/stock-vector-regularly-keep-track-of-your-expenses-to-plan-a-family-budget-household-spendings-management-and-2274231043-removebg-preview.png')} 
      style={styles.image}/>
      <Text style={styles.title}>Login / Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />
      
      {/* Gradient Button */}
      <TouchableOpacity onPress={handleLogin} style={styles.buttonContainer}>
      <LinearGradient
        colors={['#1FABDF', '#CA67FA','#DD74D3','#FF9176']} // Blue → Purple → Orange
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientButton}
      >
          <Text style={styles.buttonText}>Login / Register</Text>
        </LinearGradient>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  image:{
    height:300,
    width:300
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontWeight:'bold',
    fontSize:15
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
