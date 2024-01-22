import React from "react";
import { Link } from "react-router-dom"

import Header from "../components/Header";

function Home() {
    return (
        <div id="app" className="flex flex-col">
            <Header />
            <div className="flex flex-col mx-auto items-center max-w-32 mt-72">
                {/* <a type="submit" className="text-white bg-blue-950 hover:text-blue-950 border hover:border-blue-950 hover:bg-white focus:outline-none font-medium rounded-lg text-sm px-5 py-3.5 text-center mt-4 cursor-pointer">
                    <Link to="signup">Get Started</Link>
                </a> */}
                <Link to="signup">
                    <a type="submit" className="text-white bg-blue-950 hover:text-blue-950 border hover:border-blue-950 hover:bg-white focus:outline-none font-medium rounded-lg text-sm px-5 py-3.5 text-center mt-4 cursor-pointer">
                        Get Started
                    </a>
                </Link>
                <Link to="login">
                    <a type="submit" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-3 text-center mt-4 cursor-pointer">
                        Welcome Back
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default Home;