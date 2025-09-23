import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigation/Navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { checkUser, loginUser } from '../../redux/actions/userActions';
import { useAppDispatch, useAppSelector } from '../../redux/Store';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export const LoginScreen: React.FC = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  
  const hasUser = useAppSelector((state) => state.user.hasUser);
  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  useEffect(() => {
    if (hasUser) {
      navigation.navigate('Main');
    }
  }, [hasUser])
  
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  if (loading || hasUser) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.contentContainer, { paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom }]}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor={'#555'}
          onChangeText={(text) => {
            setUsername(text);
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
          disabled={(username.length === 0 || password.length === 0)}
          onPress={() => {
            dispatch(loginUser({username, password}));
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
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
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
