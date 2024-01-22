import React from "react";
import RegisterForm from "../components/RegisterForm";

import Header from "../components/Header";

function Register() {
    return (
        <div id="app" className="flex flex-col">
            <Header />
            <RegisterForm onSubmit={(value) => {
                fetch('/auth/register', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value)
                })
            }} />
        </div>
    );
}

export default Register;