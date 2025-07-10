import { CustomButtonProps } from "@/type";
import cn from "clsx";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  onPress,
  title = "Click Me",
  style,
  leftIcon,
  textStyle,
  isLoading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={cn("custom-btn", style)}
      onPress={onPress}
      disabled={isLoading}
    >
      {leftIcon}

      <Text className={cn("text-white-100 paragraph-semibold", textStyle)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
