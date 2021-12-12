import React from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var Filter = require('bad-words'),
    filterBadWords = new Filter();

const BookPage = ({ account, selectedBook, comments, rating }) => {
    const [selectedBookComm, setSelectedBookComm] = React.useState(null);
    const [allUserCarts, setAllUserCarts] = React.useState(null);
    const [msgFavoritesCart, setMsgFavoritesCart] = React.useState(null);
    const [cart, setCart] = React.useState(null);
    const [changeComment, setChangeComment] = React.useState({
        comments: comments,
    });
    const [ratingSt, setRatingSt] = React.useState({
        rating: rating,
    });
    const [newRating, setNewRating] = React.useState(null);
    const [messageToUser, setMessageToUser] = React.useState(false);
    const [titleToUser, setTitleToUser] = React.useState(null);
    const [contentToUser, setContentToUser] = React.useState(null);
    const [msg, setMsg] = React.useState(null);

    React.useEffect(() => {
        getCartsUser();
    }, [cart])
    const getCartsUser = async () => {
        const response = await axios.get(`https://books-store-back.herokuapp.com/books/store/getAllcartsByUser/${account._id}`);
        setAllUserCarts(response.data);
    }
    const addToFavoritesHandler = () => {
        const newFavorites = {
            user: account._id,
            book: selectedBook._id,
            // favorites: true
        }
        axios.post(`https://books-store-back.herokuapp.com/books/store/newFavorites`, newFavorites)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data.favorites);
                    if (res.data.favorites) {
                        notify("added To favorites Successfully")
                        // setMsgFavoritesCart(`added To favorites Successfully`);
                        // setFav(!fav);
                    } else {
                        notify("Removed from favorites Successfully")
                        // setMsgFavoritesCart(`Removed from favorites Successfully`);
                        // setFav(!fav);
                    }
                }
                else {
                    notify("Something went wrong")
                    // alert("Something went wrong")
                }
            }).catch((err) => {
                notify("ERROR")
                // setMsgFavoritesCart('ERROR')
            })
    }
    const addToCartHandler = () => {
        const found = allUserCarts.find((f) => ((f.user === account._id) && (f.book._id === selectedBook._id) && f.cart))
        if (!found) {
            const newCart = {
                user: account._id,
                book: selectedBook._id,
                cart: true
            }
            axios.post(`https://books-store-back.herokuapp.com/books/store/newCarts`, newCart)
                .then((res) => {
                    if (res.status === 200) {
                        notify("added To cart Successfully")
                        // setMsgFavoritesCart(`added To cart Successfully`);
                        setCart(true)
                    }
                    else {
                        notify("Something went wrong")
                        // alert("Something went wrong")
                    }
                }).catch((err) => {
                    notify("ERROR")
                    // setMsgFavoritesCart('ERR')
                })
        } else {
            notify("This Book Already in your Cart")
            // setMsgFavoritesCart('This Book Already in your Cart')
        }
    }
    const changeCommentHandler = (e) => {
        if (e.target.value) {
            setChangeComment({
                ...changeComment,
                [e.target.name]: "@" + account.name + ", " + new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear() + ", - " + (filterBadWords.clean((e.target.value))) // filtering Bad Words from user input
            })
        }

    }
    const addCommentHandler = () => {
        if (changeComment.comments) {
            axios.put(`https://books-store-back.herokuapp.com/books/store/updateCommentBook/${selectedBook._id}`, changeComment)
                .then((res) => {
                    if (res.status === 200) {
                        notify("Your Comment has been Added successfully")
                        // setMsgFavoritesCart(`Your Comment has been Added successfully`)
                        const commentsArray = selectedBook.comments;
                        commentsArray.push(changeComment.comments)
                        setSelectedBookComm(commentsArray)
                    }
                    else {
                        notify("Something went wrong")
                        // alert("Something went wrong")
                    }
                }).catch((err) => {
                    notify("ERROR")
                    // setMsgFavoritesCart('ERROR')
                })
        } else {
            notify("You Should Fill in the input to Added Your Coment")
            // setMsgFavoritesCart('You Should Fill in the input to Added Your Coment')
        }
    }
    const selectRatingHandler = (e) => {
        // setRatingSt(parseInt(e.target.value))
        if (e.target.value) {
            setRatingSt({
                ...ratingSt,
                [e.target.name]: parseInt(e.target.value)
            })
        }
    }
    const addSelectRatingHandler = () => {
        if (ratingSt) {
            axios.put(`https://books-store-back.herokuapp.com/books/store/updateRatingBook/${selectedBook._id}`, ratingSt)
                .then((res) => {
                    if (res.status === 200) {
                        // setMsgFavoritesCart(`Your rating has been Added successfully`)
                        notify("Your rating has been Added successfully")
                        const ratingsCalc = (selectedBook.rating * selectedBook.purchase + ratingSt.rating) / (selectedBook.purchase + 1);
                        setNewRating(ratingsCalc)
                    }
                    else {
                        notify("Something went wrong")
                        // alert("Something went wrong")
                    }
                }).catch((err) => {
                    notify("ERROR")
                    // setMsgFavoritesCart('ERROR')
                })
        } else {
            notify("You Should Fill in the input to Added Your Comment")
            // setMsgFavoritesCart('You Should Fill in the input to Added Your Coment')
        }
    }
    const btnMessageToUserHandler = () => {
        if (messageToUser) {
            setMessageToUser(false)
        } else {
            setMessageToUser(true)
        }
    }
    const titleHandler = (e) => {
        setTitleToUser(e.target.value)
    }
    const contentHandler = (e) => {
        setContentToUser(e.target.value)
    }
    const sendMessageToUserHandler = () => {
        if (titleToUser && contentToUser) {
            console.log("titleToUser", titleToUser);
            console.log("contextToUser", contentToUser);
            const addNewNotification = {
                bookId: selectedBook._id,
                usersender: account._id,
                userreceiver: selectedBook.user,
                title: titleToUser,
                content: contentToUser,
                timePublished: new Date()
                // reply: reply,
                // isDone: isDone
            }
            axios.post(`https://books-store-back.herokuapp.com/books/store/newNotifications`, addNewNotification)
                .then((res) => {
                    if (res.status === 200) {
                        setTitleToUser(null)
                        setContentToUser(null)
                        // setMsg(`Your Message was sended successfully`)
                        notify("Your Message was sended successfully")
                        // alert(`Book ${addBook.name}, was added successfully`)
                        // window.location.reload(false);
                    }
                    else {
                        notify("Something went wrong")
                        // alert("Something went wrong")
                    }
                }).catch((err) => {
                    notify("ERROR")
                    // setMsg('ERROR')
                    // console.log(err);
                })
        } else {
            notify("msg: please fill All Inputs")
            // console.log("msg: please fill All Inputs");
        }
    }
    const notify = (ms) => toast(ms);
    return (
        <div className="ui container">
            {/* {console.log("selectedBook", selectedBook.img.data)} */}
            <div className="users-details">
                {
                    // allAccountBooks ? allAccountBooks.map((i, index) => {
                    // return (
                    // <div key={index} >
                    <div className="ui segment">
                        <div className="ui divided items">
                            <div className="item">
                                <div className="image">
                                    {/* {selectedBook && <img className='' src={`data:image/jpeg;base64,${selectedBook.img.data}`} alt='img' />} */}
                                    {/* <img className='' src={`data:image/jpeg;base64,${selectedBook.img.data}`} alt='img' /> */}

                                    {/* ${selectedBook.img.data} */}
                                    <div style={{
                                        backgroundImage: `url(${selectedBook.img})`,
                                        height: '100%',
                                        width: '100%',
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}>

                                    </div>
                                </div>
                                <div className="content">
                                    <p className="header">Name: {selectedBook.name}</p>
                                    <div className="meta">
                                        <span>author: {selectedBook.author}</span>
                                    </div>
                                    <div className="description">
                                        <p>Publishing Date: {selectedBook.publishing}</p>
                                        <p>language: {selectedBook.language}</p>
                                        <p>category: {selectedBook.category}</p>
                                        <p>desc: {selectedBook.desc}</p>
                                        <p>price: {selectedBook.price} </p>
                                        <p>{selectedBook.amount > 0 ? <span style={{ color: 'green' }}>✔️ Available</span> : <span style={{ color: 'red' }}>Not Available</span>}</p>
                                        {/* <p>purchase: {selectedBook.purchase}</p> */}
                                    </div>
                                    <div className="extra">
                                        {/* <p>rating: {selectedBook.rating}</p> */}
                                        <hr />
                                        <div>rating: {newRating ? newRating : selectedBook.rating}</div>

                                        <div>comments: {selectedBookComm ? <div>{selectedBookComm.map((com) => {
                                            return <p key={com}>{com}</p>
                                        })}</div> : <div>{selectedBook.comments.map((com) => {
                                            return <p key={com}>{com}</p>
                                        })}</div>}</div>
                                        {/* <hr/> */}
                                        {/* <p>{selectedBook.comments}</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>

                            <button type="button" class="btn btn-primary" onClick={btnMessageToUserHandler}>Contact User</button>
                            <hr />
                            {messageToUser ? (
                                <div>
                                    {console.log(selectedBook.user.name)}
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label">Book Seller: @{selectedBook.user.name}</label>
                                        {/* <label for="exampleFormControlInput1" class="form-label">Book Seller Name: @{account.name}</label> */}
                                        {/* <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Title..." onChange={titleHandler} /> */}
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label">Title:</label>
                                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Title..." onChange={titleHandler} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">Content:</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={contentHandler}></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <button type="button" class="btn btn-success" onClick={sendMessageToUserHandler}>Send</button>
                                    </div>
                                    <ToastContainer />
                                </div>
                            ) : ''}

                        </div>
                        <hr />

                        <div>
                            <select name="rating" id="rating" style={{ width: '3vw', height: '6vh', color: 'gray' }} onChange={selectRatingHandler}>
                                <option name={'rating'} value="1">1</option>
                                <option name={'rating'} value="2">2</option>
                                <option name={'rating'} value="3">3</option>
                                <option name={'rating'} value="4">4</option>
                                <option name={'rating'} value="5">5</option>
                            </select>
                            {/* <input type="button" value='rate' onClick={addSelectRatingHandler} /> */}
                            <button type="button" class="btn btn-info" onClick={addSelectRatingHandler}>Rate</button>
                            <ToastContainer />
                        </div>

                        <hr />
                        <div>
                            {/* <input type="text" name={'comments'} placeholder='Something To Say...' onChange={changeCommentHandler} /> */}
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Comment:</label>
                                <textarea class="form-control" name={'comments'} id="exampleFormControlTextarea1" rows="3" onChange={changeCommentHandler}></textarea>
                            </div>
                            <button type="button" class="btn btn-info" onClick={addCommentHandler}>Add Comment</button>
                            <ToastContainer />
                        </div>
                        <hr />
                        <div>
                            <button type="button" class="btn btn-primary" onClick={addToCartHandler}>Add To Cart</button>
                            <button type="button" class="btn btn-secondary" onClick={addToFavoritesHandler}>Add To BookMark</button>
                            {/* <input type="button" value='Add To Cart 🛒' onClick={addToCartHandler} /> */}
                            {/* <input type="button" value='Add To Favorites ✰' onClick={addToFavoritesHandler} /> */}
                            <ToastContainer />
                        </div>
                        <hr />
                        <div>
                            {msgFavoritesCart ? msgFavoritesCart : ''}
                        </div>
                    </div>

                    //  </div> 
                    // )
                    // }) : <div style={{ textAlign: 'center', fontSize: "20px" }}> You have no books in the list to manage </div>
                }
            </div>

        </div>
    )
}
export default BookPage