import { saveState } from "../helpers/saveState";
import { userConstants } from "../reducers/userReducer/user.constants";

const changeName = (username: string) => {
    const payload = {
        user: username
    }

    return (dispatch: any) => {
        dispatch({ type: userConstants.CHANGE_NAME, payload });
    }
}

const changePic = (url: string) => {
    const payload = { url };
    return (dispatch: any) => {
        dispatch({ type: userConstants.CHANGE_PIC, payload });
    }
}

const createUser = (username: string, uuid: string) => {
    const payload = {
        user: username,
        uuid
    }
    saveState(uuid, username);

    return (dispatch: any) => {
        dispatch({ type: userConstants.CREATE_USER, payload })
    }
}

export const userActions = {
    changeName,
    createUser,
    changePic
}