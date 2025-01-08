import React, { useState } from 'react';
import {View, Text, TextInput, Button, Alert, Image} from 'react-native';
import {signInWithEmailAndPassword, User} from 'firebase/auth';
import { auth } from '../firebase';  // Asigură-te că importi corect
import { authStore } from '../authStore';
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";  // Importă store-ul creat

export default function SignIn() {
        const [email, setEmail] = useState('a@a.com');
        const [password, setPassword] = useState('aaaaaa');


        const handleSignIn = async () => {
                try {
                        const userCredential = await signInWithEmailAndPassword(auth, email, password);

                        // Actualizează user-ul în Zustand store
                        authStore.setState({ user: userCredential.user });

                        const currentUser = authStore.getState().user;  // Obține user-ul curent

                        console.log('Signed in user:', currentUser?.email);

                        Alert.alert('Success', `Welcome, ${currentUser?.email}`);
                        router.push('/(admin)');
                } catch (error: any) {
                        console.error('Error signing in:', error.message);
                        Alert.alert('Error', error.message);
                }
        };

        return (
            <SafeAreaView className={'flex-1 justify-center p-10 bg-blue-950'}>
               <View className={'flex gap-5'}>
                       <Image
                           source={require("../../assets/images/logo3.png")}
                           resizeMode={"contain"}
                           className={'w-full '}
                       />
                       <TextInput placeholder="Email" value={email} onChangeText={setEmail} className={'bg-white rounded-2xl'}/>
                       <TextInput
                           placeholder="Password"
                           value={password}
                           secureTextEntry
                           onChangeText={setPassword}
                           className={'bg-white rounded-2xl'}
                       />
                       <Button title="Intrati in cont" onPress={handleSignIn} color={'orange'}/>

               </View>
                    {/*<Button title={'home'} onPress={()=>router.push('/')} />*/}
            </SafeAreaView>
        );
}
