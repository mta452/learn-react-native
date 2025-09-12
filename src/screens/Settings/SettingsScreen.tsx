import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../redux/Store';
import { setFirstName, setLastName, setDescription, setYearsOfExperience } from '../../redux/UserSlice';

const { width } = Dimensions.get('window');

export const SettingsScreen: React.FC = () => {
    return (
        <SafeAreaProvider>
            <ScreenContent />
        </SafeAreaProvider>
    );
};

function ScreenContent() {
    const safeAreaInsets = useSafeAreaInsets();

    const firstName = useAppSelector((state) => state.user.firstName);
    const lastName = useAppSelector((state) => state.user.lastName);
    const description = useAppSelector((state) => state.user.description);
    const yearsOfExperience = useAppSelector((state) => state.user.yearsOfExperience);
    
    const dispatch = useAppDispatch();
    
    return (
        <View style={[styles.container, { paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom }]}>
            <Text style={styles.screenTitle}>Settings Screen</Text>

            <ScrollView contentContainerStyle={[styles.inputContainer]}>    
                <TextInput
                    style={styles.textInput}
                    placeholder="First Name"
                    placeholderTextColor={'#555'}
                    value={firstName}
                    onChangeText={(text) => {
                        dispatch(setFirstName(text));
                    }}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Last Name"
                    placeholderTextColor={'#555'}
                    value={lastName}
                    onChangeText={(text) => {
                        dispatch(setLastName(text));
                    }}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Description"
                    placeholderTextColor={'#555'}
                    value={description}
                    onChangeText={(text) => {
                        dispatch(setDescription(text));
                    }}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Years of Experience"
                    placeholderTextColor={'#555'}
                    value={yearsOfExperience.toString()}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        dispatch(setYearsOfExperience(Number(text)));
                    }}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 16,
        gap: 16
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        rowGap: 16
    },
    textInput: {
        width: width - 32,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        paddingHorizontal: 8
    },
});
