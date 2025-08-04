import CustomButton from "@/components/CustomButton";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileInfoField from "@/components/ProfileInfoField";
import { images } from "@/constants";
import { signOut, updateDocument } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { User } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, Image, ImageSourcePropType, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const phoneNumberSchema = z
  .string()
  .min(1, "Phone number is required")
  .regex(
    /^\+[1-9]\d{1,14}$/,
    "Phone number must be in international format, e.g., +966501234567"
  )
  .optional();

const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.email("Invalid email.").min(1, "Email is required."),
  phoneNumber: phoneNumberSchema,
  // gender: z.enum(["male", "female"]).optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
});

type TFormData = z.infer<typeof formSchema>;

type ProfileFieldKey =
  | "name"
  | "email"
  | "phoneNumber"
  | "address1"
  | "address2";

type ProfileItemListProps = {
  label: ProfileFieldKey;
  title: string;

  editable: boolean;
  icon: ImageSourcePropType;
}[];

const profileItemList: ProfileItemListProps = [
  {
    label: "name",
    title: "Full Name",
    editable: true,
    icon: images.user,
  },
  {
    label: "email",
    title: "Email",
    editable: false,
    icon: images.envelope,
  },
  {
    label: "phoneNumber",
    title: "Phone Number",
    editable: true,
    icon: images.phone,
  },
  {
    label: "address1",
    title: "Address 1 - (Home)",
    editable: true,
    icon: images.location,
  },
  {
    label: "address2",
    title: "Address 2 - (Work)",
    editable: true,
    icon: images.location,
  },
];

const Profile = () => {
  const { fetchAuthenticatedUser, user } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<TFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      address1: user?.address1,
      address2: user?.address2,
    },
  });

  const onSubmit = async (data: TFormData) => {
    if (!user) return;
    const updatedFields: Partial<User> = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address1: data.address1,
      address2: data.address2,
    };

    await updateDocument({
      collectionId: "userCollectionId",
      documentId: user.$id,
      updatedFields,
    });
  };

  const logout = async () => {
    try {
      await signOut();
      await fetchAuthenticatedUser();
    } catch (e) {
      console.error("Logout failed: ", e);
    }
  };

  return (
    <SafeAreaView className='px-5 pt-5 pb-20'>
      <FlatList
        data={profileItemList}
        renderItem={({ item }) => (
          <Controller
            control={control}
            name={item.label}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className='px-6'>
                <ProfileInfoField
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value ?? ""}
                  label={item.label}
                  title={item.title}
                  editable={item.editable}
                  icon={
                    <Image
                      source={item.icon}
                      className='size-6'
                      resizeMode='contain'
                    />
                  }
                />

                {errors[item.label] && (
                  <Text className='mt-3 text-red-500'>
                    {errors[item.label]?.message?.toString()}
                  </Text>
                )}
              </View>
            )}
          />
        )}
        contentContainerClassName='mb-12 gap-y-5'
        ListHeaderComponent={() => <ProfileHeader />}
        ListFooterComponent={() => (
          <View className='mt-10 gap-y-5'>
            <CustomButton
              title='Save'
              variant='primary'
              size='large'
              border='rounded-full'
              onPress={handleSubmit(onSubmit)}
              disabled={!isDirty}
            />
            <CustomButton
              title='Log Out'
              variant='secondary'
              size='large'
              border='rounded-full'
              style='border-red-600'
              textStyle='text-red-600'
              leftIcon={
                <Image
                  source={images.logout}
                  resizeMode='contain'
                  className='mr-2 size-6'
                />
              }
              onPress={logout}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
