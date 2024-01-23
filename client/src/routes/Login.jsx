import React from "react";
import  { useNavigate, Navigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

import LoginForm from "../components/LoginForm";
import Header from "../components/Header";

import { alertActions } from "../reducers/AlertReducer";

function Login() {
    const [cookies] = useCookies(['authorization-key']);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        (!cookies["authorization-key"]) ?
        <div id="app" className="flex flex-col">
            <Header />
            <LoginForm onSubmit={async (value) => {
                const response = await fetch('/auth/login', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value)
                });

                const json = await response.json();

                if (json) {
                    const data = json.data;

                    if (data && json.type === 'error') {
                        dispatch(alertActions.createAlert(data.title, data.description));
                        return;
                    }
                    navigate('/chat');
                }
            }} />
        </div>
        :
        <Navigate to='/chat' />
    );
}

export default Login