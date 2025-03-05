import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ProfilePage from "./ProfilePage";
import Reels from "./Reels";
import ChatPage from "./ChatPage";

// Import Custom Icons
import { ProfileIcon, ChatIcon, ReelIcon } from "./icon"; 

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            if (route.name === "Profile") return <ProfileIcon focused={focused} />;
            if (route.name === "Chat") return <ChatIcon focused={focused} />;
            if (route.name === "Reels") return <ReelIcon focused={focused} />;
          },
          tabBarLabel: ({ focused }) => {
            let labelColor;
      
            // Set color based on the route and focus state
            if (route.name === "Profile") labelColor = focused ? "#FF10F0" : "#888";
            else if (route.name === "Chat") labelColor = focused ? "#1F51FF" : "#888";
            else if (route.name === "Reels") labelColor = focused ? "#BC13FE" : "#888";
      
            return <Text style={{ color: labelColor, fontSize: 12 }}>{route.name}</Text>;
          } , // Customized text labels
          tabBarStyle: styles.tabBar, // Custom style
        })}
      >
        <Tab.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }} />
        <Tab.Screen name="Chat" component={ChatPage} options={{ headerShown: false }} />
        <Tab.Screen name="Reels" component={Reels} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "absolute", 
  
  },
});
