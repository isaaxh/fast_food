import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { useCategoryStore } from "@/store/category.store";
import cn from "clsx";
import { router } from "expo-router";
import { Fragment } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const setCategory = useCategoryStore((state) => state.setCategory);
  const { user } = useAuthStore();

  const handlePress = async (id: string) => {
    setCategory(id);

    router.push("/(tabs)/search");
  };
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven ? "flex-row-reverse" : "flex-row"
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#ffffff22" }}
                onPress={() => handlePress(item.category)}
              >
                {({ pressed }) => (
                  <Fragment>
                    <View className='w-1/2 h-full'>
                      <Image
                        source={item.image}
                        className='size-full'
                        resizeMode='contain'
                      />
                    </View>

                    <View
                      className={cn(
                        "offer-card__info",
                        isEven ? "pl-10" : "pr-10"
                      )}
                    >
                      <Text className='leading-tight text-white h1-bold'>
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className='size-10'
                        resizeMode='contain'
                        tintColor='#ffffff'
                      />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
        contentContainerClassName='pb-28 px-5'
        ListHeaderComponent={
          <View className='flex-row w-full my-5 flex-between'>
            <View className='flex-start'>
              <Text className='small-bold text-primary'>DELIVER TO</Text>
              <TouchableOpacity className='flex-row flex-center gap-x-1 mt-0.5'>
                <Text
                  className='truncate paragraph-bold text-dark-100'
                  ellipsizeMode='tail'
                >
                  {user?.address1 !== undefined ? user?.address1 : "Mecca"}
                </Text>
                <Image
                  source={images.arrowDown}
                  className='size-3'
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>

            <CartButton />
          </View>
        }
      />
    </SafeAreaView>
  );
}
