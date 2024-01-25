import React from "react";
import  { useNavigate, Navigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

import RegisterForm from "../components/RegisterForm";
import Header from "../components/Header";
import HomeLink from "../components/HomeLink";

import { handleJSONError } from "../controllers/alertController";
import { postJSONRequestHandler } from "../controllers/fetchController";

function registerUser(formValue, callback) {
    postJSONRequestHandler('/auth/register', formValue, callback);
}

function Register() {
    const [cookies] = useCookies(['authorization-key']);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        (!cookies["authorization-key"]) ?
        <div id="app" className="flex flex-col">
            <Header />
            <RegisterForm onSubmit={async (value) => {
                registerUser(value, (json) => {
                    const dispatchAction = handleJSONError(json, () => navigate('/chat'));
                    if (dispatchAction) {
                        dispatch(dispatchAction);
                    }
                })
            }}>
                <HomeLink />
            </RegisterForm>
            
        </div>
        :
        <Navigate to='/chat' />
    );
}

export default Register;