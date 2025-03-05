import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'


export default function Details({route}) {

  const {name,university,mail}=route.params

  return (
    <View style={styles.container}>
      <Text>Details</Text>
      <Text style={styles.text}>Name: {name} </Text>
      <Text style={styles.text}>University: {university} </Text>
      <Text style={styles.text}>Email: {mail}</Text>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

    text:{
        fontSize:20,
        fontWeight:'bold'
    }
})