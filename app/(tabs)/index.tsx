import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';  // Corectarea importului
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../firebase';  // Importă auth din fișierul firebase.js
import '../../global.css'
import {StatusBar} from "expo-status-bar";
import {Link, router} from "expo-router";

// const IndexScreen = () => {
//     const [user, setUser] = useState<any>(null);
//     const [error, setError] = useState<string | null>(null);  // State pentru gestionarea erorilor
//
//     const signup = () => {
//         createUserWithEmailAndPassword(auth, 'test2@gmail.com', 'testtest')
//             .then((userCredential) => {
//                 // Dacă userul este creat cu succes
//                 const newUser = userCredential.user;
//                 setUser(newUser);  // Actualizează starea cu userul creat
//                 setError(null);  // Resetază eroarea dacă nu există
//                 console.log('User created successfully:', newUser);
//
//             })
//             .catch((error) => {
//                 // Dacă apare o eroare
//                 setUser(null);  // Resetează starea userului
//                 setError(error.message);  // Setează mesajul de eroare
//                 console.error('Error creating user:', error);
//             });
//     };
//
//     return (
//         <SafeAreaView>
//             <StatusBar backgroundColor={'red'}  />
//             <Text style={{ color: 'red' }} className={'bg-blue-300'}>hei</Text>
//             <Button onPress={signup} title="Apasa" />
//
//             {user ? (
//                 <Text style={{ color: 'green' }}>User created: {user.email}</Text>  // Afișează emailul userului creat
//             ) : (
//                 <Text style={{ color: 'red' }}>No user created</Text>  // Afișează un mesaj dacă nu există un user
//             )}
//
//             {error && (
//                 <Text style={{ color: 'red' }}>Error: {error}</Text>  // Afișează eroarea dacă există
//             )}
//         </SafeAreaView>
//     );
// };
const IndexScreen=()=>{
    return <SafeAreaView className={'bg-orange-200 flex-1 flex-col gap-2'}>
        <Text className={'text-white'}>Hei </Text>
        <Button title={'apasa'} onPress={() => {router.push('/explore')}}/>
        <Button title={'apasa'} onPress={() => {router.push('/(auth)')}}/>

    </SafeAreaView>
}

export default IndexScreen;  // Exportă componenta corect
