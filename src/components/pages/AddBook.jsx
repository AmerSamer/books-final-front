import React from "react";

const AddBook = ({ account , name, author, publishing, amount, language, category, desc, price, user  }) => {
    // const [books, setBooks] = React.useState(null);
    const [addBook, setAddBook] = React.useState({
        name: name,
        author: author,
        publishing:publishing,
        amount:amount,
        language:language,
        category:category,
        desc:desc,
        price:price,
        user: user
    });
    const addBookHandler = (e) => {
        setAddBook({
            ...addBook,
            [e.target.name]: (e.target.value)
        })
    }
    return (
        <>
            <div>
                <div style={{ textAlign: "center" }}>
                    Add New Book
                </div>
                <div style={{ textAlign: "center" }}>
                    <input type="text" name={'name'} onChange={addBookHandler}/> 
                    <input type="text" name={'author'} onChange={addBookHandler}/>
                    <input type="number" name={'publishing'} onChange={addBookHandler}/>  {/*  number  */}
                    <input type="number" min='1' name={'amount'} onChange={addBookHandler}/> {/*  number  */}
                    <input type="text" name={'language'} onChange={addBookHandler}/> 
                    <input type="text" name={'category'} onChange={addBookHandler}/> 
                    <input type="text" name={'desc'} onChange={addBookHandler}/> 
                    <input type="number" min='0' name={'price'} onChange={addBookHandler}/> {/*  number  */}
                    <input type="text" name={'user'} onChange={addBookHandler}/> 
    
                    {/* {books ? books.map((acct) => {
                        return (
                            <span>{acct.name} {acct.email} {acct.password}</span>
                        )
                    }) : ''} */}
                </div>
            </div>
        </>
    )
}

export default AddBook