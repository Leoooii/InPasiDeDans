import React, { useState } from 'react';
import {View, Text, Button, ImageBackground,StyleSheet} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';  // Corectarea importului
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
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
// <Text className={'text-white'}>Hei </Text>
// <Button title={'apasa'} onPress={() => {router.push('/explore')}}/>
// <Button title={'apasa'} onPress={() => {router.push('/(auth)')}}/>
//         </SafeAreaView>
//     );
// };
const IndexScreen=()=>{
    const image = {uri: 'https://www.inpasidedans.ro/wp-content/uploads/2016/07/logo-in-pasi-de-dans.png'};

    return  <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['left', 'right']} className={'p-10'}>
            <ImageBackground source={image} resizeMode="contain" style={styles.image} className={'p-10'}>
                <Text style={styles.text}>Bine ati venit!</Text>
               <View className={'flex flex-row gap-2 justify-center'} >
                   <Button title={'Signup'} onPress={()=>{router.push('/signup')}} color={'red'}/>
                   <Button title={'Signin'} onPress={()=>{router.push('/signin')}} color={'orange'}/>

               </View>
            </ImageBackground>
        </SafeAreaView>
    </SafeAreaProvider>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
           },
    image: {
        flex: 1,
        justifyContent: 'space-around',
        // backgroundColor:'blue'
    },
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        // backgroundColor: '#000000c0',
    },
});

export default IndexScreen;  // Exportă componenta corect
