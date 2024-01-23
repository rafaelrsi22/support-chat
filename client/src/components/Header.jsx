import React from "react";
import { Link } from "react-router-dom"

import AlertManager from "../managers/AlertManager";

function Header(props) {
    return (
        <header>
            <AlertManager />
            <a className="text-6xl font-semibold tracking-wide text-slate-800 text-center mt-10 block">
                <Link to={props.redirect || '/'}>{props.msg || 'Support Chat'}</Link>
            </a>
        </header>
    );
}

export default Header;