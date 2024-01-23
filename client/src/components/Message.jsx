import React from "react";

function Message(props) {
    const userClassName = 'rounded-s-xl rounded-br-xl bg-blue-950';
    const otherUserClassName = 'rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 bg-gray-700'

    return (
        <div className={"items-start gap-2.5 min-w-72 mb-2 " + (props.user ? 'self-end' : '')}>
            <div className={"flex flex-col w-full max-w-[320px] leading-1.5 p-4 " + (props.user ? userClassName : otherUserClassName)}>
                <p className="text-sm font-normal py-2.5 text-gray-900 text-white">{props.content}</p>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {props.user ? <span className="text-sm font-normal text-gray-500 text-gray-400">Delivered</span> : ''}
                    <span className="text-sm font-normal text-gray-500 text-gray-400">{props.date}</span>
                </div>
            </div>
        </div>
    );
}

export default Message;