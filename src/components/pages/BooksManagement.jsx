import React from 'react';
import Spinner from './Spinner'
import axios from 'axios';
import './style.css';

function BooksManagement({ account }) {
    const [allAccountBooks, setAllAccountBooks] = React.useState(null);

    React.useEffect(() => {
        getBooksAccount();
    }, [])
    const getBooksAccount = async () => {
        const response = await axios.get(`http://localhost:4001/books/store/getAllBooksUser/${account._id}`); // working on
        setAllAccountBooks(response.data);
    }
    const updateBookHandler = () => {

    }
    const removeBookHandler = () => {

    }

    return (
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
                                                    <p>comments: {i.comments}</p>
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
                                        <input type="button" className="removeBook" value="Remove" onClick={removeBookHandler} />
                                        <input type="button" className="editBook" value="Edit" onClick={updateBookHandler} />
                                        {/* {popUp ? <PopUp toggle={removeBookHandler} /> : null} */}
                                    </div>
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