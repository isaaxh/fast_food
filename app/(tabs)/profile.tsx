import Avatar from "@/components/Avatar";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import ProfileInfoItem from "@/components/ProfileInfoItem";
import { images } from "@/constants";
import { signOut } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import React from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { fetchAuthenticatedUser, user } = useAuthStore();

  const logout = async () => {
    try {
      await signOut();
      await fetchAuthenticatedUser();
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  return (
    <SafeAreaView className='px-5 pt-5 pb-28'>
      <CustomHeader title='Profile' />

      <View className='items-center'>
        <Avatar imgUrl={images.avatar} />
      </View>

      <View className='px-12 mb-12 gap-y-6'>
        <ProfileInfoItem
          label='Full Name'
          value={user?.name ?? ""}
          icon={
            <Image
              source={images.user}
              className='size-6'
              resizeMode='contain'
            />
          }
        />
        <ProfileInfoItem
          label='Email'
          value={user?.email ?? ""}
          icon={
            <Image
              source={images.envelope}
              className='size-6'
              resizeMode='contain'
            />
          }
        />
        <ProfileInfoItem
          label='Phone Number'
          value='+966 50 285 0922'
          icon={
            <Image
              source={images.phone}
              className='size-6'
              resizeMode='contain'
            />
          }
        />
        <ProfileInfoItem
          label='Address 1 - (Home)'
          value='Omar Al Kadi St., Sharaie No.4, Mecca'
          icon={
            <Image
              source={images.location}
              className='size-6'
              resizeMode='contain'
            />
          }
        />
        <ProfileInfoItem
          label='Address 2 - (Work)'
          value='Abdallah Bin Abbas St., Shoqiya, Mecca'
          icon={
            <Image
              source={images.location}
              className='size-6'
              resizeMode='contain'
            />
          }
        />
      </View>

      <View className='gap-y-5'>
        <CustomButton
          title='Edit Profile'
          variant='secondary'
          onPress={() => {}}
        />
        <CustomButton
          title='Log Out'
          variant='secondary'
          style='border-red-600'
          textStyle='text-red-600'
          leftIcon={
            <Image
              source={images.logout}
              resizeMode='contain'
              className='mr-2 size-6'
            />
          }
          onPress={logout}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
