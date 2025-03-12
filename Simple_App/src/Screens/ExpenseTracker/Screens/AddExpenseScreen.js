import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { insertExpense, createExpensesTable } from './database';

const AddExpenseScreen = ({ route, navigation }) => {
    const { username } = route.params;

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        console.log("User in AddExpense....", username);
        createExpensesTable();
    }, [username]); //Added username as a dependency.

    const handleAddExpense = () => {
        if (!title || !category || !amount) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        if (isNaN(amount) || parseFloat(amount) <= 0) {
            Alert.alert('Error', 'Please enter a valid numeric amount');
            return;
        }

        const formattedDate = date.toISOString().split('T')[0];

        console.log('Attempting to insert expense:', { username, title, category, amount: parseFloat(amount), date: formattedDate });
        console.log("handleAddExpense: Calling insertExpense function");
        console.log("handleAddExpense: username is:", username); // Log username here!

        insertExpense(
            username,
            title,
            category,
            parseFloat(amount),
            '', // billImage removed for simplicity
            formattedDate,
            (result) => {
                console.log('handleAddExpense: insertExpense onSuccess called with result:', result);
                console.log("handleAddExpense: insertExpense result.insertId is:", result.insertId);

                const newExpense = {
                    id: result.insertId,
                    username,
                    title,
                    category,
                    amount: parseFloat(amount),
                    date: formattedDate
                };

                Alert.alert('Success', 'Expense added successfully!', [{ text: "OK", onPress: () => {
                    setTitle(''); setCategory(''); setAmount(''); setDate(new Date());
                    navigation.navigate('Home', { username: username, newExpense: newExpense });//pass username back.
                    console.log("handleAddExpense: navigation to Home called");
                }}]);
                console.log("handleAddExpense: Alert and navigation logic finished");
            },
            (error) => {
                console.error('handleAddExpense: insertExpense onError called with error:', error);
                Alert.alert('Error', 'Failed to add expense: ' + (error.message || JSON.stringify(error)));
            }
        );
        console.log("handleAddExpense: insertExpense function call finished");
    };

    const onChangeDate = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput 
        style={styles.input} 
        value={title} 
        onChangeText={setTitle} 
        placeholder="Expense Title" 
      />
      
      <Text style={styles.label}>Category:</Text>
      <TextInput 
        style={styles.input} 
        value={category} 
        onChangeText={setCategory} 
        placeholder="Category" 
      />

      <Text style={styles.label}>Amount (₹):</Text>
      <TextInput 
        style={styles.input} 
        value={amount} 
        onChangeText={setAmount} 
        keyboardType="numeric" 
        placeholder="Amount" 
      />

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

      <Button 
        title="Save" 
        onPress={handleAddExpense} 
      />
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