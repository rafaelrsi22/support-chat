import React, {useEffect, useState, useRef} from "react";

import Message from "./Message";

function isStringEmpty(value) {
    return value.replace(' ', '') === '';
}

function scrollOverflowToBottom(overflowElement) {
    setTimeout(() => overflowElement.scrollTo({top: overflowElement.scrollHeight, behavior: 'smooth' }), 100);
}

function uploadMessage(content) {
    if (isStringEmpty(content)) {
        return;
    }

    fetch('/chat', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: content })
    });
}

function ChatBox(props) {
    const [message, setMessage] = useState('');

    return (
        <div className="bg-neutral-100 shadow-2xl max-w-xl w-lvw h-full rounded-lg flex flex-col">
            <ul id="chat-overflow" className="flex flex-col grow px-5 py-5 overflow-auto">
                {props.messages.map((value) => {
                    const ownsMessage = value.owner === props.userId;
                    const element = document.getElementById('chat-overflow');

                    scrollOverflowToBottom(element);
                    
                    return <Message content={value.content} user={ownsMessage || (props.isAdmin && value.adminMessage)} />
                })}
            </ul>
            <form className="justify-self-end" onSubmit={(e) => { // Message created
                e.preventDefault();
                uploadMessage(message);
                setMessage('');
            }}>
                <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50">
                    <input type="text" id="chat-input" rows="1" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none" placeholder="Your message..." autoComplete="off" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button type="submit" className="inline-flex justify-center p-2 text-blue-950 rounded-full cursor-pointer hover:bg-blue-100">
                        <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                        </svg>
                        <span className="sr-only">Send message</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChatBox;