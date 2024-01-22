import React from "react";
import  { useNavigate } from 'react-router-dom'

import LoginForm from "../components/LoginForm";
import Header from "../components/Header";

function Login() {
    const navigate = useNavigate();

    return (
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
    );
}

export default Login