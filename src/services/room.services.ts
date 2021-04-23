import axios from "axios";
import { endpoints } from "../utils/constants/endpoints";

type RoomType = {
    roomId: string,
    game: "tictactoe" | "chess",
    player: {
        uuid: string,
        nickname: string
    }
}

const createRoom = async (formData: RoomType) => {
    let response: any = null;
    switch (formData.game) {
        case "tictactoe":
            response = await axios.post(endpoints.tictactoe.CREATE_ROOM, formData);
            if (response) return response.data;
            break;
        case "chess":
            response = await axios.post(endpoints.chess.CREATE_ROOM, formData);
            if (response) return response.data;
            break;
    }
}

const joinToRoom = async (formData: RoomType) => {
    let response: any = null;
    switch (formData.game) {
        case "tictactoe":
            response = await axios.put(endpoints.tictactoe.ADD_PLAYER_TO_ROOM, formData);
            if (response) return response.data;
            break;
        case "chess":
            response = await axios.put(endpoints.chess.ADD_PLAYER_TO_ROOM, formData);
            if (response) return response.data;
            break;
    }
}

const getRoom = async (roomId: string, game: "tictactoe" | "chess") => {
    let response: any = null;
    switch (game) {
        case "tictactoe":
            response = await axios.get(endpoints.tictactoe.GET_ROOM + "/" + roomId);
            if (response) return response.data;
            break;
        case "chess":
            response = await axios.get(endpoints.chess.GET_ROOM + "/" + roomId);
            if (response) return response.data;
            break;
    }
}

export const roomServices = {
    createRoom,
    getRoom,
    joinToRoom
}