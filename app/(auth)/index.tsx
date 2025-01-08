import {View, Text, Button} from 'react-native'
import React from 'react'
import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Index() {
    return (
        <SafeAreaView>
            <Text>Index</Text>
            <Button title={'apasa'} onPress={() => {router.push('/explore')}}/>
        </SafeAreaView>
    )
}
