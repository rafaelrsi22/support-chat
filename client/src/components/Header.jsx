import React from "react";
import { Link } from "react-router-dom"

import AlertManager from "../managers/AlertManager";

function Header(props) {
    return (
        <header className="absolute w-full top-0">
            <AlertManager />
            <a className="ms-4 text-4xl font-bold tracking-wider italic">
                <Link to={props.redirect || '/'}>SC</Link>
            </a>
            {props.children}
        </header>
    );
}

export default Header;