import SimpleLineIcons from "@react-native-vector-icons/simple-line-icons";
import React, { ReactNode, useRef } from "react";
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
} from "react-native";

type ProfileInfoFieldProps = {
  label: string;
  value: string;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText: (text: string) => void;
  editable?: boolean;
  icon: ReactNode;
};

const ProfileInfoField = ({
  label,
  value,
  onBlur,
  onChangeText,
  editable = true,
  icon,
}: ProfileInfoFieldProps) => {
  const inputRef = useRef<TextInput>(null);

  return (
    <View className='flex-row items-center'>
      <View className='mr-3'>{icon}</View>
      <View className='flex-1'>
        <Text className='text-gray-200 body-medium'>{label}</Text>
        <View className='flex-row items-center flex-1'>
          {editable ? (
            <>
              <TextInput
                className='flex-1 text-dark-100 base-bold'
                onChangeText={onChangeText}
                onBlur={onBlur}
                value={value}
                autoCorrect={false}
                spellCheck={false}
                placeholder='Enter Text...'
                ref={inputRef}
              />
              <TouchableOpacity
                className='px-4'
                onPress={() => inputRef.current?.focus()}
              >
                <SimpleLineIcons
                  name='pencil'
                  className='text-gray-200 size-4'
                />
              </TouchableOpacity>
            </>
          ) : (
            <Text className='text-dark-100 base-bold'>{value}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileInfoField;
