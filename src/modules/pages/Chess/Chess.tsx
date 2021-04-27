import React from 'react';
import { useHistory } from "react-router-dom";
import { PlayerCard } from "../../components/PlayerCard/PlayerCard";
import chessStyle from "./chess.module.scss";
import { Button } from '@material-ui/core';
import { Popup } from "../../components/Popup/Popup";
import { chessSocket } from '../../../socket';
import { Card } from '../../components/Card/Card';
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks';
import { Bishop } from "../../components/SVG/Chess/Bishop";
import { King } from "../../components/SVG/Chess/King";
import { Knight } from "../../components/SVG/Chess/Knight";
import { Queen } from "../../components/SVG/Chess/Queen";
import { Pawn } from "../../components/SVG/Chess/Pawn";
import { Rook } from "../../components/SVG/Chess/Rook";
import { paths } from '../../../utils/constants/paths';
import { SymbolBlank } from '../../components/SVG/Tictactoe/SymbolBlank';
import { roomActions } from '../../../actions/room.actions';
import { displayMoves, WIN, LOSE, DRAW, setupChessBoard, setupChessBoardColors, move, checkAvailablePromotion } from "./Chess.utils";
import { ButtonSVG, ButtonPressedSVG } from '../../components/SVG/ButtonSVG';
import { alertActions } from '../../../actions/alert.actions';
const { useEffect, useState, useRef } = React;

const determineSymbol = (item: number) => {
    switch (Math.abs(item)) {
        case 1:
            return <Pawn color={item} classname={`${chessStyle.symbolPlayed}`} />;
        case 2:
            return <Rook color={item} classname={`${chessStyle.symbolPlayed}`} />;
        case 3:
            return <Knight color={item} classname={`${chessStyle.symbolPlayed}`} />;
        case 4:
            return <Bishop color={item} classname={`${chessStyle.symbolPlayed}`} />;
        case 5:
            return <Queen color={item} classname={`${chessStyle.symbolPlayed}`} />;
        case 6:
            return <King color={item} classname={`${chessStyle.symbolPlayed}`} />;
        default:
            return <SymbolBlank classname={`${chessStyle.symbolPlayed}`} />;
    }
}

type playerInfo = {
    uuid: string,
    profilePhoto: string,
    nickname: string
}
type selectedPieceType = {
    piece?: number,
    pos: string | null,
    idx: number | null
}
const initialRivalInfo = {
    uuid: "",
    profilePhoto: "",
    nickname: ""
}
const matrixInitialState = setupChessBoard();
const chessBoardColorPattern = setupChessBoardColors();

export const Chess = () => {
    const [matrix, setMatrix] = useState(matrixInitialState);
    const [player, setPlayer] = useState(1);
    const [rivalInfo, setRivalInfo] = useState<playerInfo>(initialRivalInfo);
    const [disabled, setDisabled] = useState(false);
    const [retryBtn, setRetryBtn] = useState(false);
    const [conclusion, setConclusion] = useState("");
    const [moves, setMoves] = useState<unknown[]>([]);
    const [selectedPiece, setSelectedPiece] = useState<selectedPieceType>({ pos: null, idx: null });
    const [inPromotion, setInPromotion] = useState(false);
    const [promotionInfo, setPromotionInfo] = useState<selectedPieceType>({ pos: null, idx: null });
    const [giveup, setGiveup] = useState(false);
    const [leaveState, setLeaveState] = useState(false);
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
            chessSocket.emit("join", { roomId: roomState.roomId, user }, (data: any) => {
                if (data.split(",")[0] === "Error") history.push(paths.HOME);
                if (data === "-1") dispatch(roomActions.waitUser());
                setDisabled(true);
                setPlayer(parseInt(data));
            })
            chessSocket.on("send_rival_info", ({ uuid, nickname, profilePhoto }) => {
                setRivalInfo({ uuid, nickname, profilePhoto });
            })
            chessSocket.on("playerTwo_joined", ({ uuid, nickname, profilePhoto }) => {
                if (userState.uuid === uuid) return;
                setRivalInfo({ uuid, nickname, profilePhoto });
                setDisabled(false);
                dispatch(roomActions.stopWaitingUser());
                chessSocket.emit("send_rival_info", { roomId: roomState.roomId, user });
            })
            chessSocket.on("movePiece", ({ chessBoard, unlockRival }) => {
                setMatrix([...chessBoard]);
                if (unlockRival !== user.uuid) setDisabled(false);
            })
            chessSocket.on("promotion", ({ promote, promotionPawn }) => {
                setDisabled(true);
                if (!promote) return;
                setInPromotion(promote);
                setPromotionInfo(promotionPawn);
            })
            chessSocket.on("alert", (msg) => {
                dispatch(alertActions.notification(msg));
            })
            chessSocket.on("conclusion", (msg) => {
                setDisabled(true);
                setConclusion(msg);
            })
            chessSocket.on("leave", () => {
                setDisabled(true);
                setLeaveState(true);
                toast("The other player has left the game");
            })
            chessSocket.on("retry", ({ uuid }) => {
                setMatrix(matrixInitialState);
                setConclusion("");
                setRetryBtn(false);
                setGiveup(false);
                setLeaveState(false);
                if (uuid === userState.uuid) setDisabled(false);
            })
            chessSocket.on("player disconnected", () => {
                toast("The other player has disconnected");
                setLeaveState(true);
                setDisabled(true);
                setConclusion(WIN);
            })
        }
        return () => { isMounted = false };
    }, [])

    const handleClick = (value: number, pos: string, idx: number) => {
        if (selectedPiece.pos === pos ||
            value === 0 ||
            value / Math.abs(value) !== player) {
            clearSelect();
            return;
        }
        select(value, pos, idx);
    }

    const movePiece = (value: number, pos: string, idx: number) => {
        const from = {
            square: {
                pos: selectedPiece.pos as string,
                value: selectedPiece.piece as number
            },
            idx: selectedPiece.idx as number
        };
        const to = {
            square: { pos, value },
            idx
        }
        chessSocket.emit("movePiece", roomState.roomId, userState.uuid, { from, to }, (data: string) => {
            setDisabled(true);
            if (!data) return;
            if (data.split(",")[0] === "Error") alert("Error something went wrong");
        });
        clearSelect();
    }

    const makePromotion = (newPiece: number) => {
        const to = {
            square: {
                pos: promotionInfo.pos as string,
                value: promotionInfo.piece as number
            },
            idx: promotionInfo.idx as number
        };
        const from = {
            square: {
                pos: promotionInfo.pos as string,
                value: newPiece
            },
            idx: promotionInfo.idx as number
        }
        chessSocket.emit("movePiece", roomState.roomId, userState.uuid, { from, to }, (data: string) => {
            setDisabled(true);
            if (!data) return;
            if (data.split(",")[0] === "Error") alert("Error something went wrong");
        });
        setPromotionInfo({ pos: null, idx: null });
        setInPromotion(false);
    }

    const select = (value: number, pos: string, idx: number) => {
        setSelectedPiece({ piece: value, pos, idx });
        setMoves(displayMoves(pos, value, matrix));
    }

    const clearSelect = () => {
        setSelectedPiece({ pos: null, idx: null });
        setMoves([]);
    }

    const handleClipboard = (e: any) => {
        //@ts-ignore
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
    }

    const leave = () => {
        chessSocket.emit("leave", { roomId: roomState.roomId, uuid: userState.uuid });
        history.push(paths.HOME);
    }

    const retry = () => {
        const playerId = userState.uuid;
        chessSocket.emit("retry", { roomId: roomState.roomId, playerId }, (data: string) => {
            if (data === "retry registered") {
                setRetryBtn(true);
                setLeaveState(true);
            }
        });
    }

    const giveUp = () => {
        setGiveup(true);
        chessSocket.emit("giveup", { roomId: roomState.roomId, username: userState.user });
    }

    return (
        <>
            {roomState.requesting ?
                "loading..."
                :
                <div className={`${chessStyle.main}`}>
                    <div className={chessStyle.playerMenu}>
                        <PlayerCard
                            player={player === -1 ? 1 : 2}
                            name={userState.user}
                            profilePhoto={userState.profileURL}
                            turn={disabled}
                            classname={` 
                                ${chessStyle.playerCard} 
                                ${player === -1 ? chessStyle.black : chessStyle.white}
                                ${disabled ? chessStyle.disabled : ""}`} />
                        <PlayerCard
                            player={player === -1 ? 2 : 1}
                            name={rivalInfo.nickname}
                            profilePhoto={rivalInfo.profilePhoto}
                            turn={!disabled}
                            classname={`
                                ${chessStyle.playerCard} 
                                ${player === -1 ? chessStyle.white : chessStyle.black}
                                ${disabled ? "" : chessStyle.disabled}`} />
                    </div>

                    <div onClick={giveUp} className={chessStyle.giveUpBlock}>
                        {
                            giveup ?
                                <ButtonPressedSVG classname={chessStyle.giveUp} />
                                :
                                <ButtonSVG classname={chessStyle.giveUp} />
                        }
                    </div>
                    <Card classname={`${chessStyle.card} ${roomState.waitingUser ? "" : chessStyle.started} ${player === 1 ? chessStyle.flip : ""}`}>
                        <div className={`${chessStyle.playgrid} ${disabled ? chessStyle.disabled : ""} ${roomState.waitingUser ? chessStyle.disabled : ""}`}>
                            {matrix.map((item, idx) => {
                                const display: string | number | JSX.Element = determineSymbol(item.value);
                                const color = chessBoardColorPattern[idx] === 1 ? chessStyle.whiteSquare : chessStyle.blackSquare;
                                const highlight = moves.includes(item.pos) ? chessStyle.highlight : "";
                                return (<div
                                    id={item.pos}
                                    key={`key-${idx}`}
                                    className={`item-${idx} ${color} ${highlight} ${chessStyle.square}`}
                                    onClick={() => {
                                        highlight ? movePiece(item.value, item.pos, idx) : handleClick(item.value, item.pos, idx);
                                    }} >
                                    {display}
                                </div>)
                            })}
                        </div>
                    </Card>

                    <Popup condition={[WIN, LOSE, DRAW].includes(conclusion)}>
                        <div className={chessStyle.content}>
                            <h4>{conclusion.toUpperCase()}</h4>
                            {retryBtn && leaveState ?
                                <span>wait for the other player...</span>
                                :
                                ""
                            }
                            <Button disabled={leaveState} variant="contained" color="secondary" onClick={retry} >retry</Button>
                            <Button variant="contained" color="secondary" onClick={leave}>leave</Button>
                        </div>
                    </Popup>

                    <Popup condition={inPromotion}>
                        <div className={chessStyle.content}>
                            <h4>{"make your promotion"}</h4>
                            <div className={chessStyle.promotionContent}>
                                {
                                    [2, 3, 4, 5].map(piece => {
                                        const display: string | number | JSX.Element = determineSymbol(piece * player);
                                        return (
                                            <div
                                                key={`${piece}-value`}
                                                className={chessStyle.promotionBtn}
                                                onClick={() => makePromotion(piece * player)}>
                                                {display}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Popup>

                    <Popup condition={roomState.waitingUser}>
                        <div className={chessStyle.content}>
                            <span>Invite a friend to play with you!</span>
                            <input
                                className={chessStyle.invitationLink}
                                ref={textAreaRef}
                                type="text"
                                value={`${process.env.REACT_APP_BASE_URL}/Chess/${roomState.roomId}`}
                                readOnly />
                            <Button variant="contained" color="primary" onClick={handleClipboard} >copy to Clipboard</Button>
                        </div>
                    </Popup>

                </div>
            }
        </>
    )
}