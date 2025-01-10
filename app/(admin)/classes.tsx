import {View, Text, TextInput, Button, FlatList} from 'react-native'
import React, {useEffect, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {Label} from "@react-navigation/elements";
import {addDoc, collection, getDocs} from "@firebase/firestore";
import {db} from "../firebase";


export default function Classes() {
    const [name,setName]=useState('');
    const [desciption,setDesciption]=useState('');

    const [classes,setClasses]=useState([]);

    const addNewClass=async()=>{
        try {
            const classData={
                createdAt:new Date(),

                name:name,

            }
            const newClass = await addDoc(collection(db, "classes"), classData);
            console.log(newClass);
        }catch(e){
            console.log(e)
        }finally{
            setName('');

        }
    }
    const getClasses = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "classes"));
            const classList : any = [];
            querySnapshot.forEach((doc) => {
                classList.push({ id: doc.id, ...doc.data() });
            });
            setClasses(classList); // Setează utilizatorii în state

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(()=>{
        getClasses();
    },[])

    return (
        <SafeAreaView className="bg-blue-950 flex-1 flex flex-col  p-5">
            <FlatList
                data={classes}
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
                {/*<TextInput placeholder={'Abonement 1'} className={'bg-white rounded-2xl'} value={newName} onChangeText={setNewName} />*/}
                {/*<TextInput placeholder={'8'}  className={'bg-white rounded-2xl'} keyboardType={'numeric'} value={number} onChangeText={setNumber} />*/}
                {/*<Button title={'Adauga abonament'} disabled={newName.length === 0 || number.length === 0} onPress={addNewClass}/>*/}
            </View>
        </SafeAreaView>
    )
}
