import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {insertExpense, createExpensesTable} from './database';

const AddExpenseScreen = ({route, navigation}) => {
  const {username} = route.params;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    console.log('User in AddExpense....', username);
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

    console.log('Attempting to insert expense:', {
      username,
      title,
      category,
      amount: parseFloat(amount),
      date: formattedDate,
    });
    console.log('handleAddExpense: Calling insertExpense function');
    console.log('handleAddExpense: username is:', username); // Log username here!

    insertExpense(
      username,
      title,
      category,
      parseFloat(amount),
      '', // billImage removed for simplicity
      formattedDate,
      result => {
        console.log(
          'handleAddExpense: insertExpense onSuccess called with result:',
          result,
        );
        console.log(
          'handleAddExpense: insertExpense result.insertId is:',
          result.insertId,
        );

        const newExpense = {
          id: result.insertId,
          username,
          title,
          category,
          amount: parseFloat(amount),
          date: formattedDate,
        };

        Alert.alert('Success', 'Expense added successfully!', [
          {
            text: 'OK',
            onPress: () => {
              setTitle('');
              setCategory('');
              setAmount('');
              setDate(new Date());
              navigation.navigate('Home', {
                username: username,
                newExpense: newExpense,
              }); //pass username back.
              console.log('handleAddExpense: navigation to Home called');
            },
          },
        ]);
        console.log('handleAddExpense: Alert and navigation logic finished');
      },
      error => {
        console.error(
          'handleAddExpense: insertExpense onError called with error:',
          error,
        );
        Alert.alert(
          'Error',
          'Failed to add expense: ' + (error.message || JSON.stringify(error)),
        );
      },
    );
    console.log('handleAddExpense: insertExpense function call finished');
  };

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Add Expenses</Text>
      <TextInput
        style={styles.inputAmmount}
        value={amount}
        onChangeText={setAmount}
        placeholder=" ₹ "
      />

      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Category"
      />

     
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        keyboardType="numeric"
        placeholder="Expense Title"
      />

    
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.input}>
        <Text style={styles.dateText} placeholder='Enter Date'>{date.toISOString().split('T')[0]}

        </Text>
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

<TouchableOpacity onPress={handleAddExpense} style={styles.saveButton}>
  <LinearGradient
    colors={['#1FABDF', '#CA67FA', '#DD74D3', '#FF9176']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.gradientButton}
  >
    <Text style={styles.saveButtonText}>Save</Text>
  </LinearGradient>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20,alignItems:'center',marginTop:30},
  label: {fontSize: 20, fontWeight: 'bold', marginTop: 10,alignSelf:'center', marginBottom: 10,justifyContent:'center',color:'#59788E'},
  input: {
    borderWidth: 0,
    textAlign:'center',
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
    width:'90%',
    height:50,
    backgroundColor:'#fff',
    alignSelf: 'center',
    fontSize:16,
    height:60,
    alignText:'center'
    
  },
  inputAmmount: {
    fontSize:30,
    textAlign:'center',
    fontWeight:'bold',
    borderWidth: 0,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 50,
    width:'70%',
    height:70,
    marginBottom:10,
    backgroundColor:'#fff',
    alignSelf: 'center',
  },
  
  dateText: {fontSize: 16, textAlign: 'center'},
  image: {width: 100, height: 100, marginVertical: 10},
  saveButton: {
   
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignSelf: 'center', // To center horizontally

  },
  gradientButton: {
    width: '100%', // Make the gradient span the full width
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AddExpenseScreen;