import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
    operations: number;
}

const initialState: CounterState = {
    value: 1,
    operations: 0
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment: (state) => {
            if (state.value < 100) {
                state.value += 1;
                state.operations += 1;
            }
        },
        decrement: (state) => {
            if (state.value > 1) {
                state.value -= 1;
                state.operations += 1;
            }
        },
        reset: (state) => {
            state.value = 1;
            state.operations = 0;
        },
        random: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
            state.operations += 1;
        }
    }
});

export const { increment, decrement, reset, random } = counterSlice.actions;

export default counterSlice.reducer;
