import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import Login from './routes/Login';
import Register from './routes/Register';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;