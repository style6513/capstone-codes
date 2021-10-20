import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal,Button } from 'react-bootstrap'
import ItemDetail from "../ItemDetail/ItemDetail";
import Api from "../../Api";
import '../../../src/App.css'

const HomePage = props => {
    const [codes, setCodes] = useState();

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
                <div className="wrapperlist">
                    <p>Sell Your App</p>
                    <p>Show Yours</p>
                </div>
            </div>

            <div className="container">
                <div className="wrapper">
                    {codes && codes.map(item =>
                        <div className="card blue" key={item.id} >
                            <p><span className='span'>Name: </span>{item.name}</p>
                            <p><span className='span'>Description: </span>{item.description}</p>
                            <p><span className='span'>Price: </span>${item.price}</p>
                            <p><span className='span'>Created_by: </span>{item.created_by}</p>
                            <Link to={`/codes/${item.id}`}>Details</Link>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
};

export default HomePage;