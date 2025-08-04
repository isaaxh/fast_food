import CartItem from "@/components/CartItem";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import EmptyState from "@/components/EmptyState";
import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { PaymentInfoStripeProps } from "@/type";
import cn from "clsx";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentInfoStripe = ({
  label,
  value,
  labelStyle,
  valueStyle,
}: PaymentInfoStripeProps) => (
  <View className='flex-row my-1 flex-between'>
    <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
      {label}
    </Text>
    <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
      {value}
    </Text>
  </View>
);

const Cart = () => {
  const { items, getTotalItems, getTotalPrice } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <SafeAreaView className='h-full bg-white'>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem item={item} />}
        contentContainerClassName='pb-28 px-5 pt-5 flex'
        ListHeaderComponent={() => <CustomHeader title='Your Cart' />}
        ListEmptyComponent={() => (
          <View className='mt-20'>
            <EmptyState
              graphic={images.emptyState}
              title='Your shopping cart looks empty.'
              description='What are you carving today?'
              ctaLabel='Browse Menu'
              onCtaPress={() => router.push("/(tabs)/search")}
            />
          </View>
        )}
        ListFooterComponent={() =>
          totalItems > 0 && (
            <View className='gap-5'>
              <View className='p-5 mt-6 border border-gray-200 rounded-2xl'>
                <Text className='mb-5 h3-bold text-dark-100'>
                  Payment Summary
                </Text>

                <PaymentInfoStripe
                  label={`Total Items (${totalItems})`}
                  value={`$${totalPrice.toFixed(2)}`}
                />
                <PaymentInfoStripe label={`Delivery Fee`} value={`$5.00`} />
                <PaymentInfoStripe
                  label={`Discount`}
                  value={`- $0.50`}
                  valueStyle='!text-success'
                />

                <View className='my-5 border border-gray-300' />

                <PaymentInfoStripe
                  label={`Total`}
                  value={`$${(totalPrice + 5 - 0.5).toFixed(2)}`}
                  labelStyle='base-bold !text-dark-100'
                  valueStyle='base-bold !text-dark-100 !text-right'
                />
              </View>

              <CustomButton
                title='Order Now'
                variant='primary'
                onPress={() => {}}
              />
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default Cart;
