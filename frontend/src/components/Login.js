import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = cookies.get("TOKEN");
        if (token) {
           navigate("/");
        }
    }, [navigate]);
    return (
        <div>Please Login</div>
    )
}
