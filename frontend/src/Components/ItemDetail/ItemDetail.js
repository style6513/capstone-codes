import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../../UserContext";
import Api from "../../Api";

const ItemDetail = props => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const history = useHistory();
    const { currentUser } = useContext(UserContext);
    const [errors, setErrors] = useState([])
    const [input, setInput] = useState({
        name: "",
        description: "",
        price: ""
    })

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const details = await Api.getCodeById(id);
                setItem(details);
            } catch (e) {
                setErrors(e)
                console.error(e)
            }
        }
        fetchItem();
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setInput(input => ({ ...input, [name]: value }))

    }
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const updatedCode = await Api.updateCode(currentUser.username, input, id);
            setItem(updatedCode)
        } catch (e) {
            console.error(e);
        }
    }
    const handleDelete = async () => {
        try {
            await Api.deleteCodeById(id, currentUser.username);
            history.push(`/profile/${currentUser.username}`);
        } catch (e) {
            console.error(e);
        }
    }
    console.log(id, item);
    return (

        <>
            <div>
                <p>Name: {item?.name}</p>
                <p>Description: {item?.description}</p>
                <p>Price: ${item?.price}</p>
                <p>Created_by: {item?.created_by}</p>
                {currentUser.username === item?.created_by ?
                    (
                        <button onClick={handleDelete}>Delete</button>
                    ) : null
                }


                {/* {errors.length > 0 ? errors.map(e => <div>{e}</div>) : null} */}
                {currentUser.username === item?.created_by ?
                    (<div className='wrapper'>
                        <div className='cardcenter'>
                            <form onSubmit={handleSubmit}>
                                <h2>Editor</h2>
                                <label htmlFor="name">Name:</label>
                                <br/>
                                <input onChange={handleChange} id="name" name="name" value={input.name} />
                                <br />
                                <label htmlFor="description">Description:</label>
                                <br/>
                                <input onChange={handleChange} id="description" name="description" value={input.description} />
                                <br />
                                <label htmlFor="price">Price:</label>
                                <br/>
                                <input onChange={handleChange} id="price" name="price" value={input.price} />
                                <br />
                                <input type="submit" value="Edit" />
                                <br />
                                <button onClick={history.goBack}>Back</button>
                            </form>
                        </div>
                    </div>
                    ) : <button onClick={history.goBack}>Back</button>
                }
            </div>

        </>
    )
}

export default ItemDetail;