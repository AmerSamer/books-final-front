import React from "react";
import axios from "axios";

const Favorites = ({ account }) => {
    const [allUserFavorites, setAllUserFavorites] = React.useState(null);
    // const [count, setCount] = React.useState(0);
    const [refresh, setRefresh] = React.useState(null);
    const [deleteMsg, setDeleteMsg] = React.useState(null);

    React.useEffect(() => {
        getFavoritesUser();
    }, [refresh])
    const getFavoritesUser = async () => {
        const response = await axios.get(`https://books-store-back.herokuapp.com/books/store/getAllFavoritesByUser/${account._id}`);
        setAllUserFavorites(response.data);
    }

    const removeBookFavoritesHandler = (id, name) => {
        axios.put(`https://books-store-back.herokuapp.com/books/store/updateUserFavorites/${id}`)
        .then((res) => {
            if (res.status === 200) {
                setDeleteMsg(`Deleted ${name}, was made successfully`)
                setRefresh(true)
            }
            else {
                alert("Something went wrong")
            }
        }).catch((err) => {
            setDeleteMsg('ERROR')
        })
    }

    return (
        <>
            <div className="ui container">
                {deleteMsg ? <div style={{ textAlign: 'center', color: 'green', fontSize: '20px' }}>{deleteMsg}</div> : ''}
                <div style={{ textAlign: 'center', color: 'black', fontSize: '20px' }}>Your Favorites:</div><br />
                {/* {allUserCarts ? console.log(allUserCarts) : ''} */}
                {/* {msg ? <div style={{ textAlign: 'center', color: 'green', fontSize: '20px' }}>{msg}</div> : ''} */}
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
                                                        {/* <div style={{
                                                    backgroundImage: `url(${i.avatar})`,
                                                    height: '150px',
                                                    width: '150px',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat'
                                                }}></div> */}
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
                                                            <p>comments: {i.book.comments}</p>
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
                                                <input type="button" className="removeBook" value="Remove" onClick={() => removeBookFavoritesHandler(i._id, i.book.name)} />
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