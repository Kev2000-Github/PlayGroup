const URL = process.env.REACT_APP_BACK_END;
const tictactoe = "tictactoe";
const chess = "chess";

export const endpoints = {
    tictactoe: {
        GET_ROOM: URL + `/${tictactoe}/rooms`,
        GET_ROOMS: URL + `/${tictactoe}/rooms`,
        CREATE_ROOM: URL + `/${tictactoe}/rooms`,
        ADD_PLAYER_TO_ROOM: URL + `/${tictactoe}/rooms`,
        REMOVE_ROOM: URL + `/${tictactoe}/rooms`
    },
    chess: {
        GET_ROOM: URL + `/${chess}/rooms`,
        GET_ROOMS: URL + `/${chess}/rooms`,
        CREATE_ROOM: URL + `/${chess}/rooms`,
        ADD_PLAYER_TO_ROOM: URL + `/${chess}/rooms`,
        REMOVE_ROOM: URL + `/${chess}/rooms`
    }

}