import React from "react";
import RegisterForm from "../components/RegisterForm";

import Header from "../components/Header";

function Register() {
    return (
        <div id="app" className="flex flex-col">
            <Header />
            <RegisterForm />
        </div>
    );
}

export default Register;