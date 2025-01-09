import {View, Text, TextInput, Button, FlatList} from 'react-native'
import React, {useEffect, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {Label} from "@react-navigation/elements";
import {addDoc, collection, getDocs} from "@firebase/firestore";
import {db} from "@/app/firebase";
import {set} from "@firebase/database";
import {Feather} from "@expo/vector-icons";

export default function Subscriptions() {
    const [newName,setNewName]=useState('');
    const [number, setNumber]=useState('');
    const [subscriptions,setSubscriptions]=useState([]);

    const addNewSubscription=async()=>{
        try {
            const subscriptionData={
                name:newName,
                availability:number,
            }
            const subscription = await addDoc(collection(db, "subscriptions"), subscriptionData);
            console.log(subscription);
        }catch(e){
            console.log(e)
        }finally{
            setNewName('');
            setNumber('');
        }
    }
    const getSubscriptions = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "subscriptions"));
            const subscriptionList : any = [];
            querySnapshot.forEach((doc) => {
                subscriptionList.push({ id: doc.id, ...doc.data() });
            });
            setSubscriptions(subscriptionList); // Setează utilizatorii în state

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(()=>{
        getSubscriptions();
    },[])

    return (
        <SafeAreaView className="bg-blue-950 flex-1 flex flex-col  p-5">
            <FlatList
                data={subscriptions}
                keyExtractor={(item : any) => item.id}
                renderItem={({ item }) => (
                    <View style={{backgroundColor:'orange', padding:5, borderRadius:10,display:'flex'}}>
                        <Text className={'text-white'}>{item.name}</Text>
                        <Text className={'text-white'}>{item.availability} sedinte</Text>
                    </View>
                )}
            />
            <View className="flex gap-5 ">
                <Label >Nume abonament</Label>
                <TextInput placeholder={'Abonement 1'} className={'bg-white rounded-2xl'} value={newName} onChangeText={setNewName} />
                <TextInput placeholder={'8'}  className={'bg-white rounded-2xl'} keyboardType={'numeric'} value={number} onChangeText={setNumber} />
                <Button title={'Adauga abonament'} disabled={newName.length === 0 || number.length === 0} onPress={addNewSubscription}/>
            </View>
        </SafeAreaView>
    )
}
