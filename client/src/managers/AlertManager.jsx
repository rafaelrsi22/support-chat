/*
    To create a new Alert, you must use "useDispatch" from react-redux

    Require the Actions from AlertReducer, and then you just use them on a dispatch hook.

    dispatch(actions.createAlert('title', 'description'));
*/

import React, { useContext } from "react";
import { useSelector } from "react-redux";

import Alert from "../components/Alert";

function AlertManager() {
    const alerts = useSelector((state) => state);

    return (
        <div id="alerts-container" class="absolute top-5 left-0 right-0 max-w-2xl z-10 m-auto">
            {alerts.map(({title, description}) => <Alert title={title} description={description} />)}
        </div>
    );
}

export default AlertManager;