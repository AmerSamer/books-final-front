import React from 'react';
import Home from './Home';
import Route from './Route';
import Header from './Header';
import axios from 'axios';
// import Spinner from './Spinner';
import './style.css';
import styled from "styled-components";
import { AccountBox } from '../accountBox';
import Logout from './Logout';
import AddBook from './AddBook';
import BooksManagement from './BooksManagement';
// import BookPage from './BookPage';
import Chart from './Chart';
import Cart from './Cart';
import Favorites from './Favorites';
import SpecialBooks from './SpecialBooks';
import AllBooksPage from './AllBooksPage';
import Search from './Search';
import User from './User';
import SearchUser from './SearchUser';
// import {
//     BrowserRouter as Router,
//     Routes,
//     Route
// } from 'react-router-dom';
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
// let arr = []
const Main = () => {
    const [accounts, setAccounts] = React.useState(null);
    const [account, setAccount] = React.useState(null);
    const [accountExtra, setAccountExtra] = React.useState(null);
    // const [xx, setXx] = React.useState(null);
    const [allBooks, setAllBooks] = React.useState(null);
    const [allBooksByUser, setAllBooksByUser] = React.useState(null);
    const [allBooksByUserPurchase, setAllBooksByUserPurchase] = React.useState(null);
    const [addbBooktrue, setAddbBooktrue] = React.useState(false);

    // const [selectedBook, setSelectedBook] = React.useState(null);


    React.useEffect(() => {
        getDataAccounts();
        getAllBooks();

    }, [addbBooktrue])

    const getDataAccounts = async () => {
        const response = await axios.get(`https://books-store-back.herokuapp.com/books/store`);
        setAccounts(response.data);
        userActive(response.data)
    }

    const userActive = (data) => {
        const d = data.filter(f => f.active);
        setAccountExtra(d);
    }
    const getAllBooks = async () => {
        const response = await axios.get(`https://books-store-back.herokuapp.com/books/store/getAllBooks`);
        setAllBooks(response.data);
    }
    const addItem = () => {
        setAddbBooktrue(!addbBooktrue)
    }
    const getAllBooksByUser = async (id) => {
        const response = await axios.get(`https://books-store-back.herokuapp.com/books/store/getAllBooksUser/${id}`);
        let arrHelper = []
        let arrPurchase = []
        let labels = []
        arrHelper.push(response.data)
        for (let i = 0; i < arrHelper[0].length; i++) {
            labels.push((arrHelper[0][i].name))
            arrPurchase.push((arrHelper[0][i].purchase))
        }
        setAllBooksByUser(labels);
        setAllBooksByUserPurchase(arrPurchase)
        // setBooksNameChart(response.data);
    }
    const removeBookHandler = (id) => {
        // const allBooksArrayHelper = [...allBooks, book]
        // setAllBooks(allBooksArrayHelper)
        let copyItems = allBooks.filter((item) => {
            return item._id !== id
        })
        setAllBooks(copyItems)
    }
    ///////////////////////////
    const checkValid = (e) => {
        if ((e.target.value).length === 24) {
            if (accountExtra.length !== 0) {
                const dd = accountExtra.filter(f => f._id === (e.target.value));
                setAccount(dd[0])
                if (dd.length !== 0) {
                    getAllBooksByUser(dd[0]._id)
                } else {
                    console.log("Errorrrrrrrrrrrrrrrrrrr");
                }

            }
        }
    }

    ///////////////////////////////
    return (
        // <div className="ui container">
        // <Router>
        <div className="ui segment">
            {/* main menu */}
            <Header />
            <div className="ui segment">
                {/* <Routes> */}
                <Route path="/">
                    {
                        (account && allBooks) ? <Home account={account} accounts={accounts} allBooks={allBooks} /> : ''
                    }
                </Route>
                <Route path="/login">
                    {
                        <AppContainer>
                            <AccountBox />
                        </AppContainer>
                    }
                </Route>
                <Route path="/logout">
                    {
                        account ? <Logout account={account} /> : ''
                    }
                </Route>
                <Route path="/newbook">
                    {
                        (account && allBooks) ? <AddBook account={account} accounts={accounts} allBooks={allBooks} addItem={addItem} /> : ''
                    }
                </Route>
                <Route path="/booksmanagement">
                    {
                        // working on
                        (account) ? <BooksManagement account={account} allBooks={removeBookHandler} /> : ''
                    }
                </Route>
                <Route path="/chart">
                    {
                        // working on
                        (account && allBooksByUser && allBooksByUserPurchase) ? <Chart account={account} allBooksByUser={allBooksByUser} allBooksByUserPurchase={allBooksByUserPurchase} /> : ''
                    }
                </Route>
                <Route path="/cart">
                    {
                        (account) ? <Cart account={account} /> : ''
                    }
                </Route>
                <Route path="/favorites">
                    {
                        (account) ? <Favorites account={account} /> : ''
                    }
                </Route>
                <Route path="/specialBooks">
                    {
                        (account && allBooks) ? <SpecialBooks account={account} allBooks={allBooks} /> : ''
                    }
                </Route>
                <Route path="/allBooks">
                    {
                        (account && allBooks) ? <AllBooksPage account={account} allBooks={allBooks} /> : ''
                    }
                </Route>
                <Route path="/search">
                    {
                        (account && allBooks) ? <Search account={account} allBooks={allBooks} /> : ''
                    }
                </Route>
                <Route path="/searchUser">
                    {
                        (account && allBooks && accounts) ? <SearchUser account={account} allBooks={allBooks} accounts={accounts} /> : ''
                    }
                </Route>
                <Route path="/notification">
                    {
                        (account && allBooks) ? <User account={account} allBooks={allBooks} /> : ''
                    }
                </Route>
                {/* </Routes> */}
                {!account ? (
                    <div>
                       
                        <div className="ui form">
                            <div className="three fields">
                                <div className="field" style={{textAlign: 'center', margin: '5% auto'}}>
                                    <label>You need to LOGIN, and then, enter the SECRET CODE in this field</label>
                                    <input type="text" id={'validSecretKey'} placeholder="Secret Key..." onChange={checkValid} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : ''}

            </div>
        </div >
        // </Router>
        //</div> 

    )
}

export default Main;