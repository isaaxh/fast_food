import { useGlobalStore } from "@/store/global.store";
import SimpleLineIcons from "@react-native-vector-icons/simple-line-icons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomModal = () => {
  const { toggleModal, showModal } = useGlobalStore();
  return (
    <Modal
      visible={showModal}
      animationType='fade'
      transparent
      onRequestClose={toggleModal}
    >
      <SafeAreaView className='absolute items-center justify-center w-full h-full bg-black/60'>
        <View className='items-center p-6 bg-white border border-gray-300 rounded-lg'>
          <View className='flex-row items-center justify-between gap-6'>
            <Text className='h3-bold'>Profile Photo</Text>
            {/* <TouchableOpacity className='items-center justify-center rounded-full bg-slate-100 size-8'>
              <Text>x</Text>
            </TouchableOpacity> */}
          </View>
          <View className='flex-row gap-3 py-2 mt-1'>
            <TouchableOpacity className='items-center p-4 rounded-lg bg-slate-200'>
              <SimpleLineIcons
                name='camera'
                className='text-gray-500'
                size={24}
                color={"#6b7280"}
              />
              <Text className='text-gray-500 body-medium'>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity className='items-center p-4 rounded-lg bg-slate-200'>
              <SimpleLineIcons
                name='picture'
                className='text-gray-500'
                size={24}
                color={"#6b7280"}
              />
              <Text className='text-gray-500 body-medium'>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity className='items-center p-4 rounded-lg bg-slate-200'>
              <SimpleLineIcons
                name='trash'
                className='text-gray-500'
                size={24}
                color={"#6b7280"}
              />
              <Text className='text-gray-500 body-medium'>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default CustomModal;
