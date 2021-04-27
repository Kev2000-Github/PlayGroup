import socketIOClient from "socket.io-client";
const URL = process.env.REACT_APP_BACK_END || "ws://localhost:3000";

export const tictactoeSocket = socketIOClient(URL + "/tictactoe", { transports: ["websocket"], upgrade: false });
export const chessSocket = socketIOClient(URL + "/chess", { transports: ["websocket"], upgrade: false });
