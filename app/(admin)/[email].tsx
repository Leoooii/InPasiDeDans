import {router, useLocalSearchParams} from 'expo-router';
import {collection, deleteDoc, doc, query, updateDoc, where} from 'firebase/firestore';
import { db } from '@/app/firebase';
import {
    View,
    Text,
    Modal,
    Alert,
    Pressable,
    StyleSheet,
} from "react-native";
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
    const [id,setId]=useState('');
    const [modalVisible, setModalVisible] = useState(false);

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
            const userRef =doc(db, "users", id); // accesezi documentul utilizatorului
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
            <View className={'flex-row justify-between w-full '} style={{paddingTop: 0,padding:30}}>
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
            </View>
            {!userData?.verified && <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Editeaza</Text>
            </Pressable>}


            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Poti sa validezi sau sa stergi contul</Text>
                        <Text className={'text-white p-5 text-center'}>{userData?.verified ? 'Cont' +
                            ' verificat' : 'Cont neverificat'}</Text>
                        <View className={'w-full flex flex-row justify-between'} style={{padding:20 }}>
                            <Pressable style={{backgroundColor:'lightgreen', padding:5}}  onPress={updateUser}><Text>Editeaza</Text></Pressable>
                            <Pressable style={{backgroundColor:'red', padding:5}} onPress={deleteUser}><Text className={'text-white'}>Sterge</Text></Pressable>
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Inchide fereastra</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'orange'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width:500,

    },
    button: {

        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#2194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {

        textAlign: 'center',
    },
});

