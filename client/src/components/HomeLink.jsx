import React from "react"
import { Link } from "react-router-dom"

function HomeLink() {
    return (
        <Link to=".." relative="path">
            <a type="submit" className="text-blue-700 underline text-base cursor-pointer">
                Home
            </a>
        </Link>
    );
}

export default HomeLink;