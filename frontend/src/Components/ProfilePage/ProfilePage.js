import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Api from "../../Api";

const ProfilePage = () => {
    const { username } = useParams();
    console.log(username);
    const [loadedCode, setLoadedCode] = useState(null);

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
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfilePage