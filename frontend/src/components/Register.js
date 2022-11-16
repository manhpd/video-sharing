import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();


export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);
    const [login, setLogin] = useState(false);

    const handleSubmit = async (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // make a popup alert showing the "submitted" text
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
                navigate("/auth");
                setLogin(true);
            })
            .catch((error) => {
                error = new Error();
            });
    }

    // set configurations
    const registerRequest = {
        method: "post",
        url: "http://localhost:3000/register",
        data: {
            username,
            password,
        },
    };

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
                <div className='d-flex justify-content-between align-items-center p-3' >
                    <h2>Register</h2>
                    <div className='d-flex gap-2 align-items-center'>
                        <Form.Group controlId="formBasicUsername" className='d-flex align-items-center'>
                            <Form.Label>User Name</Form.Label>
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
                            <Form.Label>Password</Form.Label>
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
                    </div>
                </div>

                {login ? (
                    <p className="text-success">You Are Logged in Successfully</p>
                ) : (
                    <p className="text-danger">You Are Not Logged in</p>
                )
                }
            </Form>

           
        </>
    )
}
