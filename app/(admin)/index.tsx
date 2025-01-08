import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {authStore} from "@/app/authStore";

export default function Index() {
    const currentUser = authStore.getState().user;

    return (
        <SafeAreaView className={'bg-orange-300 flex-1'}>
            <Text>{currentUser.email}</Text>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({})
