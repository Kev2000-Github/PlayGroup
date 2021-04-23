import React from 'react';
import { useHistory } from "react-router-dom";
import { PlayerCard } from "../../components/PlayerCard/PlayerCard";
import tictactoeStyle from "./tictactoe.module.scss";
import { SymbolX } from '../../components/SVG/Tictactoe/SymbolX';
import { SymbolO } from '../../components/SVG/Tictactoe/SymbolO';
import { SymbolBlank } from '../../components/SVG/Tictactoe/SymbolBlank';
import { Button } from '@material-ui/core';
import { Popup } from "../../components/Popup/Popup";
import { tictactoeSocket } from '../../../socket';
import { Card } from '../../components/Card/Card';
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks';
import { paths } from '../../../utils/constants/paths';
import { roomActions } from '../../../actions/room.actions';
const { useEffect, useState, useRef } = React;

const WIN = "You Win!";
const LOSE = "You Lose";
const DRAW = "Draw";

const determineSymbol = (item: number) => {
    if (item === -10 || item === -1) {
        return <SymbolX classname={`${tictactoeStyle.symbolPlayed}`} />;
    }
    else if (item === 10 || item === 1) {
        return <SymbolO classname={`${tictactoeStyle.symbolPlayed}`} />;
    }
    else {
        return <SymbolBlank classname={`${tictactoeStyle.symbolPlayed}`} />;
    }
}

type playerInfo = {
    uuid: string,
    profilePhoto: string,
    nickname: string
}
const initialRivalInfo = {
    uuid: "",
    profilePhoto: "",
    nickname: ""
}
const matrixInitialState = Array(9).fill(0);

export const Tictactoe = () => {
    const [matrix, setMatrix] = useState(matrixInitialState);
    const [player, setPlayer] = useState(0);
    const [rivalInfo, setRivalInfo] = useState<playerInfo>(initialRivalInfo);
    const [disabled, setDisabled] = useState(false);
    const [retryBtn, setRetryBtn] = useState(false);
    const [conclusion, setConclusion] = useState("");
    const history = useHistory();
    const textAreaRef = useRef(null);
    const userState = useAppSelector(state => state.userReducer);
    const roomState = useAppSelector(state => state.roomReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (userState.uuid === "") history.push(paths.HOME);
            const user = {
                uuid: userState.uuid,
                nickname: userState.user,
                profilePhoto: userState.profileURL
            }
            tictactoeSocket.emit("join", { roomId: roomState.roomId, user }, (data: any) => {
                if (data.split(",")[0] === "Error") history.push(paths.HOME);
                if (data === "-1") dispatch(roomActions.waitUser());
                setDisabled(true);
                setPlayer(parseInt(data));
            })
            tictactoeSocket.on("send_rival_info", ({ uuid, nickname, profilePhoto }) => {
                setRivalInfo({ uuid, nickname, profilePhoto });
            })
            tictactoeSocket.on("playerTwo_joined", ({ uuid, nickname, profilePhoto }) => {
                if (userState.uuid === uuid) return;
                setRivalInfo({ uuid, nickname, profilePhoto });
                setDisabled(false);
                dispatch(roomActions.stopWaitingUser());
                tictactoeSocket.emit("send_rival_info", { roomId: roomState.roomId, user });
            })
            tictactoeSocket.on("set_play", ({ grid, unlockUserId }) => {
                setMatrix([...grid]);
                if (unlockUserId !== user.uuid) setDisabled(false);
            })
            tictactoeSocket.on("conclusion", (msg) => {
                setDisabled(true);
                setConclusion(msg);
            })
            tictactoeSocket.on("leave", () => {
                toast("The other player has left the game");
            })
            tictactoeSocket.on("retry", ({ uuid }) => {
                setMatrix(matrixInitialState);
                setConclusion("");
                setRetryBtn(false);

                if (uuid === userState.uuid) setDisabled(false);
            })
            tictactoeSocket.on("player disconnected", () => {
                toast("The other player has disconnected");
                setDisabled(true);
            })
        }
        return () => { isMounted = false };
    }, [])

    const handleClick = (e: any) => {
        const position = e.target.classList[0].split("-")[1];
        const playerId = userState.uuid;
        tictactoeSocket.emit("set_play", { play: parseInt(position), roomId: roomState.roomId, playerId }, (response: any) => {
            setDisabled(true);
            if (!response) return;
            if (response.split(",")[0] === "Error") alert("Error something went wrong");
            setConclusion(response);
        })
    }

    const handleClipboard = (e: any) => {
        //@ts-ignore
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
    }

    const leave = () => {
        tictactoeSocket.emit("leave", { roomId: roomState.roomId, uuid: userState.uuid });
        history.push(paths.HOME);
    }

    const retry = () => {
        const playerId = userState.uuid;
        tictactoeSocket.emit("retry", { roomId: roomState.roomId, playerId }, (data: string) => {
            if (data === "retry registered") setRetryBtn(true);
        });
    }

    return (
        <>
            {roomState.requesting ?
                "loading..."
                :
                <div className={`${tictactoeStyle.main}`}>
                    <PlayerCard
                        player={player === -1 ? 1 : 2}
                        name={userState.user}
                        profilePhoto={userState.profileURL}
                        turn={disabled}
                        Symbol={player === -1 ? SymbolX : SymbolO}
                        classname={`${tictactoeStyle.playerCard}`} />
                    <Card classname={`${tictactoeStyle.card} ${roomState.waitingUser ? "" : tictactoeStyle.started}`}>
                        <div className={`${tictactoeStyle.playgrid} ${disabled ? tictactoeStyle.disabled : ""} ${roomState.waitingUser ? tictactoeStyle.disabled : ""}`}>
                            {matrix.map((item, idx) => {
                                const display: string | JSX.Element = determineSymbol(item);
                                return (<div
                                    key={`key-${idx}`}
                                    className={`item-${idx} ${/10|-10/.test(item) ? tictactoeStyle.winner : ""} ${item !== 0 ? tictactoeStyle.disabled : ""}`}
                                    onClick={handleClick} >
                                    {display}
                                </div>)
                            })}
                        </div>
                    </Card>
                    <PlayerCard
                        player={player === -1 ? 2 : 1}
                        name={rivalInfo.nickname}
                        profilePhoto={rivalInfo.profilePhoto}
                        turn={!disabled}
                        Symbol={player === -1 ? SymbolO : SymbolX}
                        classname={`${tictactoeStyle.playerCard}`} />

                    <Popup condition={[WIN, LOSE, DRAW].includes(conclusion)}>
                        <div className={tictactoeStyle.content}>
                            <h4>{conclusion.toUpperCase()}</h4>
                            {retryBtn ?
                                <span>wait for the other player...</span>
                                :
                                ""
                            }
                            <Button disabled={retryBtn} variant="contained" color="secondary" onClick={retry} >retry</Button>
                            <Button variant="contained" color="secondary" onClick={leave}>leave</Button>
                        </div>
                    </Popup>

                    <Popup condition={roomState.waitingUser}>
                        <div className={tictactoeStyle.content}>
                            <span>Invite a friend to play with you!</span>
                            <input
                                className={tictactoeStyle.invitationLink}
                                ref={textAreaRef}
                                type="text"
                                value={`${process.env.REACT_APP_BASE_URL}/TicTacToe/${roomState.roomId}`}
                                readOnly />
                            <Button variant="contained" color="primary" onClick={handleClipboard} >copy to Clipboard</Button>
                        </div>
                    </Popup>
                </div>
            }
        </>
    )
}