import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface OperationsProps {
    style?: ViewStyle;
    onMinus?: () => void;
    onPlus?: () => void;
}

export const Operations: React.FC<OperationsProps> = ({ style, onMinus, onPlus }) => {
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={onMinus}>
                <View style={[styles.button, { backgroundColor: 'red' }]}>
                    <Text style={styles.text}>−</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ marginLeft: 16 }}
                onPress={onPlus}
            >
                <View style={[styles.button, { backgroundColor: 'green' }]}>
                    <Text style={styles.text}>➕</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        borderRadius: 16,
        paddingHorizontal: 24,
        paddingVertical: 16,
        width: 84
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#444',
    }
});
