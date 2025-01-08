import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { router } from 'expo-router';

export default function Index() {
    useEffect(() => {
        // Așteaptă ca aplicația să se monteze complet înainte de a naviga
        setTimeout(() => {
            router.push('/(tabs)');
        }, 0);
    }, []);

    return (
        <View>
            <Text>Index</Text>
        </View>
    );
}
