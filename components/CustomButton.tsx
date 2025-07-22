import cn from "clsx";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type ButtonVariation = "primary" | "secondary";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant: ButtonVariation;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  style?: string;
  textStyle?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title = "Click Me",
  onPress,
  variant,
  leftIcon,
  disabled = false,
  isLoading = false,
  style,
  textStyle,
}) => {
  const baseStyle = "custom-btn";
  const primaryStyle = "bg-amber-500";
  const secondaryStyle = "bg-transparent border border-amber-600";
  const disabledStyle = "opacity-40";

  const baseTextStyle = "paragraph-semibold";
  const primaryText = "text-white";
  const secondaryText = "text-amber-500";
  return (
    <TouchableOpacity
      className={cn(
        baseStyle,
        variant === "primary" ? primaryStyle : secondaryStyle,
        disabled && disabledStyle,
        style
      )}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {leftIcon}

      <Text
        className={cn(
          baseTextStyle,
          variant === "primary" ? primaryText : secondaryText,
          textStyle
        )}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
