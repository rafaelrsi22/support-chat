import React, { useState } from "react";

import Input from "./Input";

function RegisterForm(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form className="mx-auto max-w-72 mt-64 flex flex-col items-center" onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit({username, password, email});
        }}>
            <Input dataType={'username'} onChange={setUsername} />
            <Input dataType={'email'} onChange={setEmail} />
            <Input dataType={'password'} onChange={setPassword} />
            <input type="submit" className="text-white bg-blue-950 hover:text-blue-950 border hover:border-blue-950 hover:bg-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 cursor-pointer" value='Subscribe' />
            {props.children}
        </form>
    );
}

export default RegisterForm;