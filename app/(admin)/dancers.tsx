import {StyleSheet, Text, View, FlatList, Button} from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import {AntDesign, Feather, FontAwesome} from "@expo/vector-icons";
import {Link} from "expo-router";

export default function Dancers() {
    const [users, setUsers] = useState([]); // State pentru utilizatori

    const getUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            const userList : any = []; // Listă temporară pentru stocarea utilizatorilor
            querySnapshot.forEach((doc) => {
                userList.push({ id: doc.id, ...doc.data() }); // Adaugă fiecare utilizator în listă
            });
            setUsers(userList); // Setează utilizatorii în state
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUsers();
    }, []); // Adaugă un array gol pentru a apela o singură dată la montare

    return (
        <View style={styles.container} className={'bg-blue-950'}>

            <FlatList
                data={users}
                keyExtractor={(item : any) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.userContainer}>
                        <Link href={{pathname:'/(admin)/[email]',params: { email: item.email }}} className={'flex gap-5'}>
                            <Text style={styles.userText} >{item.displayName}</Text>
                            {item.verified ? <AntDesign name="checkcircle" size={20} color="lightgreen" />: <AntDesign name="questioncircle" size={24} color="yellow" />}
                        </Link>
                        {item.subscriptionStatus === 'free' &&
                            <View className={'flex flex-row gap-10'}>
                                {/*<Text style={styles.userText}>Abonament neplatit</Text>*/}
                                <Feather name="x-circle" size={24} color="red" />
                            </View>
                        }
                    </View>
                )}
            />
            <Button title={'Refresh'} onPress={getUsers}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,

    },

    userContainer: {
        marginBottom: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor:'white',
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    userText: {
        fontSize: 16,
        marginRight:10,

    },
});
