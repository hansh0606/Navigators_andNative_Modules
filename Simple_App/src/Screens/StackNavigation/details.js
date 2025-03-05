import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function details({route}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>details</Text>
      <Text>{route.params?.message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});