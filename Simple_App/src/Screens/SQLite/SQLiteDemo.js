import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'Mydatabase.db',
    location: 'default',
  },
  () => console.log('Database Connected'),
  error => console.log('Database Error', Error),
);
export default function SQLiteDemo() {
  return (
    <View>
      <Text>SQLiteDemo</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
