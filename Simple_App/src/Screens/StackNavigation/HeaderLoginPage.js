import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HeaderLoginPage() {
  const navigation = useNavigation(); 

  return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
          <Image source={require("../assets/Images/back-button.png")} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.text}>Go back to Home Page</Text>
      </View>
    
  );
}

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
    },

    button:{
        padding:8
    },

    text:{
        fontSize:18,
        fontWeight:"bold",
        fontFamily:'sansita'
    },
    icon:{
        height:30,
        width:30,
        
    }
  
});
