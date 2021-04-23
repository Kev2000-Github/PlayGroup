import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { alertConstants } from './alert.constants';

interface initialStateInterface {
    type: string | null,
    message: string | null | undefined,
}

const initialState: initialStateInterface = {
    type: null,
    message: null
};

export const alertReducer = createReducer(initialState, builder => {
    builder
        .addCase(alertConstants.SUCCESS, (state, action: PayloadAction<string>) => {
            state.type = "alert-success";
            state.message = action.payload;
        })
        .addCase(alertConstants.ERROR, (state, action: PayloadAction<string>) => {
            state.type = "alert-danger";
            state.message = action.payload;
        })
        .addCase(alertConstants.NOTIFICATION, (state, action: PayloadAction<string>) => {
            state.type = "alert-notification";
            state.message = action.payload;
        })
        .addCase(alertConstants.CLEAR, (state) => {
            state.type = null;
            state.message = null;
        })
})