import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../Api";
import '../../../src/App.css'

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
                    <div className="wrapperlist">
                        {codes && codes.map(item =>
                            <div className="card red" key = { item.id } >
                            <p>{item.name}</p>
                            <p>{item.description}</p>
                            <p>${item.price}</p>
                            <Link to={`/codes/${item.id}`}>Details</Link>
                        </div>
                    )}
                
            </div>
        </div>
        </div >
    )
};

export default HomePage;