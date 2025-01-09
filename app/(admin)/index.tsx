import {Animated, Pressable, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {authStore} from "@/app/authStore";
import ScrollView = Animated.ScrollView;

export default function Index() {
    const currentUser = authStore.getState().user;

    return (
        <SafeAreaView className={'bg-blue-950 flex-1 px-5'}>
            <Text className={'text-white text-center mb-5'}>Salutare admin {currentUser.email}</Text>
            <View className={'flex-1  flex flex-col gap-5'}>
                <Pressable className={'w-full bg-gray-200 p-3 rounded-xl'}><Text>120 Dansatori</Text></Pressable>
                <Pressable className={'w-full bg-gray-200 p-3 rounded-xl'}><Text>13 Grupe</Text></Pressable>
                <Pressable className={'w-full bg-gray-200 p-3 rounded-xl'}><Text>93 abonamente active</Text></Pressable>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({})
