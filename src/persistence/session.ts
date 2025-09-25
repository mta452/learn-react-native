import AsyncStorage from "@react-native-async-storage/async-storage"

const KEY_ACCESS_TOKEN = 'AccessToken';
const KEY_REFRESH_TOKEN = 'RefreshToken';

export const getAccessToken = async (): Promise<string> => {
    try {
        return await AsyncStorage.getItem(KEY_ACCESS_TOKEN) || '';
    } catch(e) {
        return '';
    }
}

export const setAccessToken = async (value: string) => {
  try {
    await AsyncStorage.setItem(KEY_ACCESS_TOKEN, value);
  } catch(e) {
    // ignore
  }
}

export const getRefreshToken = async (): Promise<string> => {
    try {
        return await AsyncStorage.getItem(KEY_REFRESH_TOKEN) || '';
    } catch(e) {
        return '';
    }
}

export const setRefreshToken = async (value: string) => {
  try {
    await AsyncStorage.setItem(KEY_REFRESH_TOKEN, value);
  } catch(e) {
    // ignore
  }
}
