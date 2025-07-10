import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const SignIn = () => {
  return (
    <View>
      <Text>signin page</Text>
      <Button title='Sign Up' onPress={() => router.push("/sign-up")} />
    </View>
  );
};

export default SignIn;
