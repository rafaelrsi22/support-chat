import React from "react";
import  { useNavigate, Navigate } from 'react-router-dom'
import { useCookies } from "react-cookie";

import LoginForm from "../components/LoginForm";
import Header from "../components/Header";

function Login() {
    const [cookies] = useCookies(['authorization-key']);
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

                const data = await response.json();

                if (data) {
                    navigate('/chat');
                }
            }} />
        </div>
        :
        <Navigate to='/chat' />
    );
}

export default Login