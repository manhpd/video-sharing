import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Login() {
   
    useEffect(() => {
        const navigate = useNavigate();
        const token = cookies.get("TOKEN");
        if (token) {
           navigate("/");
        }
    }, []);
    return (
        <div>Please Login</div>
    )
}
