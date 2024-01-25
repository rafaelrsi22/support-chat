import React from "react";
import { Link } from "react-router-dom"

function BeautyLink(props) {
    return (
        <Link to={props.path} relative="path" className="text-sm">
            <a className="text-xl leading-none text-neutral-950 font-bold focus:outline-none font-medium rounded-lg text-sm px-5 py-3.5 text-center cursor-pointer underline-hover montserrat">
                {props.text}
            </a>
        </Link>
    )
}

export default BeautyLink;