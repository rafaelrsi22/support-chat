import React, { useState, useEffect } from "react";
import  { useNavigate } from 'react-router-dom'

import Header from "../components/Header";
import ChatBox from "../components/ChatBox";
import AdminSearch from "../components/AdminSearch";

function Chat() {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [isAdmin, setAdminState] = useState(false);
    const [userMessages, setUserMessages] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [messages, setMessages] = useState([]);

    const navigate = useNavigate();

    useEffect(() => { // Set user states
        fetch('/auth')
            .then((response) => response.json())
            .then(({data}) => {
                setAdminState(data.admin);
                setUsername(data.username);
                setUserId(data.id);

                if (data.admin) {
                    return;
                }
                
                fetch('/chat') // Load messages
                    .then((response) => response.json())
                    .then(({data}) => {
                        setMessages(data);
                    });
            });
    }, []);

    useEffect(() => {
        const messagesUnion = userMessages.concat(messages);
        setChatMessages(messagesUnion.sort((messageA, messageB) => messageA.creation - messageB.creation)) // sorting by creation date
    }, [userMessages, messages]);

    return (
        <div id="app" className="flex flex-col max-h-screen">
            <Header msg={`Hello ${username}`} redirect='/chat'>
                <div className="flex flex-col mx-auto items-center max-w-32 mt-10 mb-20">
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
            </Header>
            <div className="flex justify-around min-h-0 grow mb-10">
                {isAdmin ? 
                <AdminSearch onMessagesLoad={(messages) => {
                    setUserMessages(messages);
                }} /> 
                : <></>}
                <ChatBox messages={chatMessages} userId={userId} />
            </div>
        </div>
    )
}

export default Chat;