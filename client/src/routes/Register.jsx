import React from "react";
import  { useNavigate, Navigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import RegisterForm from "../components/RegisterForm";

import Header from "../components/Header";

function Register() {
    const [cookies] = useCookies(['authorization-key']);
    const navigate = useNavigate();

    return (
        (!cookies["authorization-key"]) ?
        <div id="app" className="flex flex-col">
            <Header />
            <RegisterForm onSubmit={async (value) => {
                const response = await fetch('/auth/register', {
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

export default Register;