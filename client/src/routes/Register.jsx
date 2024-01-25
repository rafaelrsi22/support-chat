import React from "react";
import  { useNavigate, Navigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"

import RegisterForm from "../components/RegisterForm";
import Header from "../components/Header";
import BeautyLink from "../components/BeautyLink";

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
                <p className="text-sm mt-8 mb-2 font-semibold text-gray-500 montserrat">Already have an account ?</p>
                <BeautyLink path="/login" text="Login" />
            </RegisterForm>
        </div>
        :
        <Navigate to='/chat' />
    );
}

export default Register;