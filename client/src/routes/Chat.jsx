import React from "react";

import Header from "../components/Header";

function Chat() {
    return (
        <div id="app" className="flex flex-col">
            <Header msg={"Hello " + "{username}"} redirect='/chat' />
            
        </div>
    )
}

export default Chat;