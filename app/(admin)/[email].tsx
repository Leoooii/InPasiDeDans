import {router, useLocalSearchParams} from 'expo-router';
import {collection, deleteDoc, doc, getDoc, query, updateDoc, where} from 'firebase/firestore';
import { db } from '@/app/firebase';
import {View, Text, Button, Switch} from "react-native";
import {getDocs} from "@firebase/firestore";
import React, {useEffect, useState} from "react";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;
import {SafeAreaView} from "react-native-safe-area-context";
import {AntDesign, FontAwesome5, Ionicons} from "@expo/vector-icons";

export default function Profile() {
    const { email } = useLocalSearchParams();
    const [userData, setUserData] = useState<DocumentData | null>(null);
    const [createdAt,setCreatedAt] = useState('');
    const [id,setId]=useState('')

    const fetchUser = async () => {
        try {
            console.log('Fetching user...');
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                setId(userDoc.id)
                const user=userDoc.data()
                setUserData(user)
                const createdAt = new Date(user.createdAt.seconds * 1000);
                 setCreatedAt(createdAt.toLocaleString());
            } else {
                console.log('No user found with that email.');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };
    const updateUser = async () => {
        try {
            console.log('Updating user...');
            const userRef = doc(db, "users", id); // accesezi documentul utilizatorului
            await updateDoc(userRef, {verified:true}); // actualizezi câmpurile dorite
            console.log('User updated successfully!');
            fetchUser()
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    const deleteUser = async () => {
        try {
            console.log('Deleting user...');
            const userRef = doc(db, "users", id); // accesezi documentul utilizatorului
            await deleteDoc(userRef); // ștergi documentul
            console.log('User deleted successfully!');
            router.back()
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        if (email) fetchUser();
    }, [email]);

    return (
        <SafeAreaView className={'flex-1 '} style={{ paddingTop: 0,backgroundColor:'orange' }}>
            <View className={'flex-row justify-between w-full border-2 border-white'} style={{paddingTop: 0,padding:30}}>
               <View className={'flex flex-row'}>
                   <Text className={'text-white text-4xl'} style={{fontSize:45}}>{userData?.displayName}</Text>
                   {userData?.verified ? <AntDesign name="checkcircle" size={24} color="lightgreen" /> : <AntDesign name="questioncircle" size={24} color="yellow" />}
               </View>
                {userData?.sex==='Femeie' ? <Ionicons name="woman" size={60} color="red" /> : <FontAwesome5 name="male" size={60} color="blue" />}
            </View>

            <View className={'bg-blue-950 flex-1 p-5'}>
                <Text className={'text-white'}>Adresa de email:{email}</Text>
                <Text className={'text-white'}>Cont creat la data de {createdAt}</Text>

                <Text className={'text-white'}>Abonament: {userData?.subscriptionStatus}</Text>
                {/*<Switch*/}
                {/*    trackColor={{false: '#767577', true: '#81b0ff'}}*/}
                {/*    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}*/}
                {/*    ios_backgroundColor="#3e3e3e"*/}
                {/*    onValueChange={toggleSwitch}*/}
                {/*    value={isEnabled}*/}
                {/*/>*/}
            </View>
            <View>
                <Text className={'text-white p-5 text-center'}>{userData?.verified ? 'Cont' +
                    ' verificat' : 'Cont neverificat'}</Text>
                <Button title={'Editeaza'} color={'green'} onPress={updateUser}/>
                <Button title={'Sterge'} color={'red'} onPress={deleteUser}/>
            </View>
        </SafeAreaView>
    );
}
