import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApiClient, authenticateUser, getAuthUser, User } from "../../api/authApi";
import { getAccessToken, setAccessToken, setRefreshToken } from "../../persistence/session";

interface LoginUserParams {
  username: string;
  password: string;
}

const setupToken = (token: string) => {
    authApiClient.interceptors.request.use((config) => {
        config.headers.set('Authorization', `Bearer ${token}`);
        return config;
    });
}

export const checkUser = createAsyncThunk<User, void>(
  'user/check',
  async (params, { rejectWithValue }) => {
    try {
      const accessToken = await getAccessToken();

      if (accessToken.length === 0) {
        return rejectWithValue(false);
      }

      setupToken(accessToken);

      return await getAuthUser();
    } catch (error: any) {
      return rejectWithValue(false);
    }
  }
)

export const loginUser = createAsyncThunk<
  User,
  LoginUserParams
>(
  'user/login',
  async (params, { rejectWithValue }) => {
    try {
      const authResponse = await authenticateUser(
        params.username,
        params.password
      );

      await setAccessToken(authResponse.accessToken);
      await setRefreshToken(authResponse.refreshToken);

      setupToken(authResponse.accessToken);

      return await getAuthUser();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
