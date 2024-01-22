import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import Login from './routes/Login';
import Register from './routes/Register';
import Chat from './routes/Chat';
import ProtectedRoute from "./routes/ProtectedRoute";
import AccessDenied from "./routes/AccessDenied";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/chat" element={
                    <ProtectedRoute element={<Chat />} unauthorized={<AccessDenied />} />
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;