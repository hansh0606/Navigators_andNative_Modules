import {useFocusEffect} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Image,
} from 'react-native';
import {getExpenses} from './database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({route, navigation}) => {
  const {username} = route.params;
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = () => {
    getExpenses(username, data => {
      setExpenses(data);
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, []),
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loggedInUser'); // Clear stored user data
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}], // Ensure "Login" is correctly named in your navigation stack
      });
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* User Image & Name on Left */}
        <View style={styles.userContainer}>
          {/* Gradient Circle */}
          <LinearGradient
            colors={['#1FABDF', '#CA67FA', '#FF9176']} // Gradient Colors
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradientCircle}>
            <View style={styles.userImageWrapper}>
              <Image
                style={styles.userImage}
                source={require('../assets/Images/userImage.jpeg')}
              />
            </View>
          </LinearGradient>

          {/* Username */}
          <Text style={styles.headerText}>{username}</Text>
        </View>

        {/* Logout Button on Right */}
        <TouchableOpacity onPress={handleLogout}>
          <Image
            style={styles.logoutImage}
            source={require('../assets/Images/logout-icon.png')}
          />
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={['#1FABDF', '#CA67FA', '#DD74D3', '#FF9176']} // Blue → Purple → Orange
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.balanceCard}>
        <Text style={styles.balanceText}>Total Balance</Text>
        <Text style={styles.totalBalanceText}>₹ 0000</Text>
      </LinearGradient>

      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
          marginTop: 20,
          marginBottom: 10,
        }}>
        Total Balance
      </Text>
      {expenses.length === 0 ? (
        <Text>No expenses found. Add your first expense!</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.expenseItem}>
              {/* Category at Left-Center */}
              <View style={styles.leftContainer}>
                <Text style={styles.expenseCategory}>{item.category}</Text>
              </View>

              {/* Amount at Right-Top & Date at Right-Bottom */}
              <View style={styles.rightContainer}>
                <Text style={styles.expenseAmount}>{`₹${item.amount}`}</Text>
                <Text style={styles.expenseDate}>01/01/25{item.date}</Text>
              </View>
            </View>
          )}
        />
      )}

      <View style={styles.AddExpensecontainer}>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => navigation.navigate('AddExpenseScreen', {username})}>
          <LinearGradient
            colors={['#FF9176', '#DD74D3', '#CA67FA', '#1FABDF']} 
            locations={[0.2, 0.5, 0.6, 0.9]} // Adjust distribution
            end={{ x: 1, y: 1 }}
            style={styles.addButton}>
            <Text style={styles.plusText}>+</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#F3F5F7'},

  gradientCircle: {
    width: 50,
    height: 50,
    borderRadius: 25, // Makes it a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3, // Space for border effect
  },
  userImageWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden', // Ensures image stays within circular shape
    backgroundColor: 'white', // Optional background inside the gradient
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 22, // Match wrapper for smooth edges
  },
  logoutImage: {
    height: 40,
    width: 40,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5, // Space between image and text
  },
  headerContainer: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Align vertically at the center
    justifyContent: 'space-between', // Push items to left & right corners
    paddingBottom: 10,
    backgroundColor: '#f5f5f5', // Optional background color
  },

  balanceCard: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  balanceText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  totalBalanceText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green', // Amount in green (optional)
  },
  expenseDate: {
    fontSize: 14,
    color: 'gray',
  },
  expenseItem: {
    flexDirection: 'row', // Align elements horizontally
    justifyContent: 'space-between', // Push left & right sections apart
    alignItems: 'center', // Align items vertically
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 3,
  },
  userContainer: {
    flexDirection: 'row', // Arrange image and text in a row
    alignItems: 'center', // Align them properly
  },
  expenseText: {fontSize: 16, fontWeight: 'bold'},
  expenseCategory: {fontSize: 16, fontWeight: 'bold', color: '#333'},
  logoutButton: {marginTop: 20},

  leftContainer: {
    flex: 1, // Takes available space on the left
    justifyContent: 'center', // Align category to the center
  },
  rightContainer: {
    alignItems: 'flex-end', // Align items to the right
  },
  AddExpensecontainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  addButtonContainer: {
    width: 70,
    height: 70,
  },
  addButton: {
    width: 70,
    height: 70,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    
  },
});

export default HomeScreen;
