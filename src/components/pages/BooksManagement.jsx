import React from 'react';
import Spinner from './Spinner'
import axios from 'axios';
import './style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BooksManagement({ allBooks, account, name, author, publishing, language, category, desc, price, amount }) {
    const [allAccountBooks, setAllAccountBooks] = React.useState(null);
    // const [msg, setMsg] = React.useState(null);
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
                    // setMsg(`Deleted ${name}, was made successfully`)
                    setRefresh(!refresh)
                    allBooks(id)
                    notify('Deleted successfully')
                    // alert(`Deleted ${name}, was made successfully`)
                    // window.location.reload(false);
                    // addItem(addAccount)
                }
                else {
                    notify('Something went wrong')
                    // alert("Something went wrong")
                }
            }).catch((err) => {
                notify('ERROR')
                // setMsg('ERROR')
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
            // setMsgUpdated('You should change at least one inputs')
            notify('You should change at least one inputs')
        } else {
            if ((!itemsOnChange.price) || (itemsOnChange.price && itemsOnChange.price > 0)) {
                if ((!itemsOnChange.amount) || (itemsOnChange.amount && itemsOnChange.amount > 0)) {
                    if ((!itemsOnChange.publishing) || (itemsOnChange.publishing && itemsOnChange.publishing >= 1500 && itemsOnChange.publishing <= 2021)) {
                        axios.put(`https://books-store-back.herokuapp.com/books/store/updateBookByUser/${idBookUpdated}`, itemsOnChange)
                            .then((res) => {
                                if (res.status === 200) {
                                    setRefresh(!refresh)
                                    notify('Changed was added successfully')                           
                                }
                                else {
                                    notify('Something went wrong')
                                    // alert("Something went wrong")
                                }
                            }).catch((err) => {
                                notify('ERROR')
                                // setMsg('ERROR')
                            })
                    } else {
                        notify('You should put correct year [1500-2021]')
                        // setMsgUpdated('You should put correct year [1500-2021]')
                    }
                } else {
                    notify('You should put an possitive amount')
                    // setMsgUpdated('You should put an possitive amount')
                }
            } else {
                notify('You should put a possitive price')
                // setMsgUpdated('You should put a possitive price')
            }
        }
    }
    const notify = (ms) => toast(ms);

    return (
        <>
            <div>
                Hello, @{account.name}
                <hr />
            </div>
            <div className="ui container">
                <div className="users-details">
                    {
                        allAccountBooks ? allAccountBooks.map((i, index) => {
                            return (
                                <div key={index} >
                                    <div className="ui segment">
                                        <div className="ui divided items">
                                            <div className="item">
                                                <div className="image">
                                                    <div style={{
                                                        backgroundImage: `url(${i.img})`,
                                                        height: '100%',
                                                        width: '100%',
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat'
                                                    }}></div>
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
                                                        <hr />
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
                                        </div>
                                        <hr />
                                        <div className="buttonEditRemove">
                                            <button type="button" class="btn btn-danger" onClick={() => removeBookHandler(i._id, i.name)}>Remove</button>
                                            <button type="button" class="btn btn-secondary" onClick={() => updateBookHandler(i._id, i.name)}>Edit</button>
                                            <ToastContainer />
                                           
                                        </div>
                                        {((isUpdateclicked) && (bookNameUpdated === i.name)) ? (
                                            <div>
                                                <div className="">
                                                    <div>
                                                        <hr />
                                                        Field updates
                                                        <hr />
                                                    </div>
                        
                                                    {/* /////////////////////// */}
                                                    <div className="ui form">
                                                        <div className="three fields">
                                                            <div className="field">
                                                                <label>Book Name</label>
                                                                <input type="text" name={'name'} placeholder="Book Name" onChange={updateInputsHandler} />
                                                                {/* <input type="text" placeholder="First Name"/> */}
                                                            </div>
                                                            <div className="field">
                                                                <label>Book Author</label>
                                                                <input type="text" name={'author'} placeholder="Book Author" onChange={updateInputsHandler} />
                                                                {/* <input type="text" placeholder="Middle Name"/> */}
                                                            </div>
                                                            <div className="field">
                                                                <label>publishing Date</label>
                                                                <input type="number" name={'publishing'} placeholder="publishing Date" onChange={updateInputsIntHandler} />
                                                                {/* <input type="text" placeholder="Last Name"/> */}
                                                            </div>
                                                        </div>
                                                        <div className="three fields">
                                                            <div className="field">
                                                                <label>Book Language</label>
                                                                <input type="text" name={'language'} placeholder="Book Language" onChange={updateInputsHandler} />
                                                                {/* <input type="text" placeholder="First Name"/> */}
                                                            </div>
                                                            <div className="field">
                                                                <label>Book Category</label>
                                                                <input type="text" name={'category'} placeholder="Book Category" onChange={updateInputsHandler} />
                                                                {/* <input type="text" placeholder="Middle Name"/> */}
                                                            </div>
                                                            <div className="field">
                                                                <label>Description</label>
                                                                <input type="text" name={'desc'} placeholder="Description" onChange={updateInputsHandler} />
                                                                {/* <input type="text" placeholder="Last Name"/> */}
                                                            </div>
                                                        </div>
                                                        <div className="three fields">
                                                            <div className="field">
                                                                <label>Book Price</label>
                                                                <input type="number" name={'price'} placeholder="Book Price" onChange={updateInputsIntHandler} />
                                                                {/* <input type="text" placeholder="First Name"/> */}
                                                            </div>
                                                            <div className="field">
                                                                <label>Amount Stock</label>
                                                                <input type="number" name={'amount'} placeholder="Amount Stock" onChange={updateInputsIntHandler} />
                                                                {/* <input type="text" placeholder="Middle Name"/> */}
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                              
                                                    <br />
                                                    <button type="button" class="btn btn-success" onClick={addUpdatedInputsHandler}>Update</button>
                                                    <ToastContainer />
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
        </>
    );
}

export default BooksManagement;