import React, { useState } from "react";
import { Mail, KeyRound, User, Undo2 } from "lucide-react";

import Input from "./Input";
import { Link } from "react-router-dom";

function RegisterForm(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <div className="w-80">
                <Link to='..'>
                    <div className="flex items-center font-semibold">
                        <Undo2 className="inline-block me-2" />
                        <a className="inline-block text-base self-start">Back to home</a>
                    </div>
                </Link>
                <form className="mx-auto  flex flex-col items-center" onSubmit={(e) => {
                    e.preventDefault();
                    props.onSubmit({username, password, email});
                }}>
                    <Input dataType={'username'} onChange={setUsername} icon={<User className="inline-block me-2" fill="rgb(245 245 244)" />} />
                    <Input dataType={'email'} onChange={setEmail} icon={<Mail className="inline-block me-2" fill="rgb(245 245 244)" />} />
                    <Input dataType={'password'} onChange={setPassword} icon={<KeyRound className="inline-block me-2" fill="rgb(245 245 244)" />} />
                    <input type="submit" className="text-lg font-semibold text-white bg-neutral-950 hover:bg-transparent hover:text-neutral-950 focus:outline-none border hover:border-neutral-950 rounded-lg text-sm mt-12 px-8 py-4 text-center cursor-pointer background-transition" value='Subscribe' />
                    {props.children}
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;