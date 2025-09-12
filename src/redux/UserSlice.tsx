import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    firstName: string;
    lastName: string;
    description: string;
    yearsOfExperience: number;
}

const initialState: UserState = {
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
    }
});

export const { setFirstName, setLastName, setDescription, setYearsOfExperience } = userSlice.actions;

export default userSlice.reducer;
