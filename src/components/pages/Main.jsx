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
    const [allBooks, setAllBooks] = React.useState(null);
    React.useEffect(() => {
        getDataAccounts();
        // getAllBooks();
    }, [])

    const getDataAccounts = async () => {
        const response = await axios.get(`http://localhost:4001/books/store`);
        setAccounts(response.data);
        userActive(response.data)
    }
    const userActive = (data) => {
        const d = data.find(f => f.active)
        setAccount(d);
    }
    const getAllBooks = async () => {
        const response = await axios.get(`http://localhost:4001/books/store`);
        setAllBooks(response.data);
        // userActive(response.data)
    }

    return (
            // <div className="ui container">

                 <div className="ui segment">

                    {/* main menu */}
                    <Header />

                    <div className="ui segment">
                                        
                        <Route path="/">
                            {
                               account ? <Home account={account} /> : 'You Should to Log In To see Content'
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
                              account ? <Logout account={account}/> : 'You are not login!'
                            }
                        </Route>     
                        <Route path="/newbook">
                            {
                              account ? <AddBook account={account}/> : 'You are not login!'
                            }
                        </Route>           
                    </div>
                 </div>
             //</div> 
        )
}

export default Main;