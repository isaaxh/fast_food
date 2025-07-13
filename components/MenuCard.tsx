import { appwriteConfig } from "@/lib/appwrite";
import { MenuItem } from "@/type";
import { Image, Platform, Text, TouchableOpacity } from "react-native";

const MenuCard = ({ item: { image_url, name, price } }: { item: MenuItem }) => {
  const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`;

  return (
    <TouchableOpacity
      className='menu-card'
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {}
      }
    >
      <Image
        source={{ uri: imageUrl }}
        className='absolute size-32 -top-10'
        resizeMode='contain'
      />
      <Text
        className='mb-2 text-center base-bold text-dark-100'
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text className='mb-4 text-gray-200 body-regular'>From ${price}</Text>
      <TouchableOpacity onPress={() => {}}>
        <Text className='paragraph-bold text-primary'>Add to cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;
