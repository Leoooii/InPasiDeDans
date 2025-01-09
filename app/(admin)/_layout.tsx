import 'react-native-reanimated';
import {IconSymbol} from "@/components/ui/IconSymbol";
import React from "react";
import {Drawer} from "expo-router/drawer";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import CustomDrawerContent from "@/components/custom/CustomDrawer";
import {AntDesign, FontAwesome} from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function RootLayout() {


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

                <Drawer drawerContent={CustomDrawerContent}  screenOptions={{
                    drawerHideStatusBarOnOpen: true,
                    drawerActiveBackgroundColor: "white",
                    drawerActiveTintColor: "red",
                    drawerLabelStyle: { marginLeft: 10 },
                    drawerItemStyle:{ marginBottom:10 },
                    drawerType:'slide'
                }}>

                <Drawer.Screen name={'index'} options={{ drawerIcon:({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,title:'Acasa', headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTintColor: 'darkblue',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }, }} />
                    <Drawer.Screen name={'dancers'} options={{ drawerIcon:({ color }) => <FontAwesome name="user" size={28} color={color} />,title:'Dansatori',headerStyle: {
                            backgroundColor: '#fff',
                        },
                        headerTintColor: 'darkblue',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }, }} />
                    <Drawer.Screen name={'classes'} options={{ drawerIcon:({ color }) => <FontAwesome name="users" size={28} color={color} />,title:'Grupe',headerStyle: {
                            backgroundColor: '#fff',
                        },
                        headerTintColor: 'darkblue',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }, }} />
                    <Drawer.Screen name={'subscriptions'} options={{ drawerIcon:({ color }) => <MaterialIcons name="subscriptions" size={24} color={color} />,title:'Abonamente',headerStyle: {
                            backgroundColor: '#fff',
                        },
                        headerTintColor: 'darkblue',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }, }} />
                    <Drawer.Screen name={'[email]'} options={{
                        drawerItemStyle: { display: 'none' },
                        headerTitle:'Dansator'
                    }}/>
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
