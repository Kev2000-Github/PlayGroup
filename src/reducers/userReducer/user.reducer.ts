import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { userConstants } from "./user.constants";
import { loadState } from "../../helpers/loadState";
type initialStateType = {
    user: string,
    uuid: string,
    profileURL: string
}

const initialState: initialStateType = loadState();

export const userReducer = createReducer(initialState, builder => {
    builder
        .addCase(userConstants.CREATE_USER, (state, action: PayloadAction<initialStateType>) => {
            state.user = action.payload.user;
            state.uuid = action.payload.uuid;
        })
        .addCase(userConstants.CHANGE_NAME, (state, action: PayloadAction<{ user: string }>) => {
            state.user = action.payload.user;
        })
        .addCase(userConstants.CHANGE_PIC, (state, action: PayloadAction<{ url: string }>) => {
            state.profileURL = action.payload.url;
        })
})