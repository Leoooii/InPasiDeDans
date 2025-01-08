import {Animated, Pressable, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {authStore} from "@/app/authStore";
import ScrollView = Animated.ScrollView;

export default function Index() {
    const currentUser = authStore.getState().user;

    return (
        <SafeAreaView className={'bg-blue-950 flex-1 '}>
            <Text className={'text-white'}>Salutare admin {currentUser.email}</Text>
            <View className={'flex-1 p-5 flex flex-col gap-5'}>
                <Pressable className={'w-full bg-gray-200 p-3'}><Text>120 Dansatori</Text></Pressable>
                <Pressable className={'w-full bg-gray-200 p-3'}><Text>13 Grupe</Text></Pressable>
                <Pressable className={'w-full bg-gray-200 p-3'}><Text>93 abonamente active</Text></Pressable>

            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({})
