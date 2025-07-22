import { images } from "@/constants";
import React from "react";
import { View } from "react-native";
import Avatar from "./Avatar";
import CustomHeader from "./CustomHeader";

const ProfileHeader = () => {
  return (
    <>
      <CustomHeader title='Profile' />
      <View className='items-center'>
        <Avatar imgUrl={images.avatar} />
      </View>
    </>
  );
};

export default ProfileHeader;
