import {useFocusEffect} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, Button, StyleSheet} from 'react-native';
import {getExpenses} from './database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({route, navigation}) => {
  const {username} = route.params;
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = () => {
    getExpenses(username, data => {
      setExpenses(data);
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, []),
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loggedInUser'); // Clear stored user data
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}], // Ensure "Login" is correctly named in your navigation stack
      });
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expense Tracker</Text>
      <View style={styles.balanceCard}>
        <Text>₹ 0000</Text>
      </View>
      {expenses.length === 0 ? (
        <Text>No expenses found. Add your first expense!</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.expenseItem}>
              <Text style={styles.expenseText}>
                {item.title} - ₹{item.amount}
              </Text>
              <Text style={styles.expenseCategory}>
                {item.category} | {item.date}
              </Text>
            </View>
          )}
        />
      )}

      <Button
        title="Add Expense"
        onPress={() => navigation.navigate('AddExpenseScreen', {username})}
      />
      <View style={styles.logoutButton}>
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#f5f5f5'},
  header: {fontSize: 22, fontWeight: 'bold', marginBottom: 20},
  balanceCard:{

  },
  expenseItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 3,
  },
  expenseText: {fontSize: 16, fontWeight: 'bold'},
  expenseCategory: {fontSize: 14, color: 'gray'},
  logoutButton: {marginTop: 20},
});

export default HomeScreen;
