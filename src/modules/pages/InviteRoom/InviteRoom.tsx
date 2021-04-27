import React from 'react';
import { useParams } from "react-router-dom";
import inviteRoomStyle from "./inviteRoom.module.scss";
import { useHistory } from "react-router-dom";
import { Button } from '../../components/Button/Button'
import { v4 as uuidv4 } from "uuid";
import { Card } from "../../components/Card/Card";
import { Title } from "../../components/Title/Title";
import { UserInput, SUGESTED_NAME } from '../../components/UserInput/UserInput'
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks';
import { userActions } from '../../../actions/user.actions';
import { roomActions } from '../../../actions/room.actions';
import { helperActions } from '../../../actions/helper.actions';
const { useEffect } = React;

export const InviteRoom = () => {
    const userState = useAppSelector(state => state.userReducer);
    const roomState = useAppSelector(state => state.roomReducer);
    const dispatch = useAppDispatch();
    const history = useHistory();
    const { roomId, game } = useParams<{ roomId: string, game: string }>();

    useEffect(() => {
        const gameName = game.toLowerCase() as "tictactoe" | "chess";
        dispatch(roomActions.getAvailableRoom(roomId, gameName, history));
        dispatch(helperActions.getRandomPic());
    }, [])

    const submit = (e: any) => {
        e.preventDefault();
        const gameName = game.toLowerCase() as "tictactoe" | "chess";
        const nickname = userState.user ? userState.user : SUGESTED_NAME;
        const formData = {
            roomId,
            game: gameName as "tictactoe" | "chess",
            player: {
                uuid: uuidv4(),
                nickname
            }
        }
        dispatch(roomActions.getAvailableRoom(roomId, gameName, history));
        dispatch(userActions.createUser(nickname, formData.player.uuid));
        dispatch(roomActions.joinToRoom(formData, history));
    }

    return (
        <>
            {roomState.requesting ?
                "loading..."
                :
                <div className={inviteRoomStyle.main}>
                    <Card>
                        <Title>{game}</Title>
                        <form className={inviteRoomStyle.form}>
                            <UserInput />
                            <div className={inviteRoomStyle.menu}>
                                <Button onClick={submit}>Join Game</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            }
        </>
    )
}