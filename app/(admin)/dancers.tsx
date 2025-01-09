import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from "@/app/firebase";
import { collection, getDocs } from "@firebase/firestore";

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
                        <Text style={styles.userText}>Name: {item.displayName}</Text>
                        <Text style={styles.userText}>Email: {item.email}</Text>
                        <Text style={styles.userText}>Role: {item.role}</Text>
                        <Text style={styles.userText}>Subscription: {item.subscriptionStatus}</Text>
                    </View>
                )}
            />
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
        backgroundColor:'white'
    },
    userText: {
        fontSize: 16,
    },
});
