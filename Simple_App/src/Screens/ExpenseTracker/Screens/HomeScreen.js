import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchExpenses } from './database';

const HomeScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch expenses when the screen is focused (ensures data is updated after adding a new expense)
  useFocusEffect(
    useCallback(() => {
      fetchExpenses(
        username,
        data => {
          setExpenses(data);
          const total = data.reduce((sum, expense) => sum + expense.amount, 0);
          setTotalAmount(total);
        },
        error => console.log(error)
      );
    }, [username])
  );

  return (
    <View style={styles.container}>
      {/* Total Amount Card */}
      <View style={styles.card}>
        <Text style={styles.totalText}>Total Spent: ₹{totalAmount.toFixed(2)}</Text>
      </View>

      {/* Add Expense Button */}
      <Button
        title="Add Expense"
        onPress={() => navigation.navigate('AddExpenseScreen', { username })}
      />

      {/* Expenses List */}
      <FlatList
        data={expenses}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseTitle}>{item.title}</Text>
            <Text style={styles.expenseDate}>{item.date}</Text>
            <Text style={styles.expenseAmount}>₹{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: {
    padding: 15,
    backgroundColor: '#3498db',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  totalText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 5,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  expenseTitle: { fontSize: 16, fontWeight: 'bold' },
  expenseDate: { fontSize: 14, color: 'gray' },
  expenseAmount: { fontSize: 16, fontWeight: 'bold', color: '#e74c3c' }
});

export default HomeScreen;
