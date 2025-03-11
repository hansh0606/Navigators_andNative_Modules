import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserPreferences() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    loadTheme(); // Load saved theme when the app starts
  }, []);

  const saveTheme = async (selectedTheme) => {
    try {
      await AsyncStorage.setItem('theme', selectedTheme);
      setTheme(selectedTheme);
      Alert.alert('Success', `Theme set to ${selectedTheme}`);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    }
  };

  return (
    <View style={[styles.container, theme === 'dark' ? styles.darkMode : styles.lightMode]}>
      <Text style={styles.text}>Current Theme: {theme}</Text>

      <TouchableOpacity style={styles.button} onPress={() => saveTheme('light')}>
        <Text style={styles.textButton}>Light Mode</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => saveTheme('dark')}>
        <Text style={styles.textButton}>Dark Mode</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'blue',
    width: 150,
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  lightMode: {
    backgroundColor: '#fff',
  },
  darkMode: {
    backgroundColor: '#333',
  },
});
