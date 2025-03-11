import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

    checkUserExists(username, exists => {
      if (exists) {
        Alert.alert('Welcome Back', 'Logging you in...');
        AsyncStorage.setItem('loggedInUser', username);
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
      <Text style={styles.title}>Login / Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Login / Register" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
