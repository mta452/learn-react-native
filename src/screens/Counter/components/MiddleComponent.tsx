import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

interface MiddleComponentProps {
    style?: ViewStyle;
    isEven: boolean;
    count: number;
}

export const MiddleComponent: React.FC<MiddleComponentProps> = ({ style, isEven, count }) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.text}>{`Number is: 📊 ${isEven ? 'Even' : 'Odd'}`}</Text>
            <Text style={styles.text}>{`Operations: ${count}`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 48,
        paddingVertical: 16,
        borderRadius: 20,
        gap: 8
    },
    text: {
        fontSize: 20,
        fontWeight: 'semibold',
        color: '#444',
    }
});
