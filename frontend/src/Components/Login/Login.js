import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../UserContext";
import { FloatingLabel, Form } from "react-bootstrap";

const LoginPage = ({ login }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const history = useHistory()
    const { setCurrentUser } = useContext(UserContext)
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }))
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await login(formData);
        if (res.success) {
            setCurrentUser(formData.username)
            history.push(`/codes`);
        } else {
            console.log(e)
        }
    }
    console.log(formData)
    return (
        <div className="loginPage">
            <div className="logincontent">
                <div className="loginhtml">
                    <h1>Login</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
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
                                placeholder="username" />
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
                        <input type="submit" value="Login" />
                        <p>Don't have an account?<Link to='/register'>Register</Link></p>
                    </form>
                </div>
            </div>
            {/* <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input onChange={handleChange} name="username" value={formData.username} />
                <br />
                <label htmlFor="password">Password</label>
                <input onChange={handleChange} name="password" type="password" value={formData.password} />
                <br />
                <button>Sign in</button>
                <p>Don't have account?</p><Link to='/register'>Register</Link>
            </form> */}
        </div>
    )
}

export default LoginPage;