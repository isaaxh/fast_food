import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";
import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { Category, MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const { category, query } = useLocalSearchParams<{
    query: string;
    category: string;
  }>();

  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: { category, query, limit: 6 },
  });
  const { data: categories } = useAppwrite({ fn: getCategories });

  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [category, query]);

  return (
    <SafeAreaView className='h-full bg-white'>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;
          return (
            <View
              className={cn(
                "flex-1 max-w-[48%]",
                !isFirstRightColItem ? "mt-10" : "mt-0"
              )}
            >
              <MenuCard item={item as MenuItem} />
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName='gap-7'
        contentContainerClassName='gap-7 px-5 pb-32'
        ListHeaderComponent={() => (
          <View className='gap-5 my-5'>
            <View className='flex-row w-full flex-between'>
              <View className='flex-start'>
                <Text className='uppercase small-bold text-primary'>
                  Search
                </Text>
                <View className='flex-start flex-row gap-x-1 mt-0.5'>
                  <Text className='paragraph-semibold text-dark-100'>
                    Find your favorite food
                  </Text>
                </View>
              </View>

              <CartButton />
            </View>

            <SearchBar />

            <Filter categories={categories as Category[]} />
          </View>
        )}
        ListEmptyComponent={() => !loading && <Text>No Results</Text>}
      />
    </SafeAreaView>
  );
};

export default Search;
