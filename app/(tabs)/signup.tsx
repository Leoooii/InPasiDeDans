import {View, Text, TextInput, Button, Image} from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth, db } from '../firebase';
import { authStore } from '../authStore';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import {addDoc, collection, doc, setDoc} from "@firebase/firestore";  // Importă store-ul
import {Picker} from '@react-native-picker/picker';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [selectedSex, setSelectedSex] = useState();

    const handleSignup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const userData = {
                createdAt: new Date(),
                displayName: name,
                email: email,
                role: 'user',
                sex: "",  // Poți adăuga sex dacă este necesar
                subscriptionStatus: 'free',
                verified: false
            };
            await addDoc(collection(db, "users"), userData);
            authStore.setState({ user: userCredential.user });  // Actualizează starea direct
            console.log('User created:', userCredential.user.email);
            alert(userCredential.user.email);
            if(userCredential.user.email === 'a@a.com') {
                router.push('/(admin)')
            }
            router.push('/(user)');
        } catch (error : any) {
            console.error(error.message);
            setError(error);
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className={'flex-1 justify-center p-10 bg-blue-950'}>
           <View className={'flex mb-5 rounded-3xl gap-5'}>
               <Image
                   source={require("../../assets/images/logo3.png")}
                   resizeMode={"contain"}
                   className={'w-full '}
               />
               <TextInput placeholder="Nume" value={name} onChangeText={setName} className={'bg-white rounded-2xl'}/>
               <TextInput placeholder="Email" value={email} onChangeText={setEmail}  className={'bg-white rounded-2xl'} textContentType={'emailAddress'}/>
               <TextInput placeholder="Parola minim 5 caractere" value={password} secureTextEntry onChangeText={setPassword} className={'bg-white rounded-2xl'}/>
               <Picker
                   selectedValue={selectedSex}
                   onValueChange={(itemValue, itemIndex) =>
                       setSelectedSex(itemValue)
                   }
               style={{backgroundColor:'#fff',borderRadius:20}}>
                   <Picker.Item label="Femeie" value="Femeie" />
                   <Picker.Item label="Barbat" value="Barbat" />
               </Picker>

               <Button title="Creare cont" onPress={handleSignup} color={'orange'} disabled={name.length <3 || email.length <3 || password.length < 5}/>
               {error && <Text className={'text-red-800'}>Email-ul este deja folosit sau ati introdus o parola mai scurta de 6 caractere</Text>}
           </View>
                {/*<Button title={'home'} onPress={()=>router.push('/')} />*/}

            </SafeAreaView>
        </SafeAreaProvider>
    );
}
