import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigation/Navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export const LoginScreen: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ScreenContent />
    </SafeAreaProvider>
  );
};

function ScreenContent() {
  const safeAreaInsets = useSafeAreaInsets();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<LoginScreenNavigationProp>();
  
  return (
    <View style={styles.container}>
      <View style={[styles.contentContainer, { paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom }]}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor={'#555'}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor={'#555'}
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <TouchableOpacity
          disabled={(email.length === 0 || password.length === 0)}
          onPress={() => {
            navigation.navigate('Main');
          }}
        >
          <View style={styles.submitContainer}>
            <Text style={styles.submitText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
        gap: 16
    },
    textInput: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        paddingHorizontal: 8
    },
    submitContainer: {
        padding: 12,
        backgroundColor: 'purple',
        borderRadius: 16
    },
    submitText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
});
