
import {Stack, Tabs} from 'expo-router';
import 'react-native-reanimated';
import {IconSymbol} from "@/components/ui/IconSymbol";
import React from "react";
import {Drawer} from "expo-router/drawer";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Image, View} from "react-native";
import CustomDrawerContent from "@/components/custom/CustomDrawer";
import {DrawerItem} from "@react-navigation/drawer";



export default function RootLayout() {


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

                <Drawer drawerContent={CustomDrawerContent}>

                <Drawer.Screen name={'index'} options={{ drawerIcon:({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,title:'Acasa' }} />
                    <Drawer.Screen name={'dancers'} options={{ drawerIcon:({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,title:'Dansatori' }} />
                </Drawer>

            {/*<Image source={{uri: 'https://www.inpasidedans.ro/wp-content/uploads/2016/07/logo-in-pasi-de-dans.png'}}/>*/}
        </GestureHandlerRootView>

    );
}
// <View className={'w-full bg-red-600'}>
//     <Image
//         source={{ uri: 'https://www.inpasidedans.ro/wp-content/uploads/2016/07/logo-in-pasi-de-dans.png' }}
//
//     />
// </View>
