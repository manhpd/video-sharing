import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // make a popup alert showing the "submitted" text
        // make the API call
        axios(configuration)
        .then((result) => {console.log(result);})
        .catch((error) => {console.log(error);})
    }

    // set configurations
    const configuration = {
        method: "post",
        url: "http://localhost:3000/register",
        data: {
          username,
          password,
        },
      };

    return (
        <>
            <h2>Register</h2>
            <Form>
                {/* email */}
                <Form.Group controlId="formBasicEmail">
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
                <Form.Group controlId="formBasicPassword">
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
            </Form>
        </>
    )
}
