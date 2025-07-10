import { CustomInputProps } from "@/type";
import cn from "clsx";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

const CustomInput = ({
  placeholder,
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
}: CustomInputProps) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View className='w-full'>
      <Text className='label'>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize='none'
        autoCorrect={false}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        placeholder={placeholder}
        placeholderTextColor={"#888"}
        className={cn("input", isFocus ? "border-primary" : "border-gray-300")}
      />
    </View>
  );
};

export default CustomInput;
