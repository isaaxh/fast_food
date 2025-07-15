import React from "react";
import { Text, View } from "react-native";

interface ProfileInfoItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const ProfileInfoItem = ({ label, value, icon }: ProfileInfoItem) => {
  return (
    <View className='flex-row items-center'>
      <View className='mr-6'>{icon}</View>
      <View>
        <Text className='text-gray-200 body-medium'>{label}</Text>
        <Text className='base-bold text-dark-100'>{value}</Text>
      </View>
    </View>
  );
};

export default ProfileInfoItem;
