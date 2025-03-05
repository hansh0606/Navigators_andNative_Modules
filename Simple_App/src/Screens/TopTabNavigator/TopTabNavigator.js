import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import ProfilePage from './ProfilePage'
import ChatPage from './ChatPage'
import Reels from './Reels'

const TopTab = createMaterialTopTabNavigator()

export default function TopTabNavigator() {
  return (
    <NavigationContainer>
        <TopTab.Navigator initialRouteName='Profile'>
            <TopTab.Screen name='Profile' component={ProfilePage}></TopTab.Screen>
            <TopTab.Screen name='ChatPage' component={ChatPage}></TopTab.Screen>
            <TopTab.Screen name='Reels' component={Reels}></TopTab.Screen>
        </TopTab.Navigator>
    </NavigationContainer>
  )
}