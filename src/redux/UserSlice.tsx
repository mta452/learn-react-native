import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkUser, loginUser } from "./actions/userActions";

interface UserState {
    loading: boolean;
    hasUser: boolean;
    error: string;
    firstName: string;
    lastName: string;
    description: string;
    yearsOfExperience: number;
}

const initialState: UserState = {
    loading: false,
    hasUser: false,
    error: '',
    firstName: 'John',
    lastName: 'Developer',
    description: 'iOS Developer transitioning to React Native',
    yearsOfExperience: 6
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setYearsOfExperience: (state, action: PayloadAction<number>) => {
            state.yearsOfExperience = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Check user
            .addCase(checkUser.pending, (state) => {
                state.loading = true;
                state.hasUser = false;
            })
            .addCase(checkUser.fulfilled, (state, action) => {
                state.loading = false;
                state.hasUser = true;
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
            })
            .addCase(checkUser.rejected, (state, _) => {
                state.loading = false;
                state.hasUser = false;
            })

            // Login user
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.hasUser = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.hasUser = true;
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.hasUser = false;
                state.error = action.payload?.toString() || 'Please check your credentials and try again.';
            })
    },
});

export const { setFirstName, setLastName, setDescription, setYearsOfExperience } = userSlice.actions;

export default userSlice.reducer;
