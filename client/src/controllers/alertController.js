import { alertActions } from "../reducers/AlertReducer";

function handleJSONError(json, success) {
    const data = json.data;

    if (data && json.type === 'error') {
        return alertActions.createAlert(data.title, data.description);
    }

    success(data);
}

export {handleJSONError};