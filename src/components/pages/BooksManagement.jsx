import React from 'react';
import Spinner from './Spinner'
import axios from 'axios';
import './style.css';


function BooksManagement({ allBooks, account, name, author, publishing, language, category, desc, price, amount }) {
    const [allAccountBooks, setAllAccountBooks] = React.useState(null);
    const [msg, setMsg] = React.useState(null);
    const [isUpdateclicked, setIsUpdateclicked] = React.useState(false);
    const [bookNameUpdated, setBookNameUpdated] = React.useState(null);
    const [idBookUpdated, setIdBookUpdated] = React.useState(null);
    const [itemsOnChange, setItemsOnChange] = React.useState({
        name,
        author,
        publishing,
        language,
        category,
        desc,
        price,
        amount
    });
    const [msgUpdated, setMsgUpdated] = React.useState(null);
    const [refresh, setRefresh] = React.useState(null);
    React.useEffect(() => {
        getBooksAccount();
    }, [refresh])
    const getBooksAccount = async () => {
        const response = await axios.get(`https://books-store-back.herokuapp.com/books/store/getAllBooksUser/${account._id}`); // working on
        setAllAccountBooks(response.data);
    }
    const updateBookHandler = (id, bookName) => {
        // console.log(id);
        setIsUpdateclicked(!isUpdateclicked)
        setBookNameUpdated(bookName)
        setIdBookUpdated(id)
        setMsgUpdated(null)
    }
    const removeBookHandler = (id, name) => {
        axios.delete(`https://books-store-back.herokuapp.com/books/store/deleteBookByUser/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    setMsg(`Deleted ${name}, was made successfully`)
                    setRefresh(true)
                    allBooks(id)
                    // alert(`Deleted ${name}, was made successfully`)
                    // window.location.reload(false);
                    // addItem(addAccount)
                }
                else {
                    alert("Something went wrong")
                }
            }).catch((err) => {
                setMsg('ERROR')
            })
    }
    const updateInputsHandler = (e) => {
        setItemsOnChange({
            ...itemsOnChange,
            [e.target.name]: (e.target.value)
        })
    }
    const updateInputsIntHandler = (e) => {
        setItemsOnChange({
            ...itemsOnChange,
            [e.target.name]: parseInt(e.target.value)
        })
    }
    const addUpdatedInputsHandler = () => {
        if (!itemsOnChange.name && !itemsOnChange.author && !itemsOnChange.publishing && !itemsOnChange.language
            && !itemsOnChange.category && !itemsOnChange.desc && !itemsOnChange.price && !itemsOnChange.amount) {
            setMsgUpdated('You should change at least one inputs')
        } else {
            if ((!itemsOnChange.price) || (itemsOnChange.price && itemsOnChange.price > 0)) {
                if ((!itemsOnChange.amount) || (itemsOnChange.amount && itemsOnChange.amount > 0)) {
                    if ((!itemsOnChange.publishing) || (itemsOnChange.publishing && itemsOnChange.publishing >= 1500 && itemsOnChange.publishing <= 2021)) {
                        axios.put(`https://books-store-back.herokuapp.com/books/store/updateBookByUser/${idBookUpdated}`, itemsOnChange)
                            .then((res) => {
                                if (res.status === 200) {
                                    setMsgUpdated(`Changed was added successfully`)
                                    alert(`Changed was added successfully`)
                                    window.location.reload(false);
                                    // addItem(creditAccount)
                                }
                                else {
                                    alert("Something went wrong")
                                }
                            }).catch((err) => {
                                setMsg('ERROR')
                            })
                    } else {
                        setMsgUpdated('You should put correct year [1500-2021]')
                    }
                } else {
                    setMsgUpdated('You should put an possitive amount')
                }
            } else {
                setMsgUpdated('You should put a possitive price')
            }
        }
    }
    return (
        <div className="ui container">
            {msg ? <div style={{ textAlign: 'center', color: 'green', fontSize: '20px' }}>{msg}</div> : ''}
            <div className="users-details">
                {
                    allAccountBooks ? allAccountBooks.map((i, index) => {
                        return (
                            <div key={index} >
                                <div className="ui segment">
                                    <div className="ui divided items">
                                        <div className="item">
                                            <div className="image">
                                                {/* <div style={{
                                                    backgroundImage: `url(${i.avatar})`,
                                                    height: '150px',
                                                    width: '150px',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat'
                                                }}></div> */}
                                            </div>
                                            <div className="content">
                                                <p className="header">Name: {i.name}</p>
                                                <div className="meta">
                                                    <span>author: {i.author}</span>
                                                </div>
                                                <div className="description">
                                                    <p>Publishing Date: {i.publishing}</p>
                                                    <p>language: {i.language}</p>
                                                    <p>category: {i.category}</p>
                                                    <p>desc: {i.desc}</p>
                                                    <p>price: {i.price}</p>
                                                    <p>Amount: {i.amount}</p>
                                                    <p>purchase: {i.purchase}</p>
                                                </div>
                                                <div className="extra">
                                                    <p>rating: {i.rating}</p>
                                                    <p>comments: <div>{i.comments.map((com) => {
                                                        return <p key={com}>{com}</p>
                                                    })}</div></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        Id: {i._id} <hr /> Upload Date: {i.bookUploadDate}
                                        {/* id: {i.id} name: {i.name} userName: {i.userName} country: {i.country} total Amount: {total[index]} */}
                                    </div>
                                    <hr />
                                    {/* {index<users.length-1 ? <hr/>:""} */}
                                    <div className="buttonEditRemove">
                                        <input type="button" className="removeBook" value="Remove" onClick={() => removeBookHandler(i._id, i.name)} />
                                        <input type="button" className="editBook" value="Edit" onClick={() => updateBookHandler(i._id, i.name)} />
                                        {/* {popUp ? <PopUp toggle={removeBookHandler} /> : null} */}
                                    </div>
                                    {((isUpdateclicked) && (bookNameUpdated === i.name)) ? (
                                        <div>
                                            <div className="">
                                                <hr /><div>Update Inputs That you want:</div>
                                                name: <input type="text" name={'name'} onChange={updateInputsHandler} />
                                                author:<input type="text" name={'author'} onChange={updateInputsHandler} />
                                                publishing:<input type="number" name={'publishing'} onChange={updateInputsIntHandler} />
                                                language: <input type="text" name={'language'} onChange={updateInputsHandler} />
                                                category:<input type="text" name={'category'} onChange={updateInputsHandler} />
                                                desc:<input type="text" name={'desc'} onChange={updateInputsHandler} />
                                                price: <input type="number" name={'price'} onChange={updateInputsIntHandler} />
                                                amount:<input type="number" name={'amount'} onChange={updateInputsIntHandler} />
                                                <br />
                                                <input type="button" value="Update" onClick={addUpdatedInputsHandler} />
                                            </div>
                                            <div>
                                                {msgUpdated ? msgUpdated : ''}
                                            </div>
                                        </div>
                                    ) : ''}

                                </div>
                            </div>
                        )
                    }) : <div style={{ textAlign: 'center', fontSize: "20px" }}> You have no books in the list to manage </div>
                }
            </div>

        </div>
    );
}

export default BooksManagement;