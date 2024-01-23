import React, { useState } from "react";

import Input from "./Input";

function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form className="mx-auto max-w-72 mt-64 flex flex-col items-center" onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit({email, password});
        }}>
            <Input dataType={'email'} onChange={setEmail} />
            <Input dataType={'password'} onChange={setPassword} />
            <input type="submit" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4  cursor-pointer" value='Log In' />
            {props.children}
        </form>
    );
}

export default LoginForm;