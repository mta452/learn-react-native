import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/auth';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const authApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authenticateUser = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  const response = await authApiClient.post<AuthResponse>('/login', {
    username: username,
    password: password
  });

  return response.data;
}

export const getAuthUser = async (): Promise<User> => {
  const response = await authApiClient.get<User>('/me');
  return response.data;
}

export const refreshAuthSession = async (
  refreshToken: string
): Promise<AuthResponse> => {
  const response = await authApiClient.post<AuthResponse>('/refresh', {
    body: {
      refreshToken
    }
  });

  return response.data;
}
