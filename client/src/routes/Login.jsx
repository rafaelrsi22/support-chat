import React from "react";
import  { useNavigate, Navigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import BeautyLink from "../components/BeautyLink";

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
                <p className="text-sm mt-8 mb-2 font-semibold text-gray-500 montserrat">You don't have an account ?</p>
                <BeautyLink path="/signup" text="Register" />
            </LoginForm>
        </div>
        :
        <Navigate to='/chat' />
    );
}

export default Login