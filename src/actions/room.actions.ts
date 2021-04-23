import { roomConstants } from "../reducers/roomReducer/room.constants";
import { roomServices } from "../services/room.services";
import { alertActions } from "./alert.actions";
import { paths } from "../utils/constants/paths";

type RoomType = {
    roomId: string,
    game: "tictactoe" | "chess",
    player: {
        uuid: string,
        nickname: string
    }
}

const createRoom = (formData: RoomType, history: any) => {
    const request = () => ({ type: roomConstants.CREATE_ROOM_REQUEST });
    const success = (payload: any) => ({ type: roomConstants.CREATE_ROOM_SUCCESS, payload });
    const failure = () => ({ type: roomConstants.CREATE_ROOM_FAILURE });

    return (dispatch: any) => {
        dispatch(request());
        roomServices.createRoom(formData)
            .then((data) => {
                dispatch(success({ roomId: formData.roomId }));
                switch (formData.game) {
                    case "tictactoe":
                        history.push(paths.TICTACTOE);
                        break;
                    case "chess":
                        history.push(paths.CHESS);
                        break;
                    default:
                }
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch(failure());
                dispatch(alertActions.error("Error, something went wrong"));
            })
    }
}

const joinToRoom = (formData: RoomType, history: any) => {
    const request = () => ({ type: roomConstants.JOIN_ROOM_REQUEST });
    const success = (payload: any) => ({ type: roomConstants.JOIN_ROOM_SUCCESS, payload });
    const failure = () => ({ type: roomConstants.JOIN_ROOM_FAILURE });

    return (dispatch: any) => {
        dispatch(request());
        roomServices.joinToRoom(formData)
            .then((response) => {
                dispatch(success({ roomId: formData.roomId }));
                switch (formData.game) {
                    case "tictactoe":
                        history.push(paths.TICTACTOE);
                        break;
                    case "chess":
                        history.push(paths.CHESS);
                        break;
                    default:
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(failure());
                history.push(paths.HOME)
                dispatch(alertActions.error("Error, something went wrong"));
            })
    }
}

const getRoom = (roomId: string, game: "tictactoe" | "chess", history: any) => {
    const request = () => ({ type: roomConstants.ROOM_REQUEST });
    const success = () => ({ type: roomConstants.ROOM_SUCCESS });
    const failure = () => ({ type: roomConstants.ROOM_FAILURE });

    return (dispatch: any) => {
        dispatch(request());
        roomServices.getRoom(roomId, game)
            .then((data) => {
                dispatch(success());
                const room = data.rooms;
                if (!room || room.players.length > 2) {
                    history.push(paths.HOME);
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(failure());
                dispatch(alertActions.error("Error, something went wrong"));
            })
    }
}

const waitUser = () => {
    return (dispatch: any) => {
        dispatch({ type: roomConstants.ROOM_WAIT_USER });
    }
}

const stopWaitingUser = () => {
    return (dispatch: any) => {
        dispatch({ type: roomConstants.ROOM_STOP_WAITING_USER });
    }
}

export const roomActions = {
    createRoom,
    getRoom,
    joinToRoom,
    waitUser,
    stopWaitingUser
}