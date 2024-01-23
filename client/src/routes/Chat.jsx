import React, { useState, useEffect } from "react";
import  { useNavigate } from 'react-router-dom'

import Header from "../components/Header";

function Chat() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/auth')
            .then((response) => response.json())
            .then(({data}) => setUsername(data.username));
    }, []);

    return (
        <div id="app" className="flex flex-col">
            <Header msg={`Hello ${username}`} redirect='/chat' />
            <div className="flex flex-col mx-auto items-center max-w-32 mt-10">
                <input type="submit" className="text-white bg-blue-950 hover:text-blue-950 border hover:border-blue-950 hover:bg-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 cursor-pointer" value='Logout' onClick={async () => {
                    const response = await fetch('/auth/logout', {
                        method: "POST"
                    });

                    const data = await response.json();

                    if (data) {
                        navigate('/');
                    }
                }} />
            </div>
        </div>
    )
}

export default Chat;