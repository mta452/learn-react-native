import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const SettingsScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Settings Screen</Text>
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
    }
});
