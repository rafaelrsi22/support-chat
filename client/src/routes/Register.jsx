import React from "react";
import  { useNavigate } from 'react-router-dom'
import RegisterForm from "../components/RegisterForm";

import Header from "../components/Header";

function Register() {
    const navigate = useNavigate();

    return (
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
    );
}

export default Register;