import React from 'react';
import homeStyle from "./home.module.scss";
import { useHistory } from "react-router-dom";
import { Button } from '../../components/Button/Button'
import { v4 as uuidv4 } from "uuid";
import { Card } from "../../components/Card/Card";
import { Title } from "../../components/Title/Title";
import { UserInput, SUGESTED_NAME } from '../../components/UserInput/UserInput'
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks';
import { userActions } from '../../../actions/user.actions';
import { roomActions } from '../../../actions/room.actions'
import { helperActions } from '../../../actions/helper.actions';

const { useState, useEffect } = React;

export const Home = () => {
    const [creatingRoom, setCreatingRoom] = useState<"tictactoe" | "chess" | "">("");
    const userState = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!userState.profileURL) dispatch(helperActions.getRandomPic());
    }, [])

    const checkButton = (buttonName: string) => {
        if (creatingRoom === "") return "normal";
        else if (creatingRoom === buttonName) return "loading";
        else return "blocked";
    }

    const submit = (e: any) => {
        e.preventDefault();
        setCreatingRoom(e.target.name);
        const nickname = userState.user ? userState.user : SUGESTED_NAME;
        const formData = {
            roomId: "R-" + uuidv4(),
            game: e.target.name.toLowerCase(),
            player: {
                uuid: uuidv4(),
                nickname
            }
        }
        dispatch(userActions.createUser(nickname, formData.player.uuid));
        dispatch(roomActions.createRoom(formData, history));
    }

    return (
        <>
            <div className={homeStyle.main}>
                <Card>
                    <Title>PlayGroup</Title>
                    <form className={homeStyle.form} onSubmit={submit}>
                        <UserInput />
                        <div className={homeStyle.menu}>
                            <Button
                                onClick={submit}
                                name="tictactoe"
                                mode={checkButton("tictactoe")}>
                                TicTacToe
                            </Button>
                            <Button
                                onClick={submit}
                                name="chess"
                                mode={checkButton("chess")}>
                                Chess
                            </Button>
                            <Button mode={"disabled"}>Soon</Button>
                            <Button mode={"disabled"}>Soon</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    )
}