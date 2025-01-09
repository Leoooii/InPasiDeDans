import 'react-native-reanimated';
import {IconSymbol} from "@/components/ui/IconSymbol";
import React from "react";
import {Drawer} from "expo-router/drawer";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import CustomDrawerContent from "@/components/custom/CustomDrawer";

export default function RootLayout() {


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

                <Drawer drawerContent={CustomDrawerContent}  screenOptions={{
                    drawerHideStatusBarOnOpen: true,
                    drawerActiveBackgroundColor: "white",
                    drawerActiveTintColor: "red",
                    drawerLabelStyle: { marginLeft: 10 },
                    drawerItemStyle:{ marginBottom:10 }
                }}>

                <Drawer.Screen name={'index'} options={{ drawerIcon:({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,title:'Acasa', headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTintColor: 'darkblue',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }, }} />
                    <Drawer.Screen name={'dancers'} options={{ drawerIcon:({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,title:'Dansatori',headerStyle: {
                            backgroundColor: '#fff',
                        },
                        headerTintColor: 'darkblue',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }, }} />
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
