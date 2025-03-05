import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      {/* Logo */}
      <Image
        source={require('../assets/Images/MyLoft_Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Header Text */}
      <Text style={styles.headerText}>MyLoft</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10,
    backgroundColor: 'blue', 
  },
  logo: {
    height: 30,
    width: 30,
    marginRight: 10, 
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
