import {Button, Text, View} from 'react-native'
import React, {Component} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";

export default class Signin extends Component {
    render() {
        return (
            <SafeAreaView className={'bg-orange-300 flex-1 justify-center flex-col gap-2'}>
                <Text className={'text-center'}>Sign in</Text>
                <Button title={'Acasa'} onPress={() => {router.push('/(tabs)')}}/>
            </SafeAreaView>
        )
    }
}