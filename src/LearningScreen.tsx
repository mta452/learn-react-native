import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const LearningScreen: React.FC = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Learning Screen</Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <View style={styles.backContainer}>
                    <Text style={styles.backText}>Back</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        gap: 16
    },
    backContainer: {
        padding: 12,
        backgroundColor: 'green',
        borderRadius: 16
    },
    backText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
});
