import React from "react";
import { useCookies } from 'react-cookie';

function ProtectedRoute({element, unauthorized}) {
    const [cookies] = useCookies(['authorization-key']);
    
    return (
        (cookies["authorization-key"]) ? element : unauthorized
    )
}

export default ProtectedRoute;