import { combineReducers } from "redux";
import { roomReducer } from "./roomReducer/room.reducer";
import { userReducer } from "./userReducer/user.reducer";
import { alertReducer } from "./alertReducer/alert.reducer";
export const rootReducer = combineReducers({
    roomReducer,
    userReducer,
    alertReducer
})