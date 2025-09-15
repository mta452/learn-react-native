import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../redux/Store';
import { setFirstName, setLastName, setDescription, setYearsOfExperience } from '../../redux/UserSlice';

export const SettingsScreen: React.FC = () => {
    const safeAreaInsets = useSafeAreaInsets();
    const dimensions = useWindowDimensions();

    const counter = useAppSelector((state) => state.counter.value);
    const firstName = useAppSelector((state) => state.user.firstName);
    const lastName = useAppSelector((state) => state.user.lastName);
    const description = useAppSelector((state) => state.user.description);
    const yearsOfExperience = useAppSelector((state) => state.user.yearsOfExperience);
    
    const dispatch = useAppDispatch();
    
    return (
        <View style={[styles.container, { paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom }]}>
            <View style={styles.titleContainer}>
                <Text style={styles.screenTitle}>Settings Screen</Text>
                <Text style={styles.screenTitle}>{counter}</Text>
            </View>

            <ScrollView contentContainerStyle={[styles.inputContainer]}>    
                <TextInput
                    style={[styles.textInput, { width: dimensions.width - 32 }]}
                    placeholder="First Name"
                    placeholderTextColor={'#555'}
                    value={firstName}
                    onChangeText={(text) => {
                        dispatch(setFirstName(text));
                    }}
                />
                <TextInput
                    style={[styles.textInput, { width: dimensions.width - 32 }]}
                    placeholder="Last Name"
                    placeholderTextColor={'#555'}
                    value={lastName}
                    onChangeText={(text) => {
                        dispatch(setLastName(text));
                    }}
                />
                <TextInput
                    style={[styles.textInput, { width: dimensions.width - 32 }]}
                    placeholder="Description"
                    placeholderTextColor={'#555'}
                    value={description}
                    onChangeText={(text) => {
                        dispatch(setDescription(text));
                    }}
                />
                <TextInput
                    style={[styles.textInput, { width: dimensions.width - 32 }]}
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
    titleContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8
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
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        paddingHorizontal: 8
    },
});
