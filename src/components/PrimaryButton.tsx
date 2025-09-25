import React, { FC, ReactNode } from 'react'
import { ColorValue, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface PrimaryButtonProps {
    backgroundColor?: ColorValue;
    style?: StyleProp<ViewStyle>;
    title?: string;
    titleStyle?: StyleProp<TextStyle>;
    content?: ReactNode
    disabled?: boolean
    onPress: () => void;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({backgroundColor, style, title, titleStyle, content, disabled, onPress}) => {
    return (
        <TouchableOpacity
            style={[styles.button, style, backgroundColor && { backgroundColor: backgroundColor }]}
            disabled={disabled}
            onPress={onPress}
        >
            {content || 
                <Text style={[styles.buttonTitle, titleStyle]}>
                    {title}
                </Text>
            }
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonTitle: {
        color: '#fff',
        fontWeight: '600'
    }
});

export default PrimaryButton;
