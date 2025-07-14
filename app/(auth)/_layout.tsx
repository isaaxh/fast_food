import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { Redirect, Slot } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();

  console.log("isAuthenticated", isAuthenticated);

  if (isAuthenticated) return <Redirect href='/' />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className='h-full bg-white'
        keyboardShouldPersistTaps='handled'
      >
        <View
          className='relative w-full'
          style={{ height: Dimensions.get("screen").height / 2.25 }}
        >
          <ImageBackground
            source={images.loginGraphic}
            className='rounded-b-lg size-full'
            resizeMode='stretch'
          />

          <Image
            source={images.logo}
            className='absolute z-10 self-center size-48 -bottom-16'
          />
        </View>

        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
