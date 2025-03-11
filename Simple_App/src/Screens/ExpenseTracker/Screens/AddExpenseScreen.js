import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, NativeModules, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { insertExpense, createExpensesTable } from './database';

const { CameraModule } = NativeModules;

const AddExpenseScreen = ({ route, navigation }) => {
  const { username } = route.params;
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [billImage, setBillImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    createExpensesTable(); // Ensure table exists
  }, []);

  const handleCaptureImage = async () => {
    try {
      if (!CameraModule || !CameraModule.captureImage) {
        Alert.alert('Camera Not Available', 'Please grant permissions or check your setup.');
        return;
      }
  
      const uri = await CameraModule.captureImage();
      setBillImage(uri);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to capture image.');
    }
  };

  const handleAddExpense = () => {
    if (!title || !category || !amount) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
  
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid numeric amount');
      return;
    }
  
    insertExpense(
      username,
      title,
      category,
      parseFloat(amount),
      billImage || '',
      date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      () => {
        Alert.alert('Success', 'Expense added!', [
          { text: "OK", onPress: () => navigation.navigate('Home', { newExpense: { title, category, amount, billImage, date } }) }
        ]);
      },
      (error) => {
        Alert.alert('Error', error.message);
      }
    );
  };
  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false); // Hide picker after selection
    if (selectedDate) {
      setDate(selectedDate);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Expense Title" />
      
      <Text style={styles.label}>Category:</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Category" />

      <Text style={styles.label}>Amount (₹):</Text>
      <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="Amount" />

      <Text style={styles.label}>Select Date:</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>{date.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {/* <Button title="Capture Bill Image" onPress={handleCaptureImage} />
      {billImage && <Image source={{ uri: billImage }} style={styles.image} />} */}

      <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, borderRadius: 5 },
  dateButton: { padding: 10, backgroundColor: '#ddd', marginVertical: 10, borderRadius: 5 },
  dateText: { fontSize: 16, textAlign: 'center' },
  image: { width: 100, height: 100, marginVertical: 10 },
});

export default AddExpenseScreen;
