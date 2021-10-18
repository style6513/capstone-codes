import React from "react";
import { useHistory } from "react-router-dom";
const LoginPage = ({ login }) => {
    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = React.useState([]);
    const history = useHistory()
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }))
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([])
        const res = await login(formData);
        if(res.success) {
            history.push(`/codes`);
        } else {
            setErrors(res.errors)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            login
            <input onChange={handleChange} name="username" value={formData.username} />
            <input onChange={handleChange} name="password" type="password" value={formData.password} />
            {errors.length > 0 ? errors.map(e => {
                return (
                    <div>
                        {e}
                    </div>
                )
            }) : null}
            <button>submit</button>
        </form>
    )
}

export default LoginPage;