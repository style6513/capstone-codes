import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FloatingLabel, Form } from "react-bootstrap";

const RegisterPage = ({ signup }) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const history = useHistory();
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }))
    }
    const handleSubmit = async e => {
        e.preventDefault();
        const res = await signup(formData);
        if (res.success) {
            history.push("/codes")
        } else {
            console.log(e)
        }
    }
    return (
        <>
            <div className="registerPage">
                <div className="registerContent">
                    <div className="registerHtml">
                        <h1>Register</h1>
                    </div>
                    <div>
                        <form className="text-center registerLabel" onSubmit={handleSubmit}>
                            <FloatingLabel
                                htmlFor="username"
                                controlId="formUsername"
                                label="Username"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Username" />
                            </FloatingLabel>
                            <FloatingLabel
                                htmlFor="email"
                                controlId="formEmail"
                                label="email"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="E-mail" />
                            </FloatingLabel>
                            <FloatingLabel
                                htmlFor="password"
                                controlId="floatingPassword"
                                label="Password"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password" />
                            </FloatingLabel>
                            <input type="submit" value="Register" />
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default RegisterPage;