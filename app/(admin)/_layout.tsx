
import {Stack, Tabs} from 'expo-router';
import 'react-native-reanimated';
import {IconSymbol} from "@/components/ui/IconSymbol";
import React from "react";



export default function RootLayout() {


    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ headerShown: false,tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,title:'Acasa'}} />
            <Tabs.Screen name="dancers" options={{ headerShown: false,tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,title:'Dansatori'}} />
        </Tabs>
    );
}
