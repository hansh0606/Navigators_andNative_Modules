import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AsyncStorageApp() {

  const setData = async () => {
    try {
      await AsyncStorage.setItem("name", "Hanshvee");
      Alert.alert("Success", "Data saved successfully!");
    } catch (error) {
      console.log("Error storing data:", error);
    }
  };

  const getData = async () => {
    try {
      const name = await AsyncStorage.getItem("name");
      if (name !== null) {
        Alert.alert("Stored Name", name);
      } else {
        Alert.alert("No Data", "No name found in storage.");
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("name");
      Alert.alert("Success", "Data removed successfully!");
    } catch (error) {
      console.log("Error removing data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>AsyncStorage</Text>

      <TouchableOpacity style={styles.button} onPress={setData}>
        <Text style={styles.textButton}>Set Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={getData}>
        <Text style={styles.textButton}>Get Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={removeData}>
        <Text style={styles.textButton}>Remove Data</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    margin: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    width: 200,
  },
});
