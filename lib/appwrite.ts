import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: 'com.isaaxh.fast_food',
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: '686f8857000e9f5d3143',
    userCollectionId: '686f888f0003f6e5d136',
}


export const client = new Client()

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);


export const account = new Account(client)
export const databases = new Databases(client)
export const avatars = new Avatars(client)


export const createUser = async ({ name, email, password }: CreateUserParams) => {

    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        if (!newAccount) throw Error;

        await signIn({ email, password })


        const avatarUrl = await avatars.getInitialsURL(name)

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { accountId: newAccount.$id, name, email, avatar: avatarUrl }
        )


    } catch (e) {
        throw new Error(e as string)
    }

}

export const signIn = async ({ email, password }: SignInParams) => {

    try {
        const session = await account.createEmailPasswordSession(email, password);
    } catch (e) {
        throw new Error(e as string)

    }

}


export const getCurrentUser = async () => {

    try {

        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0]

    } catch (e) {
        console.log(e);
        throw new Error(e as string)
    }
}