import React from 'react';
import AllBooks from './AllBooks';
import './style.css'
function Home({ account, accounts, allBooks }) {
 
    return (
        <div>
            <div style={{ width: "100%", height: "600px", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: `url(https://images.pexels.com/photos/626986/pexels-photo-626986.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)` }}>
                <div className='welcomeUser'>welcome {account.name}</div>
                <div style={{ textAlign: 'center', padding: '100px', fontSize: '2em', color: 'white' }}>
                    Support Local Bookstores.<br /><br /> Shop Online with Bookshop.
                </div>
                <div style={{ textAlign: 'center' }}>
                    <input type="search" name="search" id="search" placeholder=" Search" />
                    <input type="button" className="searchIcon" value="🔍" />
                </div>
            </div>
            <div className={'animation'}>

                </div>
            <AllBooks account={account} accounts={accounts} allBooks={allBooks}/>
        </div>
    );
}

export default Home;