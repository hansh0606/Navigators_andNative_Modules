import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ChatPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> 💬 chat</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#BC13FE',
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