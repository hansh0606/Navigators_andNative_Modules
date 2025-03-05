import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';

export default function LoginPage({route, navigation}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.iconContainer,
            isHovered && styles.iconHover, // Apply hover effect conditionally
          ]}
          onPress={() => {
            navigation.goBack();
          }}
          onPressIn={() => setIsHovered(true)} // Apply hover effect on press
          onPressOut={() => setIsHovered(false)} // Remove hover effect on release
        >
          <Image
            style={styles.icon}
            source={require('../assets/Images/back-button.png')}
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>Go Back</Text>
      </View>

      {/* Body */}
      <View style={styles.container}>
        <Text style={styles.text}>Login Page</Text>
        <Text style={styles.text}>{route.params?.message}</Text>

        {/* Navigation to Details Page */}
        <Button
          title="GO TO DETAILS"
          onPress={() =>
            navigation.navigate('details', {message: 'Welcome to Details'})
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ADD8E6',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 60,
  },

  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
  },

  iconContainer: {
    padding: 5,
    borderRadius: 50, // Circular effect
    
  },

  iconHover: {
    backgroundColor: 'white', // White hover effect
  },

  icon: {
    width: 30,
    height: 30,
    margin: 10,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    margin: 10,
  },
});
