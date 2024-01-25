import React from "react";
import { Link } from "react-router-dom"

import Header from "../components/Header";
import AnimatedFooter from "../components/AnimatedFooter";

function Home() {
     return (
        <div id="app" className="flex flex-col justify-center">
            <Header />
            <div className="flex flex-col mx-auto items-center max-w-68">
                <h2 className="text-5xl text-center montserrat">Suporte <span className="blue-gradient font-bold">rápido</span> é aqui! 🧑🏼‍💻</h2>
                <p className="text-base mt-3 text-gray-500 font-semibold montserrat">Se você não possuí um login, registre-se para começar a conversar com algum suporte!</p>
                <div className="flex flex-col items-center">
                    <Link to="login">
                        <a type="submit" className="text-lg font-bold text-white bg-neutral-950 hover:bg-transparent hover:text-neutral-950 focus:outline-none border hover:border-neutral-950 rounded-lg text-sm px-8 py-4 text-center mt-3 cursor-pointer background-transition">
                            Login
                        </a>
                    </Link>
                    <Link to="signup">
                        <a type="submit" className="text-lg text-neutral-950 font-semibold hover:text-blue-950 focus:outline-none font-medium rounded-lg text-sm px-5 py-3.5 text-center mt-4 cursor-pointer underline-hover">
                            Get Started
                        </a>
                    </Link>
                </div>
            </div>
            <AnimatedFooter />
        </div>
    )
}

export default Home;