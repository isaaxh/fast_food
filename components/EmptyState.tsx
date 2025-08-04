import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import CustomButton from "./CustomButton";

type EmptyStateProps = {
  graphic: ImageSourcePropType;
  title: string;
  description: string;
  ctaLabel: string;
  onCtaPress: () => void;
};

const EmptyState = ({
  graphic,
  title,
  description,
  ctaLabel,
  onCtaPress,
}: EmptyStateProps) => {
  return (
    <View className='items-center'>
      <Image source={graphic} className='size-80' resizeMode='contain' />
      <View className='mb-8 items-center'>
        <Text className='h3-bold text-center mb-1'>{title}</Text>
        <Text className='paragraph-medium text-gray-200'>{description}</Text>
      </View>
      <CustomButton
        variant='primary'
        size='default'
        border='default'
        title={ctaLabel}
        onPress={onCtaPress}
      />
    </View>
  );
};

export default EmptyState;
