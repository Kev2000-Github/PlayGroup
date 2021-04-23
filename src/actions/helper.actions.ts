import { helperServices } from "../services/helper.service";
import { alertActions } from "./alert.actions";
import { userActions } from "./user.actions";

const getRandomPic = () => {
    return (dispatch: any) => {
        helperServices.getRandomPic()
            .then(data => {
                dispatch(userActions.changePic(data.request.responseURL));
            })
            .catch(err => {
                console.log(err);
                dispatch(alertActions.error("Error, Something went wrong"));
            })
    }
}

export const helperActions = {
    getRandomPic
}