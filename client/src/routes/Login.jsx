import React from "react";
import LoginForm from "../components/LoginForm";

import Header from "../components/Header";

function Login() {
    return (
        <div id="app" className="flex flex-col">
            <Header />
            <LoginForm />
        </div>
    );
}

export default Login