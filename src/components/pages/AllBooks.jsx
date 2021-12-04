import React from "react";
import './style.css';
import BookPage from "./BookPage";

const AllBooks = ({ account, accounts, allBooks }) => {
    const [selectedBook, setSelectedBook] = React.useState(null); // working on

    const hhandler = (b) => {
        // console.log(b);
        setSelectedBook(b)
    }
    return (
        <div>
            <div style={{ textAlign: "center", padding: "6rem", fontSize: '20px' }}>
                <div>Top Week</div>
            </div>
            <div>
                <div id="grid">
                    {allBooks ? allBooks.map((b) => {
                        return (                           
                                <div key={b._id} className={'gridSon'} onClick={() => hhandler(b)}> {b.name} </div>                           
                        )
                    }) : ''}
                </div>
            </div>
            <div>
            {selectedBook ? <BookPage account={account} selectedBook={selectedBook} /> : ''}
            </div>
        </div>
    )
}

export default AllBooks