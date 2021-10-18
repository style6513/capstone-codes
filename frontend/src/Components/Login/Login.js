import React, { useContext, useState } from "react";
import { useHistory , Link } from "react-router-dom";
import UserContext from "../../UserContext";

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
        if(res.success) {
            setCurrentUser(formData.username)
            history.push(`/codes`);
        } else {
            console.log(e)
        }
    }
    console.log(formData)
    return (
        <form onSubmit={handleSubmit}>
            login
            <input onChange={handleChange} name="username" value={formData.username} />
            <input onChange={handleChange} name="password" type="password" value={formData.password} />
            <button>submit</button>
            <Link to='/register'>Register</Link>
        </form>
    )
}

export default LoginPage;