import { signOut } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();

  const logout = async () => {
    try {
      await signOut();
      fetchAuthenticatedUser();
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  return (
    <SafeAreaView>
      <Text>profile</Text>

      <View>
        <Button title='Log Out' onPress={logout} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
