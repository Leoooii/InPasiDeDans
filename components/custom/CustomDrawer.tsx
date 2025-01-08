import { useRouter } from "expo-router";
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from "@react-navigation/drawer";
import {Button, Image, Text, View} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import firebase from "firebase/compat";
import Auth = firebase.auth.Auth;
import {signOut} from "@firebase/auth";
import {auth} from "@/app/firebase";

export default function CustomDrawerContent(props: any) {
    const router = useRouter();
    const { top, bottom } = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, backgroundColor: "orange" }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: "white", paddingTop: top+20,paddingBottom: 20 }}
            >
                <View className={'w-full bg-white'}>
                    <Image
                        source={require("../../assets/images/logo2.png")}
                        resizeMode={"cover"}
                        className={'w-full bg-white'}
                    />
                </View>
                <View style={{ backgroundColor: "orange" }}>
                    <DrawerItemList {...props} />
                    {/*<DrawerItem label={"Logout"} onPress={() => {*/}
                    {/*    signOut(auth);*/}
                    {/*    alert('delogare reusita');*/}
                    {/*    console.log('delogare')*/}
                    {/*    router.push("/(tabs)")*/}
                    {/*}} />*/}
                </View>
            </DrawerContentScrollView>
            <View
                style={{
                    borderTopColor: "#dde3fe",
                    borderTopWidth: 1,
                    padding: 20,
                    paddingTop: 20 + bottom,
                }}
            >

                <Button title={'Delogare'} onPress={() => {
                    signOut(auth);
                    alert('delogare reusita');
                    console.log('delogare')
                    router.push("/(tabs)")
                }}/>
            </View>
        </View>
    );
}
