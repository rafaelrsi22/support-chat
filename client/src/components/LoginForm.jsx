import React, { useState } from "react";

import Input from "./Input";

function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form className="mx-auto max-w-72 mt-64 flex flex-col items-center" onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit({username, password});
        }}>
            <Input dataType={'username'} onChange={setUsername} />
            <Input dataType={'password'} onChange={setPassword} />
            <input type="submit" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 cursor-pointer" value='Log In' />
        </form>
    );
}

export default LoginForm;