import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { authStore } from '../authStore';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";  // Importă store-ul

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            authStore.setState({ user: userCredential.user });  // Actualizează starea direct
            console.log('User created:', userCredential.user.email);
            alert(userCredential.user.email);
            router.push('/(admin)')
        } catch (error : any) {
            console.error(error.message);
            setError(error);
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className={'flex-1 justify-between p-5'}>
           <View className={'flex mb-5 rounded-3xl'}>
               <TextInput placeholder="Email" value={email} onChangeText={setEmail} className={'bg-white'}/>
               <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} className={'bg-white'}/>
               <Button title="Sign Up" onPress={handleSignup} />
               {error && <Text className={'text-red-800'}>Email-ul este deja folosit sau ati introdus o parola mai scurta de 6 caractere</Text>}
           </View>
                <Button title={'home'} onPress={()=>router.push('/')} />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
