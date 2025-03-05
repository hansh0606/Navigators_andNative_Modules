import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ProfilePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> 👤 ProfilePage</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#1F51FF',
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
  },

  text:{
    fontSize:24,
    justifyContent:'center',
    alignContent:'center',
    backgroundColor:'white',
    padding:10,
    borderRadius:10,
    fontWeight:'bold'
  }
})