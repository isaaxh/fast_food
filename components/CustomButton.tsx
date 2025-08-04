import cn from "clsx";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type ButtonVariation = "primary" | "secondary";
type sizeVariation = "default" | "large";
type borderVariation = "default" | "rounded-full";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant: ButtonVariation;
  size?: sizeVariation;
  border?: borderVariation;
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
  size = "default",
  border = "default",
  leftIcon,
  disabled = false,
  isLoading = false,
  style,
  textStyle,
}) => {
  const baseStyle = "flex flex-row justify-center bg-primary";
  const primaryStyle = "bg-amber-500";
  const secondaryStyle = "bg-transparent border border-amber-600";
  const disabledStyle = "opacity-40";

  const sizeDefault = "px-4 py-3";
  const sizeLarge = "p-3 w-full";

  const borderDefault = "rounded-lg";
  const borderRounded = "rounded-full";

  const baseTextStyle = "paragraph-semibold";
  const primaryText = "text-white";
  const secondaryText = "text-amber-500";
  return (
    <TouchableOpacity
      className={cn(
        baseStyle,
        variant === "primary" ? primaryStyle : secondaryStyle,
        size === "default" ? sizeDefault : sizeLarge,
        border === "default" ? borderDefault : borderRounded,
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
