import React from "react";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileUpload from "../uploads/FileUpload";
import DragDrop from "../uploads/DragDrop";
// import FileUpload from "../uploadImage/FileUpload";

const AddBook = ({ account, addItem, allBooks, accounts,img, name, author, publishing, amount, language, category, desc, price, user }) => {
    // const [allBooks, setAllBooks] = React.useState(null);
    // const [refresh, setRefresh] = React.useState(null);
    const [msg, setMsg] = React.useState('')
    const [addBook, setAddBook] = React.useState({
        img:img,
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
                                    img: addBook.img,
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
    const axx = (e) => {
        console.log(e.target.file);
    }
    const notify = () => toast(`Book ${addBook.name}, was added successfully`);

    return (
        <>
            <div>
                {console.log(addBook.img)}
                <div style={{ textAlign: "center" }}>
                    Add New Book
                </div>
                <div style={{ textAlign: "center" }}>
                
                    {/* Image:<input type="file" name='img' id='img' onChange={axx}/> <br /> */}
                    Book Name: <input type="text" name={'name'} onChange={addBookHandler} /> <br />
                    author: <input type="text" name={'author'} onChange={addBookHandler} /><br />
                    publishing Date: <input type="number" name={'publishing'} onChange={addBookHandlerInt} /><br />  {/*  number  */}
                    amount: <input type="number" min='1' name={'amount'} onChange={addBookHandlerInt} /><br /> {/*  number  */}
                    language: <input type="text" name={'language'} onChange={addBookHandler} /> <br />
                    category: <input type="text" name={'category'} onChange={addBookHandler} /> <br />
                    desc: <input type="text" name={'desc'} onChange={addBookHandler} /> <br />
                    price: <input type="number" min='0' name={'price'} onChange={addBookHandlerInt} /><br /> {/*  number  */}
                    {/* user email: <input type="text" name={'user'} onChange={addBookHandler} /> <br /> */}
                    
                    <input type="button" value='Add Book' onClick={addBookSubmitHandler} /><br />
                    {msg ? msg : ''}
                    <ToastContainer />
                    {/* <FileUpload/> */}
                    <DragDrop/>
                </div>
            </div>
        </>
    )
}

export default AddBook