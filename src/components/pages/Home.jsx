import React from 'react';
import AllBooks from './AllBooks';
import Link from './Link';
// import { Link } from "react-router-dom"
import Search from './Search';
import './style.css'
/////////////
// let allBooksArrayHelper = []
/////////////
function Home({ account, accounts, allBooks }) {
    // const [searchTerm, setSearchTerm] = React.useState("");
    // const [searchResults, setSearchResults] = React.useState([]);
    // const [books, setBooks] = React.useState([]);
    // const [bookSearchSelected, setBookSearchSelected] = React.useState(null);
    // React.useEffect(() => {
    //     allBooksArr()
    // }, []);

    // const allBooksArr = () => {
    //     allBooksArrayHelper = []
    //     allBooks.map((p) => {
    //         return allBooksArrayHelper.push(p)
    //     })
    //     setBooks(allBooksArrayHelper);
    // };

    // const handleChange = event => {
    //     setSearchTerm(event.target.value);
    // };
    // const booksFilterhandleClick = () => {
    //     const results = books.filter(b =>
    //         b.name.toLowerCase().includes(searchTerm)
    //     );
    //     setSearchResults(results);
    // };
    // const searchItemSelected = (id) => {
    //     setBookSearchSelected(id)
    // };
    return (
        <div>
            <div style={{ width: "100%", height: "600px", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: `url(https://images.pexels.com/photos/626986/pexels-photo-626986.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)` }}>
                <div className='welcomeUser'>welcome {account.name}</div>
                <div style={{ textAlign: 'center', padding: '100px', fontSize: '2em', color: 'white' }}>
                    Support Local Bookstores.<br /><br /> Shop Online with Bookshop.
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Link className="item" href="/search">
                        {/* <input type="button" className='serachButton' value='search for your book' /> */}
                        <button type="button" class="btn btn-primary">Search Book</button>
                    </Link>
                    {/* <input type="search" name="search" id="search" placeholder=" Search" value={searchTerm} onChange={handleChange} /> */}
                    {/* <input type="button" className="searchIcon" value="🔍" onClick={booksFilterhandleClick} /> */}
                </div>
                {/* <div style={{ textAlign: 'center', marginTop: '1em' }}>
                    {searchResults.length !== 0 ? searchResults.map(item => (
                        <div key={item._id} style={{ textAlign: 'center', color: 'white', fontSize: '1rem', backgroundColor: 'black' }} onClick={() => searchItemSelected(item._id)}>
                            <Link className="item" href="/search">
                                    {item.name}
                                </Link> 
                        </div>
                    )) : ''}
                </div> */}


            </div>
            <Link className="item" href="/specialBooks">
                <div className={'animation'}></div>
            </Link>
            {/* <Link className="item" href="/search">
                {bookSearchSelected ? <Search account={account} bookSearchSelected={bookSearchSelected}/> : ''}
            </Link> */}
            <AllBooks account={account} accounts={accounts} allBooks={allBooks} />
        </div>
    );
}

export default Home;