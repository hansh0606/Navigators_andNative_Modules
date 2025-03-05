import { View, Text, StyleSheet, Button, TextInput,Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';  // ✅ Import useNavigation

export default function HomePage() {

  const navigation = useNavigation(); // ✅ Using useNavigation hook
  
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [mail, setMail] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !university.trim() || !mail.trim()) {
      Alert.alert('Error', 'All fields are required!'); // Show alert if fields are empty
      return;
    }
    navigation.navigate('Details', { name, university, mail });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter Your Details:</Text>
      <TextInput 
        placeholder="Enter Your Name" 
        style={styles.input} 
        value={name} 
        onChangeText={setName} 
      />
      <TextInput 
        placeholder="Enter Your University" 
        style={styles.input} 
        value={university} 
        onChangeText={setUniversity} 
      />
      <TextInput 
        placeholder="Enter Your Email" 
        style={styles.input} 
        value={mail} 
        onChangeText={setMail} 
        keyboardType="email-address"
      />

      <Button 
        title="Submit DETAILS" 
        onPress={handleSubmit} // ✅ Using navigation
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: '80%',
    padding: 10,
    marginBottom: 10
  },

  text: {
    fontSize: 16,
    width: '80%',
    padding: 10,
    marginBottom: 10
  }
});
