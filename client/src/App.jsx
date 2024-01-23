import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import Home from "./routes/Home";
import Login from './routes/Login';
import Register from './routes/Register';
import Chat from './routes/Chat';
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFound from "./routes/NotFound";

import AlertReducer from "./reducers/AlertReducer";

function App() {
    const store = configureStore({
        reducer: AlertReducer
    })

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/chat" element={
                        <ProtectedRoute element={<Chat />} unauthorized={<Home />} />
                    } />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;