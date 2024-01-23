/*
    To create a new Alert, you must use "useDispatch" from react-redux

    Require the Actions from AlertReducer, and then you just use them on a dispatch hook.

    dispatch(actions.createAlert('TESTEE', 'TESTANDO'));
*/

import React, { useContext } from "react";
import { useSelector } from "react-redux";

import Alert from "../components/Alert";

function AlertManager() {
    const alerts = useSelector((state) => state);
    console.log(alerts);
    return (
        <div id="alerts-container" class="absolute top-5">
            
        </div>
    );
}

export default AlertManager;