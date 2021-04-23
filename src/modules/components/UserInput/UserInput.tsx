import userInputStyle from "./userInput.module.scss";
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks'
import { ReplaySVG } from "../SVG/Replay";
import { userActions } from "../../../actions/user.actions";
import { helperActions } from "../../../actions/helper.actions";
import defaultPic from "../../../assets/loading.gif";

export const SUGESTED_NAME = "Nickname" + Math.floor(Math.random() * 100);

export const UserInput = () => {
    const userState = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const onChange = (e: any) => {
        dispatch(userActions.changeName(e.target.value));
    }

    const handleReplay = () => {
        dispatch(userActions.changePic(""));
        dispatch(helperActions.getRandomPic());
    }

    return (
        <div className="userInput" data-testid={"userInput"}>
            <div className={userInputStyle.form}>
                <div className={userInputStyle.profilePhotoFrame}>
                    <div className={userInputStyle.profilePhoto}>
                        <img src={userState.profileURL || defaultPic} alt="portrait" />
                    </div>
                    <div data-testid={"changePic"} onClick={handleReplay} className={userInputStyle.again}>
                        <ReplaySVG classname={userInputStyle.replay} />
                    </div>
                </div>
                <div className={userInputStyle.input}>
                    <input
                        type="text"
                        name="nickname"
                        id="nickname"
                        autoComplete="off"
                        value={userState.user}
                        onChange={onChange}
                        placeholder={SUGESTED_NAME} />
                </div>
            </div>
        </div>
    )
}