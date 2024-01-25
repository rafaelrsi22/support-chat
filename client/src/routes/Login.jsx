import React from "react";
import  { useNavigate, Navigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"

import LoginForm from "../components/LoginForm";
import Header from "../components/Header";

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
                {/* <HomeLink /> */}
                <p className="text-sm mt-8 mb-2 font-semibold text-gray-500 montserrat">You don't have an account ?</p>
                <Link to="/signup" relative="path" className="text-sm">
                    <a className="text-xl leading-none text-neutral-950 font-bold focus:outline-none font-medium rounded-lg text-sm px-5 py-3.5 text-center cursor-pointer underline-hover montserrat">
                        Register
                    </a>
                </Link>
            </LoginForm>
        </div>
        :
        <Navigate to='/chat' />
    );
}

export default Login