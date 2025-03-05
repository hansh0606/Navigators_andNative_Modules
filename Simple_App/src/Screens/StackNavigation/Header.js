import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

export default function Header({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Images/MyLoft_Logo.png')}
        style={styles.logo}>
      </Image>

      <Text style={styles.headerText}>MyLoft</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',   
  },
  backText: {
    fontSize: 24,
  },
  logo: {
    height: 40,
    width: 40,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000040',
    marginLeft:10
  },
});
