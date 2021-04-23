import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { roomConstants } from "./room.constants";

type initialStateType = {
    requesting: boolean,
    waitingUser: boolean,
    roomId: string
}

const initialState: initialStateType = {
    requesting: false,
    waitingUser: false,
    roomId: ""
}

export const roomReducer = createReducer(initialState, builder => {
    builder
        .addCase(roomConstants.ROOM_REQUEST, (state) => {
            state.requesting = true;
        })
        .addCase(roomConstants.ROOM_FAILURE, (state) => {
            state.requesting = false;
        })
        .addCase(roomConstants.ROOM_SUCCESS, (state) => {
            state.requesting = false;
        })
        .addCase(roomConstants.CREATE_ROOM_REQUEST, (state) => {
            state.requesting = true;
        })
        .addCase(roomConstants.CREATE_ROOM_SUCCESS, (state, action: PayloadAction<{ roomId: string }>) => {
            state.requesting = false;
            state.roomId = action.payload.roomId;
        })
        .addCase(roomConstants.CREATE_ROOM_FAILURE, (state) => {
            state.requesting = false;
        })
        .addCase(roomConstants.JOIN_ROOM_REQUEST, (state) => {
            state.requesting = true;
        })
        .addCase(roomConstants.JOIN_ROOM_SUCCESS, (state, action: PayloadAction<{ roomId: string }>) => {
            state.requesting = false;
            state.roomId = action.payload.roomId;
        })
        .addCase(roomConstants.JOIN_ROOM_FAILURE, (state) => {
            state.requesting = false;
        })
        .addCase(roomConstants.ROOM_WAIT_USER, (state) => {
            state.waitingUser = true;
        })
        .addCase(roomConstants.ROOM_STOP_WAITING_USER, (state) => {
            state.waitingUser = false;
        })
})