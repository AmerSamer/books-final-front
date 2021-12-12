import React from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Favorites = ({ account }) => {
    const [allUserFavorites, setAllUserFavorites] = React.useState(null);
    const [allUserCarts, setAllUserCarts] = React.useState(null);
    const [refresh, setRefresh] = React.useState(null);

    React.useEffect(() => {
        getFavoritesUser();
        getCartUser();
    }, [refresh])
    const getFavoritesUser = async () => {
        const response = await axios.get(`https://books-store-back.herokuapp.com/books/store/getAllFavoritesByUser/${account._id}`);
        setAllUserFavorites(response.data);
    }
    const getCartUser = async () => {

        const response = await axios.get(`https://books-store-back.herokuapp.com/books/store/getAllcartsByUser/${account._id}`);
        setAllUserCarts(response.data);
        console.log("response.data", response.data);
    }
    const removeBookFavoritesHandler = (id, name) => {
        axios.put(`https://books-store-back.herokuapp.com/books/store/updateUserFavorites/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    // setDeleteMsg(`Deleted ${name}, was made successfully`)
                    notify(`Deleted ${name} from favorites, was made successfully`)
                    setRefresh(!refresh)
                }
                else {
                    // alert("Something went wrong")
                    notify("Something went wrong")
                }
            }).catch((err) => {
                notify("ERROR")
                // setDeleteMsg('ERROR')
            })
    }
    const addToCartHandler = (book) => {
        console.log("id", book);
        const found = allUserCarts.find((f) => ((f.user === account._id) && (f.book._id === book._id)))
        if (!found) {
            const newCart = {
                user: account._id,
                book: book._id,
                cart: true
            }
            axios.post(`https://books-store-back.herokuapp.com/books/store/newCarts`, newCart)
                .then((res) => {
                    if (res.status === 200) {
                        notify("added To cart Successfully")
                        // setMsgFavoritesCart(`added To cart Successfully`);
                        setRefresh(!refresh)
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
    const notify = (ms) => toast(ms);
    return (
        <>
            <div>
                Hello, @{account.name}
                <hr />
            </div>
            <div className="ui container">
                <div style={{ letterSpacing: "7px", textAlign: "center", padding: "1rem", fontSize: '23px' }}>
                    BookMarks
                </div>
                {/* <div style={{ textAlign: 'center', color: 'black', fontSize: '20px' }}>Your Favorites:</div><br /> */}
                <div className="users-details">
                    {
                        allUserFavorites ? allUserFavorites.map((i, index) => {
                            if (i.favorites) {
                                return (
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
                                                            {/* <p>comments: {i.book.comments}</p> */}
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
                                                {/* <input type="button" value="-" onClick={()=>minusCount(i._id)}/><input type="number" value={count}/><input type="button"  value="+" onClick={plusCount} /> */}
                                                {/* <input type="button" className="removeBook" value="Remove" onClick={() => removeBookFavoritesHandler(i._id, i.book.name)} /> */}
                                                <button type="button" class="btn btn-danger" onClick={() => removeBookFavoritesHandler(i._id, i.book.name)}>Remove</button>
                                                <button type="button" class="btn btn-primary" onClick={() => addToCartHandler(i.book)}>Add To Cart</button>
                                                <ToastContainer />
                                                {/* <input type="button" className="editBook" value="Edit" onClick={() => updateBookHandler(i._id, i.name)} /> */}
                                                {/* {popUp ? <PopUp toggle={removeBookHandler} /> : null} */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }) : <div style={{ textAlign: 'center', fontSize: "20px" }}> You have no books in the list to manage </div>
                    }

                </div>

            </div>
        </>
    )
}

export default Favorites