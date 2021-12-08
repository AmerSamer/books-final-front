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

const Main = ({}) => {
    const [accounts, setAccounts] = React.useState(null);
    const [account, setAccount] = React.useState(null);
    const [accountExtra, setAccountExtra] = React.useState(null);
    const [xx, setXx] = React.useState(null);
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
        const response = await axios.get(`https://books-store-back.herokuapp.com/books/store`);
        setAccounts(response.data);
        userActive(response.data)
    }
    const userActive = (data) => {
        const d = data.filter(f => f.active);
        // const d = data.map((f)=>{
        //     if(f.active){
        //         return f
        //     }else{
        //         return null
        //     } 
        //     // return f
        // })
        // const d = data.find(f => f.active)
        setAccountExtra(d);
        // if(d){
        //     getAllBooksByUser(d._id)
        // }
        
    }
    const getAllBooks = async () => {
        const response = await axios.get(`https://books-store-back.herokuapp.com/books/store/getAllBooks`);
        setAllBooks(response.data);
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
        // console.log(accountExtra);
        if((e.target.value).length === 24){
            if(accountExtra.length !== 0){
                const dd = accountExtra.filter(f => f._id===(e.target.value));
                console.log(dd[0]);
                setAccount(dd[0])
                // accountExtra.map((bon)=>{
                //     console.log(bon._id)
                //  })
            }
        }
        // setXx(e.target.value)
    //    console.log(e.target.value); 
    }
    const checkValidClick = () => {
        // accountExtra.length !== 0&&xx ? (accountExtra.map((bon)=>{
        //    return bon._id===xx
        // })) : ''
    }
    ///////////////////////////////
    return (
        // <div className="ui container">

        <div className="ui segment">
            
        {/* {console.log(userLogin)} */}
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
                <div>
                    <input type="text" name="" id="" onChange={checkValid}/>
                    <input type="button" name="" value="enter" onClick={checkValidClick}/>
                </div>
            </div>
        </div>
        //</div> 
    )
}

export default Main;