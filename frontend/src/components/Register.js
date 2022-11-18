import React, { useEffect, useState } from 'react'
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
const cookies = new Cookies();


export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);
    const [login, setLogin] = useState(false);

    const [errorLogin, setErrorLogin] = useState(false);

    const handleSubmit = async (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // make the API call
        await axios(registerRequest)
            .then((result) => {
                setRegister(true);
            })
            .catch((error) => {
                error = new Error();
            });

        await axios(loginRequest)
            .then((result) => {
                cookies.set("TOKEN", result.data.token, {
                    path: "/",
                });
                cookies.set("USERNAME", result.data.username, {
                    path: "/",
                });
                navigate("/list");
                setLogin(true);
            })
            .catch((error) => {
                setErrorLogin(true);
                error = new Error();
            });
    }

    const logout = () => {
        // destroy the cookie
        cookies.remove("TOKEN", { path: "/" });
        // redirect user to the landing page
        navigate("/login");
      }

    const navigateShare = () => {
        navigate("/share");
    }

    useEffect(() => {
        const token = cookies.get("TOKEN");
        if (token) {
            setLogin(true);
            setUsername(cookies.get("USERNAME"));
        }
    }, []);

    // set registerRequest
    const registerRequest = {
        method: "post",
        url: "http://localhost:3000/register",
        data: {
            username,
            password,
        },
    };

    // set loginRequest
    const loginRequest = {
        method: "post",
        url: "http://localhost:3000/login",
        data: {
            username,
            password,
        },
    };

    return (
        <>
            <Form>
                {/* email */}
                <div className='d-flex justify-content-between align-items-start p-3 border-bottom' >
                    
                    <h2><Link  to="/list" replace={true}><AiFillHome /> Funny Movies </Link></h2>
                    <div>
                        <div className='d-flex gap-2 align-items-center'>
                            {!login ?
                                <>
                                    <Form.Group controlId="formBasicUsername" className='d-flex align-items-center'>
                                        <Form.Control
                                            type="text"
                                            placeholder="User name"
                                            name="username"
                                            onChange={(e) => setUsername(e.target.value)}
                                            value={username}
                                        />
                                    </Form.Group>

                                    {/* password */}
                                    <Form.Group controlId="formBasicPassword" className='d-flex align-items-center'>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                        />
                                    </Form.Group>

                                    {/* submit button */}

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={(e) => handleSubmit(e)} >
                                        Register/Login
                                    </Button> 
                                    { errorLogin ? <>
                                        
                                        <div className='text-danger'>Error Login</div> 
                                    </> : <></>
                                    }
                                    </> : <>
                                    <div className='d-flex align-items-center justify-content-between gap-2'>
                                        <span>Welcome {username}</span>
                                        <Button variant="primary" onClick={() => navigateShare()}>
                                            Share a movie
                                        </Button>
                                            {/* logout */}
                                        <Button type="submit" variant="danger" onClick={() => logout()}>
                                            Logout
                                        </Button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>


                </div>


            </Form>
        </>
    )
}
