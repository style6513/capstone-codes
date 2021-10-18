import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Api from "../../Api";
const ItemDetail = props => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const history = useHistory();
    const [input,setInput] =useState({
        name : "",
        description : "",
        price : ""
    })
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const details = await Api.getCodeById(id);
                setItem(details);
            } catch (e) {
                console.error(e);
            }
        }
        fetchItem();
    }, [id]);
    const handleChange = e => {
        const { name, value  } = e.target; 
        setInput(i => ({ ...i, [name] : value }))
        
    }
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const updatedCode = await Api.updateCode("test4444", input, id);
            setItem(updatedCode)
        } catch(e) {
            console.error(e);
        }
    }
    const handleDelete = async () => {
        try {
            await Api.deleteCodeById(id, "test4444");
            history.push(`/profile/test4444`);
        } catch(e) {
            console.error(e);
        }
    }
    return (

        <>
            {JSON.stringify(item)}
            <button onClick={handleDelete}>X</button>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} id="name" name="name" value={input.name}/>
                <input onChange={handleChange} id="description" name="description" value={input.description}/>
                <input onChange={handleChange} id="price" name="price" value={input.price}/>
                <input type="submit" value="Edit"/>
            </form>
        </>
    )
}

export default ItemDetail;