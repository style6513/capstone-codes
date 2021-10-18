import React from "react";
import { useHistory } from "react-router-dom";
const RegisterPage = ({ signup }) => {
    const [formData, setFormData] = React.useState({
        username: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = React.useState([]);
    const history = useHistory();
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }))
    }
    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        const res = await signup(formData);
        if(res.success) {
            history.push("/codes")
        } else {
            setErrors(res.errors);
        }
    }
    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    value={formData.username}
                    name="username"
                    placeholder="username"
                />
                <input
                    onChange={handleChange}
                    value={formData.email}
                    name="email"
                    placeholder="email"
                />
                <input
                    onChange={handleChange}
                    value={formData.password}
                    name="password"
                    placeholder="password"
                />
                <button>submit</button>
            </form>
        </>

    )
}

export default RegisterPage;