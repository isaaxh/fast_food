import Avatar from "@/components/Avatar";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import ProfileInfoItem from "@/components/ProfileInfoItem";
import { images } from "@/constants";
import { signOut } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import React from "react";
import { FlatList, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { fetchAuthenticatedUser, user } = useAuthStore();

  const profileItemList = [
    {
      label: "Full Name",
      value: user?.name,
      icon: images.user,
    },

    {
      label: "Email",
      value: user?.email,
      icon: images.envelope,
    },

    {
      label: "Phone Number",
      value: "+966 55 790 6658",
      icon: images.phone,
    },

    {
      label: "Address 1 - (Home)",
      value: "Omar Al Kadi St., Sharaie No.4, Mecca",
      icon: images.location,
    },
    {
      label: "Address 2 - (Work)",
      value: "Abdallah Bin Abbas St., Shoqiya, Mecca",
      icon: images.location,
    },
  ];

  const logout = async () => {
    try {
      await signOut();
      await fetchAuthenticatedUser();
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  return (
    <SafeAreaView className='px-5 pt-5 pb-20'>
      <FlatList
        data={profileItemList}
        renderItem={({ item }) => (
          <View className='px-10'>
            <ProfileInfoItem
              label={item.label}
              value={item.value ?? ""}
              icon={
                <Image
                  source={item.icon}
                  className='size-6'
                  resizeMode='contain'
                />
              }
            />
          </View>
        )}
        contentContainerClassName='mb-12 gap-y-5'
        ListHeaderComponent={() => (
          <>
            <CustomHeader title='Profile' />
            <View className='items-center'>
              <Avatar imgUrl={images.avatar} />
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View className='mt-10 gap-y-5'>
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
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
