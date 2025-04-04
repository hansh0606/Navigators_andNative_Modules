import {useFocusEffect} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {getExpenses, deleteExpense} from './database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BarChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const HomeScreen = ({route, navigation}) => {
  const {username} = route.params;
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [dailyExpensesData, setDailyExpensesData] = useState([]);
  const [dailyLabels, setDailyLabels] = useState([]);

  const fetchExpenses = useCallback(() => {
    console.log('Fetching expenses for user:', username);
    getExpenses(username, data => {
      console.log('Fetched expenses:', data);
      setExpenses(data);

      const total = data.reduce(
        (sum, expense) => sum + parseFloat(expense.amount),
        0,
      );
      setTotalAmount(total);

      // Calculate daily expenses for the last 8 days
      const today = new Date();
      const dailyData = [];
      const labels = [];
      let dailyTotalSum = 0;

      for (let i = 7; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formattedDate = date.toISOString().split('T')[0];
        const day = formattedDate.split('-')[2];

        const dailyTotal = data
          .filter(expense => expense.date === formattedDate)
          .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        dailyData.push(dailyTotal);
        labels.push(day);
        dailyTotalSum += dailyTotal;
      }

      setDailyExpensesData(dailyData);
      setDailyLabels(labels);
    });
  }, [username]);

  useEffect(() => {
    console.log('HomeScreen mounted for user:', username);
    fetchExpenses();
  }, [fetchExpenses]);

  useFocusEffect(
    useCallback(() => {
      console.log('Screen focused, checking for newExpense');
      if (route.params?.newExpense) {
        console.log('New expense detected:', route.params.newExpense);
        fetchExpenses();
      }
      return () => {
        console.log('Screen blurred');
      };
    }, [route.params?.newExpense, fetchExpenses]),
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loggedInUser');
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Error', 'Failed to logout');
    }
  };

  const handleDelete = async id => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteExpense(
              id,
              () => {
                fetchExpenses(); // Refresh expenses after deletion
                Alert.alert('Success', 'Expense deleted successfully');
              },
              error => {
                console.error('Delete Error:', error);
                Alert.alert('Error', 'Failed to delete expense');
              },
            );
          },
        },
      ],
      {cancelable: false},
    );
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.3,
    barRadius: 5,
    decimalPlaces: 2,
    propsForBackgroundLines: {
      strokeWidth: 0, // Remove dotted lines
    },
    padding: 10,
    fillShadowGradientFrom: '#1FABDF',
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientTo: '#CA67FA',
    fillShadowGradientToOpacity: 0.7,
  };

  const chartData = {
    labels: dailyLabels,
    datasets: [
      {
        data: dailyExpensesData,
      },
    ],
  };

  const categoryIcons = {
    food: require('../assets/Images/food1.png'),
    travel: require('../assets/Images/travel.png'),
    healthcare: require('../assets/Images/healthcare1.png'),
    shopping: require('../assets/Images/shopping.png'),
    entertainment: require('../assets/Images/tickets.png'),
  };

  const getCategoryIcon = category => categoryIcons[category] || null;

  const categoryColors = {
    food: ['#E49B0F', '#FCF55F'], // Gradient colors for food
    travel: ['#25BFA0', '#6FDED0'], // Gradient colors for travel
    healthcare: ['#0047AB', '#AB62E3'], // Gradient colors for healthcare
    shopping: ['#803AE9', '#EE82EE'], // Gradient colors for shopping
    entertainment: ['#EE4547', '#FFE4B5'], // Gradient colors for entertainment
  };

  const renderExpenseItems = () => {
    if (expenses.length === 0) {
      return (
        <View>
          <Text>No expenses found. Add your first expense!</Text>
        </View>
      );
    }

    return expenses.map(item => {
      console.log('Expense Category:', item.category); // Debugging
      console.log('Image Source:', getCategoryIcon(item.category)); // Debugging
      return (
        <View key={item.id.toString()} style={styles.expenseItem}>
          <View style={styles.leftContainer}>
            <View
              style={[
                styles.iconBackground,
                {backgroundColor: categoryColors[item.category]},
              ]}>
              <LinearGradient
                colors={categoryColors[item.category]} // Get gradient colors from palette
                style={styles.iconBackground}
                start={{x: 0.5, y: 1}} // Bottom center
                end={{x: 0.5, y: 0}} // Top center
              >
                <Image
                  source={getCategoryIcon(item.category)}
                  style={[styles.categoryIcon, {tintColor: 'white'}]} // Apply tintColor
                />
              </LinearGradient>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.expenseTitle}>{item.title}</Text>
              <Text style={styles.expenseCategory}>{item.category}</Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <LinearGradient
              colors={['#1FABDF', '#CA67FA', '#FF9176']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.gradientSquare}>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Delete</Text>
              </TouchableOpacity>
            </LinearGradient>

            <Text style={styles.expenseAmount}>{`₹${parseFloat(
              item.amount,
            ).toFixed(2)}`}</Text>
            <Text style={styles.expenseDate}>{item.date}</Text>
          </View>
        </View>
      );
    });
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.userContainer}>
            <LinearGradient
              colors={['#1FABDF', '#CA67FA', '#FF9176']}
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
            <Text style={styles.headerText}>{username}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <Image
              style={styles.logoutImage}
              source={require('../assets/Images/logout-icon.png')}
            />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#1FABDF', '#CA67FA', '#DD74D3', '#FF9176']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.balanceCard}>
          <Text style={styles.balanceText}>Total Expense</Text>
          <Text style={styles.totalBalanceText}>
            ₹ {totalAmount.toFixed(2)}
          </Text>
        </LinearGradient>

        <ScrollView style={{marginTop: 10,marginBottom:40}}>
          <View style={styles.chartCard}>
            <View style={styles.titleContainer}>
              <Text style={styles.chartTitle}>
                {dailyLabels.length > 0
                  ? `${dailyLabels[0]} Jan ${new Date().getFullYear()} - ${
                      dailyLabels[dailyLabels.length - 1]
                    } Jan ${new Date().getFullYear()}`
                  : 'Daily Expenses'}
              </Text>
              <Text style={styles.chartTotal}>
                ₹ {dailyExpensesData.reduce((a, b) => a + b, 0).toFixed(2)}
              </Text>
            </View>

            <BarChart
              data={chartData}
              width={Dimensions.get('window').width - 60}
              height={200}
              yAxisLabel="₹"
              chartConfig={chartConfig}
              verticalLabelRotation={0}
            />
          </View>
          <Text style={styles.recentExpensesTitle}>Recent Expenses</Text>
          <View style={styles.expensesContainer}>{renderExpenseItems()}</View>
      
        </ScrollView>
      </View>

      <View style={styles.AddExpensecontainer}>
    <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={() => navigation.navigate('AddExpenseScreen', {username})}>
            <LinearGradient
                colors={['#FF9176', '#DD74D3', '#CA67FA', '#1FABDF']}
                locations={[0.2, 0.5, 0.6, 0.9]}
                end={{ x: 1, y: 1 }}
                style={styles.addButton}>
                <Text style={styles.plusText}>+</Text>
            </LinearGradient>
        </TouchableOpacity>
    </View>
</View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#F3F5F7'},
  iconBackground: {
    width: 40, // Adjust as needed
    height: 40, // Adjust as needed
    borderRadius: 20, // Make it circular
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  categoryIcon: {
    width: 25, // Adjust as needed
    height: 25, // Adjust as needed

    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  userContainer: {flexDirection: 'row', alignItems: 'center'},
  gradientCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },

  gradientSquare: {
    width: 60,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  userImageWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  userImage: {width: '100%', height: '100%', borderRadius: 22},
  logoutImage: {height: 40, width: 40},
  headerText: {fontSize: 18, fontWeight: 'bold', marginLeft: 5},
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
  totalBalanceText: {fontSize: 50, fontWeight: 'bold', color: 'white'},
  recentExpensesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
    marginBottom: 10,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 3,
  },
  userContainer: {flexDirection: 'row', alignItems: 'center'},
  expenseText: {fontSize: 16, fontWeight: 'bold'},
  expenseCategory: {fontSize: 14, color: '#666'},
  logoutButton: {marginTop: 20},
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  AddExpensecontainer: {
    position: 'absolute',
    bottom: 0, // Adjust bottom position
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 4,
    paddingTop: 50 // Adjust paddingTop to accommodate half-button
    
  },

  buttonContainer: {
    position: 'absolute',
    top: -45, // Negative top margin to push the button up
    alignSelf: 'center',
    borderWidth:10,
    borderColor:'white',
    borderRadius:60,
 
},
  addButton: {
    width: 70,
    height: 70,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  plusText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  chartCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  titleContainer: {
    // Style for the title and total container
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  chartTotal: {
    fontSize: 18,
    textAlign: 'center',
  },
  expenseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  expenseDate: {
    fontSize: 14,
    color: 'gray',
  },

  barView: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default HomeScreen;
