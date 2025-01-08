import { useRouter } from "expo-router";
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from "@react-navigation/drawer";
import {Button, Image, Pressable, Text, View} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import firebase from "firebase/compat";
import Auth = firebase.auth.Auth;
import {signOut} from "@firebase/auth";
import {auth} from "@/app/firebase";

export default function CustomDrawerContent(props: any) {
    const router = useRouter();
    const { top, bottom } = useSafeAreaInsets();

    return (
        <View style={{ flex: 1,backgroundColor:'orange' }}>
            <View className={'bg-blue-950 flex flex-col justify-center align-middle w-full'} style={{paddingTop:20+top }}>
                <Image
                    source={require("../../assets/images/logo3.png")}
                    resizeMode={"cover"}
                    style={{margin:'auto',marginBottom:20}}
                />
            </View>
            <DrawerContentScrollView
                {...props}
            >
                    <DrawerItemList  {...props} />
            </DrawerContentScrollView>

            <View
                style={{
                    borderTopColor: "#dde3fe",
                    borderTopWidth: 1,
                    paddingBottom:bottom,

                }}
                // className={'bg-blue-950 pl-20 pt-10'}
            >

                <Button title={'Delogare'} color={'darkblue'} onPress={() => {
                    signOut(auth);
                    alert('delogare reusita');
                    console.log('delogare')
                    router.push("/(tabs)")

                }}/>
                {/*<Pressable onPress={() => {*/}
                {/*    signOut(auth);*/}
                {/*    alert('delogare reusita');*/}
                {/*    console.log('delogare')*/}
                {/*    router.push("/(tabs)")*/}
                {/*}}><Text className={'text-white text-xl'}>Delogare</Text></Pressable>*/}
            </View>
        </View>
    );
}
