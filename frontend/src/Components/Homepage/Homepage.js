import React, { useEffect, useState } from "react";
import Api from "../../Api";

const HomePage = props => {
    const [codes, setCodes] = useState(null);
    useEffect(() => {
        const fetchCodes = async () => {
            try {
                const codes = await Api.getAllCodes();
                setCodes(codes);
            } catch(e) {
                console.log(e);
            }
        }
        fetchCodes();
    }, []);
    return (
        <div>
            <h1>Codes</h1>
            <div>
                {JSON.stringify(codes)}
            </div>
        </div>
    )
};

export default HomePage;