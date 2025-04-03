import './gesture-handler';
import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import Advance_Hands_On_Exercise from './src/Screens/Month1_Week4_Advance_Hands_On_Exercise/Advance_Exercise';
import Counter_App from './src/Screens/Month2_Week1_Task1/Counter_App';
import To_do_App from './src/Screens/Month2_Week1_Task2/To_do_App';
import TodoList from './src/Screens/Month2_Week1_Task2/To_do_with_Class_Components';
import StackNavigator from './src/Screens/StackNavigation/StackNavigator';
import NativeStackNavigator from './src/Screens/NativeStack/NativeStackNavigator';
import BottomTabNavigator from './src/Screens/BottomTabNavigator/BottomTabNavigator';
import TopTabNavigator from './src/Screens/TopTabNavigator/TopTabNavigator';
import CameraButton from './src/Screens/CameraButton/CameraButton';
import Axios from './src/Screens/Axios/Axios';
import WeatherApp from './src/Screens/WeatherApp/WeatherApp';
import AsyncStorage from './src/Screens/AsyncStorage/AsyncStorageApp';
import UserPreferences from './src/Screens/AsyncStorage/ThemeWithAsyncStorage';
import SQLiteDemo from './src/Screens/SQLite/SQLiteDemo';
import ExpenseApp from './src/Screens/ExpenseTracker/Screens/ExpenseApp';

export default function App() {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>Let's check</Text>
      <ExpenseApp/>
      {/* <To_do_App/> */}
      {/* <TodoList/> */}
      {/* <StackNavigator /> */}
      {/* <CameraButton/> */}
      {/* <Axios/> */}
      {/* <WeatherApp/> */}
      {/* <AsyncStorage/> */}
      {/* <UserPreferences/> */}
      {/* <SQLiteDemo/> */}
      {/* <NativeStackNavigator/> */}
      {/* <BottomTabNavigator/> */}
      {/* <TopTabNavigator/> */}
      {/* <Counter_App/>  */}

      {/* <ScrollView >
        <Advance_Hands_On_Exercise />
        </ScrollView> */}
    </View>
  );
}
