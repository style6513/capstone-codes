import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../Api";

const HomePage = props => {
    const [codes, setCodes] = useState(null);
    useEffect(() => {
        const fetchCodes = async () => {
            try {
                const codes = await Api.getAllCodes();
                setCodes(codes);
            } catch (e) {
                console.log(e);
            }
        }
        fetchCodes();
    }, []);
    return (
        <div>
            <div className="centerlize">
                <div className="wrapper">
                    <p>Sell Your App</p>
                    <p>Show Yours</p>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    {codes && codes.map(item =>
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
    )
};

export default HomePage;