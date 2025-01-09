import {Animated, Pressable, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {authStore} from "@/app/authStore";
import ScrollView = Animated.ScrollView;

export default function Index() {
    const currentUser = authStore.getState().user;


    return (
        <SafeAreaView className={'bg-blue-950 flex-1 px-5'}>
            <Text className={'text-white text-center mb-5'}>Salutare admin {currentUser.email} </Text>
            <Text>Adauga profesoare</Text>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({})
