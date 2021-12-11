import React from "react";
import BookPage from "./BookPage";
let allBooksArrayHelper = []
// import {useParams} from "react-router-dom"
const Search = ({ account, allBooks }) => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [books, setBooks] = React.useState([]);
    // const [bookSearchSelected, setBookSearchSelected] = React.useState(null);
    const [selectedBookk, setSelectedBookk] = React.useState(null);


    React.useEffect(() => {
        allBooksArr()
    }, []);

    const allBooksArr = () => {
        allBooksArrayHelper = []
        allBooks.map((p) => {
            return allBooksArrayHelper.push(p)
        })
        setBooks(allBooksArrayHelper);
    };

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    const booksFilterhandleClick = (e) => {
        if (e.keyCode === 13) {
            const results = books.filter(b =>
                b.name.toLowerCase().includes(searchTerm.toLowerCase()) || b.author.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);
        }
    };
    const x = (b) => {
        if (selectedBookk) {
            if (selectedBookk._id !== b._id) {
                setSelectedBookk(b)
            } else {
                setSelectedBookk(null)
            }
        } else {
            setSelectedBookk(b)
        }
    }

    return (
        <>
            <div>
                Hello, {account.name}
                <hr />
            </div>
            {/* <div style={{ textAlign: 'center', padding: '1em' }}>
                <input type="search" name="search" id="search" placeholder=" Search" value={searchTerm} onChange={handleChange} />
                <input type="button" className="searchIcon" value="🔍" onClick={booksFilterhandleClick} />
            </div> */}

            {/* ///////////// */}
            Look for your book
            <div style={{ padding: '1rem' }}>
                <div className="ui search">
                    <div className="ui icon input">
                        <input className="prompt" type="text" placeholder="Search..." value={searchTerm} onChange={handleChange} onKeyUp={booksFilterhandleClick} />
                        <i className="search icon"></i>
                    </div>
                    {/* <div class="results"></div> */}
                </div>
            </div>
            {/* ////////////////// */}
            {searchResults ? searchResults.map((allB, index) => {
                return (
                    <div key={index} >
                        <div className="ui segment" onClick={() => x(allB)}>
                            <div className="ui divided items">
                                <div className="item" >
                                    <div className="image">
                                        <div style={{
                                            backgroundImage: `url(${allB.img})`,
                                            height: '100%',
                                            width: '100%',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }}></div>
                                    </div>
                                    <div className="content" >
                                        <p className="header">Name: {allB.name}</p>
                                        <div className="meta">
                                            <span>author: {allB.author}</span>
                                        </div>
                                        <div className="description">
                                            <p>Publishing Date: {allB.publishing}</p>
                                            <p>language: {allB.language}</p>
                                            {/* <p>category: {i.category}</p> */}
                                            {/* <p>desc: {i.desc}</p> */}
                                            {/* <p>price: {i.price}</p> */}
                                            {/* <p>Amount: {i.amount}</p> */}
                                            {/* <p>purchase: {i.purchase}</p> */}
                                        </div>
                                        <div className="extra">
                                            {/* <p>rating: {i.rating}</p> */}
                                            {/* <p>comments: <div>{i.comments.map((com) => {
                                                return <p key={com}>{com}</p>
                                            })}</div></p> */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div>
                            {((selectedBookk) && (selectedBookk._id === allB._id)) ? <BookPage account={account} selectedBook={selectedBookk} /> : ''}
                        </div>


                    </div>

                )
            }) : ''}

        </>
    )
}
export default Search