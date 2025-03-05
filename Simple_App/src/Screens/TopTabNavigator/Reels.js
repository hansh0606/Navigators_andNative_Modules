import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Reels() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> 📽️ Reels</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FF10F0',
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