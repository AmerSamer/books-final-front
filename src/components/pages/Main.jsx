import React from 'react';
import Home from './Home';

// import AddNewAcount from './AddNewAcount';
// import AccountsDepositOrWithdrawal from './AccountsDepositOrWithdrawal';
// import Credit from './Credit';
// import Transfer from './Transfer';
// import GetAccountById from './GetAccountById';
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
import BookPage from './BookPage';
import Chart from './Chart';
import Cart from './Cart';
import Favorites from './Favorites';
import SpecialBooks from './SpecialBooks';
import AllBooksPage from './AllBooksPage';
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Main = ({ }) => {
    const [accounts, setAccounts] = React.useState(null);
    const [account, setAccount] = React.useState(null);
    const [allBooks, setAllBooks] = React.useState(null);
    const [allBooksByUser, setAllBooksByUser] = React.useState(null);
    const [allBooksByUserPurchase, setAllBooksByUserPurchase] = React.useState(null);

    
    // const [selectedBook, setSelectedBook] = React.useState(null);


    React.useEffect(() => {
        getDataAccounts();
        getAllBooks();
        // getAllBooksByUser();
    }, [])

    const getDataAccounts = async () => {
        const response = await axios.get(`http://localhost:4001/books/store`);
        setAccounts(response.data);
        userActive(response.data)
    }
    const userActive = (data) => {
        const d = data.find(f => f.active)
        setAccount(d);
        if(d){
            getAllBooksByUser(d._id)
        }
        // getAllBooksByUser(d._id)
    }
    const getAllBooks = async () => {
        const response = await axios.get(`http://localhost:4001/books/store/getAllBooks`);
        setAllBooks(response.data);
    }
    const getAllBooksByUser = async (id) => {
        const response = await axios.get(`http://localhost:4001/books/store/getAllBooksUser/${id}`);
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

    return (
        // <div className="ui container">

        <div className="ui segment">

            {/* main menu */}
            <Header />

            <div className="ui segment">

                <Route path="/">
                    {
                        (account && allBooks) ? <Home account={account} accounts={accounts} allBooks={allBooks} /> : 'You Should to Log In To see Content'
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
                        account ? <Logout account={account} /> : 'You are not login!'
                    }
                </Route>
                <Route path="/newbook">
                    {
                        (account && allBooks) ? <AddBook account={account} accounts={accounts} allBooks={allBooks} /> : 'You are not login!'
                    }
                </Route>
                <Route path="/booksmanagement">
                    {
                        // working on
                        (account) ? <BooksManagement account={account} allBooks={removeBookHandler} /> : 'You are not login!'
                    }
                </Route>
                <Route path="/chart">
                    {
                        // working on
                        (account && allBooksByUser && allBooksByUserPurchase) ? <Chart account={account} allBooksByUser={allBooksByUser} allBooksByUserPurchase={allBooksByUserPurchase}/> : 'You are not login!'
                    }
                </Route>
                <Route path="/cart">
                    {
                        (account) ? <Cart account={account} /> : 'You are not login!'
                    }
                </Route>
                <Route path="/favorites">
                    {
                        (account) ? <Favorites account={account} /> : 'You are not login!'
                    }
                </Route>
                <Route path="/specialBooks">
                    {
                        (account && allBooks) ? <SpecialBooks account={account} allBooks={allBooks}/> : 'You are not login!'
                    }
                </Route>
                <Route path="/allBooks">
                    {
                        (account && allBooks) ? <AllBooksPage account={account} allBooks={allBooks}/> : 'You are not login!'
                    }
                </Route>
            </div>
        </div>
        //</div> 
    )
}

export default Main;