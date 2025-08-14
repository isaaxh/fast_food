import { images } from "@/constants";
import { useGlobalStore } from "@/store/global.store";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from "react-native";

interface AvatarProps {
  imgUrl: ImageSourcePropType;
}

const Avatar = ({ imgUrl }: AvatarProps) => {
  const { toggleModal } = useGlobalStore();
  return (
    <View className='mt-5 mb-12'>
      <Image source={imgUrl} className='profile-avatar' resizeMode='contain' />
      <TouchableOpacity onPress={toggleModal}>
        <Image
          source={images.pencil}
          className='profile-edit'
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  );
};

export default Avatar;
