import { rootReducer } from "./reducers/root.reducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.REACT_APP_NODE_ENV === "development"
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>