import { Slot } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function _layout() {
  return (
    <SafeAreaView>
      <Text>auth layout</Text>
      <Slot />
    </SafeAreaView>
  );
}
