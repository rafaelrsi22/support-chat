import React from "react";
import { Link } from "react-router-dom"

function Header() {
    return (
        <header>
            <a className="text-6xl font-semibold tracking-wide text-slate-800 text-center mt-10 block">
                <Link to='/'>Support Chat</Link>
            </a>
        </header>
    );
}

export default Header;