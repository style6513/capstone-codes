import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Api from "../../Api";
import UserContext from "../../UserContext";

const ProfilePage = () => {
    const { username } = useParams();
    console.log(username)
    const { currentUser } = useContext(UserContext)
    const [loadedCode, setLoadedCode] = useState(null);
    const [formData, setFormData] = useState({
        name : "",
        description : "",
        price : ""
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
                    <div className="row">
                        {loadedCode && loadedCode.map(item =>
                            <div className="col-md-4" key={item.id}>
                                <h4>{item.name}</h4>
                                <p>{item.description}</p>
                                <p>${item.price}</p>
                                <Link to={`/codes/${item.id}`}>Details</Link>
                            </div>
                        )}
                        {currentUser?.username === username && (
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <input name="name" value={formData.name} onChange={handleChange} />
                                    <input name="description" value={formData.description} onChange={handleChange} />
                                    <input name="price" value={formData.price} onChange={handleChange} />
                                    <input type="submit" value="Create New Codes" />
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfilePage