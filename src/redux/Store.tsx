import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { counterSlice } from "./CounterSlice";
import { userSlice } from "./UserSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    user: userSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
