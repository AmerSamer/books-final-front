import React from "react";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBook = ({ account, addItem, allBooks, accounts, name, author, publishing, amount, language, category, desc, price, user }) => {
    // const [allBooks, setAllBooks] = React.useState(null);
    const [msg, setMsg] = React.useState('')
    const [addBook, setAddBook] = React.useState({
        name: name,
        author: author,
        publishing: publishing,
        amount: amount,
        language: language,
        category: category,
        desc: desc,
        price: price,
        // user: account._id
    });
    const [img, setImg] = React.useState(null);

    const addBookHandler = (e) => {
        setAddBook({
            ...addBook,
            [e.target.name]: (e.target.value)

        })
    }
    const addBookHandlerInt = (e) => {
        setAddBook({
            ...addBook,
            [e.target.name]: parseInt(e.target.value)

        })
    }
    const addBookSubmitHandler = () => {
        // allBooks.find((n) => console.log(n.user))
        // console.log(addBook);
        if (addBook.name && addBook.author && addBook.publishing && addBook.amount && addBook.language && addBook.category && addBook.price) {
            if ((addBook.publishing >= 1500) && (addBook.publishing <= 2021)) {
                if (addBook.amount > 0) {
                    if (addBook.price > 0) {
                        const find = accounts.find((f) => f.email === account.email)
                        if (find) {
                            const findBookNameDup = allBooks.find((n) => (n.name === addBook.name) && (n.user === account._id))
                            if (!findBookNameDup) {
                                const idFind = find._id;
                                const bookNewAdd = {
                                    // img: addBook.img,
                                    name: addBook.name,
                                    author: addBook.author,
                                    publishing: addBook.publishing,
                                    amount: addBook.amount,
                                    language: addBook.language,
                                    category: addBook.category,
                                    desc: addBook.desc,
                                    price: addBook.price,
                                    user: idFind
                                }
                                axios.post(`https://books-store-back.herokuapp.com/books/store/newBook`, bookNewAdd)
                                    .then((res) => {
                                        if (res.status === 200) {
                                            setMsg(`Book ${addBook.name}, was added successfully`)
                                            addItem()
                                            // alert(`Book ${addBook.name}, was added successfully`)
                                            // window.location.reload(false);
                                            notify()
                                        }
                                        else {
                                            alert("Something went wrong")
                                        }
                                    }).catch((err) => {
                                        setMsg('ERROR')
                                    })
                            } else {
                                setMsg(`${addBook.name} already exist`)
                            }
                        } else {
                            setMsg('Email Not Valid')
                        }
                    } else {
                        setMsg('please put positive price')
                    }
                } else {
                    setMsg('please enter positive amount of this books that you have in your stock')
                }
            } else {
                setMsg('publishing Date should be [1500-2021]')
            }
        } else {
            setMsg('You Should Fill in all the inputs')
        }
    }
    const handelClick = () => {
        if (addBook.name && addBook.author && addBook.publishing && addBook.amount && addBook.language && addBook.category && addBook.price) {
            if ((addBook.publishing >= 1500) && (addBook.publishing <= 2021)) {
                if (addBook.amount > 0) {
                    if (addBook.price > 0) {
                        const find = accounts.find((f) => f.email === account.email)
                        if (find) {
                            const findBookNameDup = allBooks.find((n) => (n.name === addBook.name) && (n.user === account._id))
                            if (!findBookNameDup) {
                                const sa3da = new FormData()
                                sa3da.append('name', addBook.name)
                                sa3da.append('author', addBook.author)
                                sa3da.append('publishing', addBook.publishing)
                                sa3da.append('amount', addBook.amount)
                                sa3da.append('language', addBook.language)
                                sa3da.append('category', addBook.category)
                                sa3da.append('desc', addBook.desc)
                                sa3da.append('price', addBook.price)
                                sa3da.append('user', account._id)
                                // sa3da.append('img', img)

                                axios.post('https://books-store-back.herokuapp.com/books/store/newBook', sa3da, {
                                    headers: {
                                        'content-type': 'multipart/form-data'
                                    }
                                })
                                    .then(res => {
                                        if (res.status === 200) {
                                            setMsg(`Book ${addBook.name}, was added successfully`)
                                            addItem()
                                            notify(`Book ${addBook.name}, was added successfully`)
                                        }
                                        else {
                                            notify("Something went wrong")
                                        }
                                    }).catch(e => {
                                        notify('ERROR')
                                    })
                            } else {
                                notify(`${addBook.name} already exist`)
                            }
                        } else {
                            notify('Email Not Valid')
                        }
                    } else {
                        notify('please put positive price')
                    }
                } else {
                    notify('please enter positive amount of this books that you have in your stock')
                }
            } else {
                notify('publishing Date should be [1500-2021]')
            }
        } else {
            notify('You Should Fill in all the inputs')
        }
        /////////////////////////////////////
        // const sa3da = new FormData()
        // sa3da.append('name', addBook.name)
        // sa3da.append('author', addBook.author)
        // sa3da.append('publishing', addBook.publishing)
        // sa3da.append('amount', addBook.amount)
        // sa3da.append('language', addBook.language)
        // sa3da.append('category', addBook.category)
        // sa3da.append('desc', addBook.desc)
        // sa3da.append('price', addBook.price)
        // sa3da.append('user', account._id)

        // sa3da.append('img', img)
        // axios.post('https://books-store-back.herokuapp.com/books/store/newBook', sa3da, {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // })
        //     .then(res => {
        //         console.log(res)
        //     }).catch(e => {
        //         console.log(e)
        //     })
    }

    const notify = (ms) => toast(ms);

    return (
        <>
            <div>
                Hello, @{account.name}
                <hr />
            </div>
            <div>
                <div style={{ letterSpacing: "7px", textAlign: "center", padding: "1rem", fontSize: '23px' }}>
                    Add New Book
                </div>
                <form class="ui form" style={{ textAlign: 'center' }} />
                <h4 class="ui dividing header">Book Information</h4>
                <div class="field">
                    <label>Name</label>
                    <div class="two fields">
                        <div class="field">
                            <input type="text" name="name" placeholder="First Name" onChange={addBookHandler} />
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label>Author</label>
                    <div class="fields">
                        <div class="twelve wide field">
                            <input type="text" name="author" placeholder="Author Name" onChange={addBookHandler} />
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label>Publishing Date</label>
                    <div class="fields">
                        <div class="twelve wide field">
                            <input type="number" name="publishing" placeholder="Publishing Date" onChange={addBookHandlerInt} />
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label>Category</label>
                    <div class="fields">
                        <div class="twelve wide field">
                            <input type="text" name="category" placeholder="Category" onChange={addBookHandler} />
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label>Desc</label>
                    <div class="fields">
                        <div class="twelve wide field">
                            <input type="text" name="desc" placeholder="Desc" onChange={addBookHandler} />
                        </div>
                    </div>
                </div>


            </div>
            <h4 class="ui dividing header">More Book Information</h4>

            <div class="fields">
                <div class="field">
                    <label>Language</label>
                    <div class="fields">
                        <div class="twelve wide field">
                            <input type="text" name="language" placeholder="Language" onChange={addBookHandler} />
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label>Price</label>
                    <div class="fields">
                        <div class="twelve wide field">
                            <input type="number" name="price" placeholder="Price" onChange={addBookHandlerInt} />
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label>Amount</label>
                    <div class="fields">
                        <div class="twelve wide field">
                            <input type="number" name="amount" placeholder="Amount" onChange={addBookHandlerInt} />
                        </div>
                    </div>
                </div>

            </div>
             <h4 class="ui dividing header">Image</h4>
            <div class="field">
            <input type='file' name='image'/>
                {/* <input type='file' name='image' onChange={(e) => {
                    console.log('file', e.target.files[0])
                    setImg(e.target.files[0])
                }} 
                />*/}
            </div>
            <hr /> 
            {/* <hr /> */}
            {/* <input type="button" value='Add Book' onClick={handelClick} /> */}
            <button type="button" class="btn btn-secondary" onClick={addBookSubmitHandler}>Add Book</button>
            {/* <div class="ui button" tabindex="0" onClick={handelClick}>Submit Order</div> */}
            <ToastContainer />

            {/* <div style={{ textAlign: "center" }}>
                    Book Name: <input type="text" name={'name'} onChange={addBookHandler} /> <br />
                    author: <input type="text" name={'author'} onChange={addBookHandler} /><br />
                    publishing Date: <input type="number" name={'publishing'} onChange={addBookHandlerInt} /><br />  
                    amount: <input type="number" min='1' name={'amount'} onChange={addBookHandlerInt} /><br /> 
                    language: <input type="text" name={'language'} onChange={addBookHandler} /> <br />
                    category: <input type="text" name={'category'} onChange={addBookHandler} /> <br />
                    desc: <input type="text" name={'desc'} onChange={addBookHandler} /> <br />
                    price: <input type="number" min='0' name={'price'} onChange={addBookHandlerInt} /><br /> 

                    <input type="button" value='Add Book' onClick={handelClick} /><br />
                    {msg ? msg : ''}
                    <ToastContainer />
                    Image:<input type='file' name='image' onChange={(e) => {
                        console.log('file', e.target.files[0])
                        setImg(e.target.files[0])
                    }}
                    />
                </div> */}
            {/* </div > */}
        </>
    )
}

export default AddBook