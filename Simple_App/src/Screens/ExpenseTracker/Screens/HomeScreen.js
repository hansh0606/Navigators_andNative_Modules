import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { getExpenses } from './database';

const HomeScreen = ({ route, navigation }) => {
  const { username } = route.params;  // Get username passed from login or previous screen
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    getExpenses(username, (data) => {
      setExpenses(data);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expense Tracker</Text>
      
      {expenses.length === 0 ? (
        <Text>No expenses found. Add your first expense!</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.expenseItem}>
              <Text style={styles.expenseText}>{item.title} - ₹{item.amount}</Text>
              <Text style={styles.expenseCategory}>{item.category} | {item.date}</Text>
            </View>
          )}
        />
      )}

      <Button title="Add Expense" onPress={() => navigation.navigate('AddExpenseScreen', { username })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  expenseItem: { backgroundColor: '#fff', padding: 15, marginVertical: 5, borderRadius: 5, elevation: 3 },
  expenseText: { fontSize: 16, fontWeight: 'bold' },
  expenseCategory: { fontSize: 14, color: 'gray' },
});

export default HomeScreen;
