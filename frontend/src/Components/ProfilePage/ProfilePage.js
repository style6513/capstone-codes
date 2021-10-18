import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import Api from "../../Api";
import UserContext from "../../UserContext";

const ProfilePage = () => {
    const { username } = useParams();
    console.log(username)
    const { currentUser } = useContext(UserContext)
    const history = useHistory()
    const [loadedCode, setLoadedCode] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: ""
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(input => ({ ...input, [name]: value }))

    }
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const createCode = await Api.createCode(currentUser.username, formData);
            setLoadedCode(code => [...code, createCode])
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const fetchUserCodes = async () => {
            try {
                const codes = await Api.request(`codes/user/${username}`);
                setLoadedCode(codes.codes)
            } catch (e) {
                console.error(e);
            }
        }
        fetchUserCodes();
    }, []);

    return (
        <>
            <div>
                <h1>{username}'s profile</h1>
                <div className="container">
                    <div className="wrapper">
                        {loadedCode && loadedCode.map(item =>
                            <div className="card red" key={item.id}>
                                <h4>{item.name}</h4>
                                <p>{item.description}</p>
                                <p>${item.price}</p>
                                <Link to={`/codes/${item.id}`}>Details</Link>
                            </div>
                        )}
                        {currentUser?.username === username && (
                            <div className='card'>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="name">Name:</label>
                                    <input name="name" value={formData.name} onChange={handleChange} />
                                    <br/>
                                    <label htmlFor="description">Description:</label>
                                    <input name="description" value={formData.description} onChange={handleChange} />
                                    <br/>
                                    <label htmlFor="price">Price:</label>
                                    <input name="price" value={formData.price} onChange={handleChange} />
                                    <br/>
                                    <input type="submit" value="Create"/>
                                </form>
                                <button onClick={history.goBack}>back</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfilePage