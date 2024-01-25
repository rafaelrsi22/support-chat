import React, { useState, useEffect, useRef } from "react";
import  { useNavigate } from 'react-router-dom'
import io from 'socket.io-client';

import Header from "../components/Header";
import ChatBox from "../components/ChatBox";
import AdminSearch from "../components/AdminSearch";

const socket = io('http://localhost:3000');

function recieveUserData(callback) {
    fetch('/auth')
    .then((response) => response.json())
    .then(({data}) => callback(data));
}

function recieveMessageData(callback) {
    fetch('/chat') 
    .then((response) => response.json())
    .then(({data}) => callback(data));
}

function sortMessageByCreation(messages) {
    return messages.sort((messageA, messageB) => messageA.creation - messageB.creation);
}

async function logoutUser() {
    const response = await fetch('/auth/logout', {
        method: "POST"
    });

    return await response.json();
}

function Chat() {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [isAdmin, setAdminState] = useState(false);
    const [messages, setMessages] = useState([]);
    const [sortedMessages, setSortedMessages] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const addMessage = (data) => setMessages(messages => [...messages, data]);
        socket.on('message', addMessage);
        return () => socket.off('message', addMessage);
    }, []);

    useEffect(() => {
        recieveUserData((data) => {
            setAdminState(data.admin);
            setUsername(data.username);
            setUserId(data.id);

            if (data.admin) { // Do not load all admin messages on the empty chat
                return;
            }

            recieveMessageData((data) => setMessages([...messages, ...data]));
        });
    }, []);

    useEffect(() => {
        setSortedMessages(sortMessageByCreation(messages)) // sorting by creation date
    }, [messages]);

    return (
        <div id="app" className="flex flex-col items-center justify-center max-h-screen">
            <div className="montserrat">
                <h2>Welcome, <span className="blue-gradient font-bold">{username}</span></h2>
            </div>
            <a className="text-lg leading-none text-neutral-600 font-semibold focus:outline-none font-medium rounded-lg text-sm px-5 py-3.5 text-center cursor-pointer underline-hover montserrat" onClick={async () => {
                if (await logoutUser()) { // Returns a success data
                    navigate('/');
                }
            }} >Logout</a>
            <div className="flex justify-around min-h-0 max-h-96 grow mb-10 mt-12">
                {isAdmin ? 
                <AdminSearch onMessagesLoad={(loadedMessages) => {
                    setMessages([...loadedMessages]);
                }} /> 
                : <></>}
                <ChatBox messages={sortedMessages} userId={userId} isAdmin={isAdmin} />
            </div>
        </div>
    )
}

export default Chat;