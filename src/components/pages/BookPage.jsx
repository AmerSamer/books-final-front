import React from "react";
import axios from "axios";

const BookPage = ({ account, selectedBook }) => {
    const [allUserCarts, setAllUserCarts] = React.useState(null);
    const [msgFavoritesCart, setMsgFavoritesCart] = React.useState(null);
    const [fav, setFav] = React.useState(null);
    const [cart, setCart] = React.useState(null);
    React.useEffect(() => {
        getCartsUser();
    }, [cart])
    const getCartsUser = async () => {
        const response = await axios.get(`http://localhost:4001/books/store/getAllcartsByUser/${account._id}`);
        setAllUserCarts(response.data);
    }
    const addToFavoritesHandler = () => {
        // axios.put(`http://localhost:4001/books/store/addToFavorites/${selectedBook._id}`, (!selectedBook.favorites))
        //     .then((res) => {
        //         if (res.status === 200) {
        //             if(!fav){
        //                 setMsgFavoritesCart(`added To favorites Successfully`);
        //                 setFav(!fav);
        //             }else{
        //                 setMsgFavoritesCart(`Removed from favorites Successfully`);
        //                 setFav(!fav);
        //             }
        //         }
        //         else {
        //             alert("Something went wrong")
        //         }
        //     }).catch((err) => {
        //         setMsgFavoritesCart('ERROR')
        //     })
    }
    const addToCartHandler = () => {
        const found = allUserCarts.find((f) => ((f.user === account._id) && (f.book._id === selectedBook._id)))
        if (!found) {
            const newCart = {
                user: account._id,
                book: selectedBook._id,
                cart: true
            }
            axios.post(`http://localhost:4001/books/store/newCarts`, newCart)
                .then((res) => {
                    if (res.status === 200) {
                        setMsgFavoritesCart(`added To cart Successfully`);
                        setCart(true)
                    }
                    else {
                        alert("Something went wrong")
                    }
                }).catch((err) => {
                    setMsgFavoritesCart('ERR')
                })
        } else {
            setMsgFavoritesCart('This Book Already in your Cart')
        }
    }

    return (
        <div className="ui container">
            <div className="users-details">
                {
                    // allAccountBooks ? allAccountBooks.map((i, index) => {
                    // return (
                    // <div key={index} >
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
                                        <p>Amount: {selectedBook.amount > 0 ? <span style={{ color: 'green' }}>✔️ Available</span> : <span style={{ color: 'red' }}>Not Available</span>}</p>
                                        {/* <p>purchase: {selectedBook.purchase}</p> */}
                                    </div>
                                    <div className="extra">
                                        <p>rating: {selectedBook.rating}</p>
                                        <p>comments: {selectedBook.comments}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {/* Id: {selectedBook._id} <hr /> Upload Date: {selectedBook.bookUploadDate} */}
                            {/* id: {i.id} name: {i.name} userName: {i.userName} country: {i.country} total Amount: {total[index]} */}
                        </div>
                        <hr />
                        <div>
                            <select name="rating" id="rating">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            {/* <input type="text" placeholder='Something To Say...' /> */}
                            <input type="button" value='rate' />
                        </div>
                        <hr />
                        <div>
                            <input type="text" placeholder='Something To Say...' />
                            <input type="button" value='Add Comment' />
                        </div>
                        <hr />
                        <div>
                            <input type="button" value='Add To Cart 🛒' onClick={addToCartHandler} />
                            <input type="button" value='Add To Favorites ✰' onClick={addToFavoritesHandler} />
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