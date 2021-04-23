import { alertConstants } from "../reducers/alertReducer/alert.constants";

const clear = () => {
    return { type: alertConstants.CLEAR }
}

const error = (message: string) => {
    return { type: alertConstants.ERROR, payload: message }
}

const success = (message: string) => {
    return { type: alertConstants.SUCCESS, payload: message }
}

const notification = (message: string) => {
    return { type: alertConstants.NOTIFICATION, payload: message }
}

export const alertActions = {
    success,
    clear,
    error,
    notification,
}