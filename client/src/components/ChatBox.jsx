import React from "react";

import Message from "./Message";

function ChatBox() {
    return (
        <div className="bg-neutral-100 shadow-2xl max-w-screen-lg w-lvw h-4/6 m-auto rounded-lg flex flex-col">
            <ul className="flex flex-col grow px-5 py-5">
                <Message content="fodase" user />
                <Message content="fodase" />
                <Message content="fodase" />
            </ul>
            <form className="justify-self-end" onSubmit={(e) => {
                e.preventDefault();
            }}>
                <label for="chat" className="sr-only">Your message</label>
                <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50">
                    <textarea id="chat" rows="1" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none" placeholder="Your message..."></textarea>
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