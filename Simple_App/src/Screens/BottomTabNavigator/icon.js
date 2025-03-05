import { Image, StyleSheet, View } from "react-native";
import React from "react";

export function ProfileIcon({ focused }) {
  return (
    <View>
      <Image
        style={[styles.image, { tintColor: focused ? "#FF10F0" : "#888" }]}
        source={require("../assets/icons/profile-icon.png")}
      />
    </View>
  );
}

export function ChatIcon({ focused }) {
  return (
    <View>
      <Image
        style={[styles.image, { tintColor: focused ? "#1F51FF" : "#888" }]}
        source={require("../assets/icons/chat-icon.png")}
      />
    </View>
  );
}

export function ReelIcon({ focused }) {
  return (
    <View>
      <Image
        style={[styles.image, { tintColor: focused ? "#BC13FE" : "#888" }]}
        source={require("../assets/icons/reels-icon.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
});
