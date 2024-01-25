import React from "react";
import  { useNavigate, Navigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import HomeLink from "../components/HomeLink";

import { handleJSONError } from "../controllers/alertController";
import { postJSONRequestHandler } from "../controllers/fetchController";

function loginUser(formValue, callback) {
    postJSONRequestHandler('/auth/login', formValue, callback)
}

function Login() {
    const [cookies] = useCookies(['authorization-key']);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        (!cookies["authorization-key"]) ?
        <div id="app" className="flex flex-col">
            <Header />
            <LoginForm onSubmit={async (value) => {
                loginUser(value, (json) => {
                    const dispatchAction = handleJSONError(json, () => navigate('/chat'));
                    if (dispatchAction) {
                        dispatch(dispatchAction);
                    }
                });
            }}>
                <HomeLink />
            </LoginForm>
        </div>
        :
        <Navigate to='/chat' />
    );
}

export default Login