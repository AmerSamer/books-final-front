import React from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = ({ account }) => {
    const [allUserCarts, setAllUserCarts] = React.useState(null);
    const [refresh, setRefresh] = React.useState(null);

    React.useEffect(() => {
        getCartsUser();
    }, [refresh])
    const getCartsUser = async () => {
        const response = await axios.get(`https://books-store-back.herokuapp.com/books/store/getAllcartsByUser/${account._id}`);
        setAllUserCarts(response.data);
    }
    const removeBookCartHandler = (id, name) => {
        axios.delete(`https://books-store-back.herokuapp.com/books/store/deleteBookCart/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    // setDeleteMsg(`Deleted ${name}, was made successfully`)
                    notify('Deleted book from cart, was made successfully')
                    setRefresh(!refresh)
                }
                else {
                    // alert("Something went wrong")
                    notify("Something went wrong")
                }
            }).catch((err) => {
                // setDeleteMsg('ERROR')
                notify("ERROR")
            })
    }
    // const plusCount = (id) => {
    //     const found = allUserCarts.find(f => f._id === id)
    //     if ((found._id === id)) {
    //         setCount(count + 1)
    //     }
    // }
    // const minusCount = (id) => {
    //     const found = allUserCarts.find(f => f._id === id)
    //     if ((count > 1) && (found._id === id)) {
    //         setCount(count - 1)
    //     }
    // }
    const buyBtnHandler = () => {
        axios.get(`https://books-store-back.herokuapp.com/books/store/updateBuyCart/${account._id}`)
            .then((res) => {
                if (res.status === 200) {
                    notify('buy')
                    setRefresh(!refresh)
                }
                else {
                    notify('Something went wrong')
                }
            }).catch((err) => {
                notify('ERROR')

            })
    }

    const notify = (ms) => toast(ms);
    return (
        <>
            <div>
                Hello, @{account.name}
                <hr />
            </div>
            <div className="ui container" >
                <div style={{ letterSpacing: "7px", textAlign: "center", padding: "1rem", fontSize: '23px' }}>
                    Cart
                </div>
                {/* <div style={{ textAlign: 'center', color: 'black', fontSize: '20px' }}>Your Cart:</div><br /> */}
                <div className="users-details">
                    {
                        allUserCarts ? allUserCarts.map((i, index) => {
                            return (
                                i.cart ? (
                                    <div key={index} >
                                        <div className="ui segment">
                                            <div className="ui divided items">
                                                <div className="item">
                                                    <div className="image">
                                                        <div style={{
                                                            backgroundImage: `url(${i.book.img})`,
                                                            height: '100%',
                                                            width: '100%',
                                                            backgroundPosition: 'center',
                                                            backgroundSize: 'cover',
                                                            backgroundRepeat: 'no-repeat'
                                                        }}></div>
                                                    </div>
                                                    <div className="content">
                                                        <p className="header">Name: {i.book.name}</p>
                                                        <div className="meta">
                                                            <span>author: {i.book.author}</span>
                                                        </div>
                                                        <div className="description">
                                                            <p>Publishing Date: {i.book.publishing}</p>
                                                            <p>language: {i.book.language}</p>
                                                            <p>category: {i.book.category}</p>
                                                            <p>desc: {i.book.desc}</p>
                                                            <p>price: {i.book.price}</p>
                                                            {/* <p>Amount: {i.amount}</p> */}
                                                            {/* <p>purchase: {i.purchase}</p> */}
                                                        </div>
                                                        <div className="extra">
                                                            <p>rating: {i.book.rating}</p>
                                                            <div>comments: {i.book.comments.map((com) => {
                                                                return <p key={com}>{com}</p>
                                                            })}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                {/* Id: {i._id} <hr /> Upload Date: {i.bookUploadDate} */}
                                                {/* id: {i.id} name: {i.name} userName: {i.userName} country: {i.country} total Amount: {total[index]} */}
                                            </div>
                                            <hr />
                                            {/* {index<users.length-1 ? <hr/>:""} */}
                                            <div className="buttonEditRemove">
                                                {/* <input type="button" value="-" onClick={() => minusCount(i._id)} /><input type="number" value={count} /><input type="button" value="+" onClick={() => plusCount(i._id)} /> */}
                                                {/* <input type="button" className="removeBook" value="Remove" onClick={() => removeBookCartHandler(i._id, i.book.name)} /> */}
                                                <button type="button" class="btn btn-danger" onClick={() => removeBookCartHandler(i._id, i.book.name)}>Remove</button>
                                                <ToastContainer />
                                                {/* <input type="button" className="editBook" value="Edit" onClick={() => updateBookHandler(i._id, i.name)} /> */}
                                                {/* {popUp ? <PopUp toggle={removeBookHandler} /> : null} */}
                                            </div>
                                        </div>
                                    </div>
                                ) : ''
                            )
                        }) : ''
                    }
                    <div class="mb-3" style={{ padding: '1rem' }}>
                        <button type="button" class="btn btn-success btn-lg" style={{ width: '100%' }} onClick={buyBtnHandler}>Buy</button>
                        <ToastContainer />
                    </div>


                </div>
                {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
                <div style={{ letterSpacing: "10px", textAlign: "center", padding: "1rem", fontSize: '23px' }}>
                    Shopping  History
                </div>
                {/* <div style={{ textAlign: 'center', color: 'black', fontSize: '20px' }}>Shopping History:</div><br /> */}
                <div className="users-details">
                    {
                        allUserCarts ? allUserCarts.map((i, index) => {

                            return (
                                !i.cart ? (
                                    <div key={index} >
                                        <div className="ui segment">
                                            <div className="ui divided items">
                                                <div className="item">
                                                    <div className="image">
                                                        <div style={{
                                                            backgroundImage: `url(${i.book.img})`,
                                                            height: '100%',
                                                            width: '100%',
                                                            backgroundPosition: 'center',
                                                            backgroundSize: 'cover',
                                                            backgroundRepeat: 'no-repeat'
                                                        }}></div>
                                                    </div>
                                                    <div className="content">
                                                        <p className="header">Name: {i.book.name}</p>
                                                        <div className="meta">
                                                            <span>author: {i.book.author}</span>
                                                        </div>
                                                        <div className="description">
                                                            <p>Publishing Date: {i.book.publishing}</p>
                                                            <p>language: {i.book.language}</p>
                                                            <p>category: {i.book.category}</p>
                                                            <p>desc: {i.book.desc}</p>
                                                            <p>price: {i.book.price}</p>
                                                            {/* <p>Amount: {i.amount}</p> */}
                                                            {/* <p>purchase: {i.purchase}</p> */}
                                                        </div>
                                                        <div className="extra">
                                                            {/* <p>rating: {i.book.rating}</p>
                                                        <div>comments: {i.book.comments.map((com) => {
                                                                return <p key={com}>{com}</p>
                                                            })}</div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ) : ''
                            )
                        }) : <div style={{ fontSize: "20px", height: '500px' }}> You have no books in the list to manage </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Cart