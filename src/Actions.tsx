import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface ActionsProps {
    style?: ViewStyle;
    onReset?: () => void;
    onRandom?: () => void;
}

export const Actions: React.FC<ActionsProps> = ({ style, onReset, onRandom }) => {
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={onReset}>
                <View style={[styles.button, { backgroundColor: 'blue' }]}>
                    <Text style={styles.text}>Reset</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ marginLeft: 16 }}
                onPress={onRandom}
            >
                <View style={[styles.button, { backgroundColor: 'orange' }]}>
                    <Text style={styles.text}>Random</Text>
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
        width: 150
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    }
});
