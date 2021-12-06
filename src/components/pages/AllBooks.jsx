import React from "react";
import './style.css';
import BookPage from "./BookPage";
import Footer from "./Footer";
let higherPurchaseArrayHelper = [];
let randomBooksArrayHelper = [];
const AllBooks = ({ account, accounts, allBooks }) => {
    const [selectedBook, setSelectedBook] = React.useState(null);
    const [selectedBookNewest, setSelectedBookNewest] = React.useState(null);
    const [selectedBookAllBooksRandom, setSelectedBookAllBooksRandom] = React.useState(null);
    // let xx = shuffle(allBooks).slice(0,4)
    // let randomBooksArrayHelper = [xx];
    
    React.useEffect(() => {
        higherPurchaseSorting();
        shuffleRandomBooks();
    }, [])

    const topPurchasesHandler = (b) => {
        if (selectedBook) {
            if (selectedBook._id !== b._id) {
                setSelectedBook(b)
            } else {
                setSelectedBook(null)
            }
        } else {
            setSelectedBook(b)
        }
    }
    const newestBooksHandler = (b) => {
        if (selectedBookNewest) {
            if (selectedBookNewest._id !== b._id) {
                setSelectedBookNewest(b)
            } else {
                setSelectedBookNewest(null)
            }
        } else {
            setSelectedBookNewest(b)
        }
    }
    const randomBooksHandler = (b) => {
        if (selectedBookAllBooksRandom) {
            if (selectedBookAllBooksRandom._id !== b._id) {
                setSelectedBookAllBooksRandom(b)
            } else {
                setSelectedBookAllBooksRandom(null)
            }
        } else {
            setSelectedBookAllBooksRandom(b)
        }
    }
    const higherPurchaseSorting = () => {
        allBooks.map((b, index) => {
            return higherPurchaseArrayHelper.push(b.purchase)
        })
        return higherPurchaseArrayHelper.sort((a, b) => b - a)
    }
    const shuffle = (a) => {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
    const shuffleRandomBooks = () => {
        allBooks.map((b, index) => {
            return randomBooksArrayHelper.push(b)
        })
        shuffle(randomBooksArrayHelper)
    }
    
    return (
        <div>
            <div style={{ textAlign: "center", padding: "6rem", fontSize: '20px' }}>
                <div>Top Purchases</div>
            </div>
            {console.log("higherPurchaseArrayHelper",higherPurchaseArrayHelper)}
            <div>
                <div id="grid">
                    {allBooks ? allBooks.sort((a,b) => b-a).slice(0,4).map((b, index) => {
                        // (index === allBooks.length - 1 || index === allBooks.length - 2 || index === allBooks.length - 3 || index === allBooks.length - 4)
                        return (
                            // ((higherPurchaseArrayHelper.length !== 0) && (b.purchase === higherPurchaseArrayHelper[0] || b.purchase === higherPurchaseArrayHelper[1] || b.purchase === higherPurchaseArrayHelper[2] || b.purchase === higherPurchaseArrayHelper[3])) ? (
                                <div key={b._id} className={'gridSon'} onClick={() => topPurchasesHandler(b)}> {b.name} </div>
                            // ) : ''
                        )
                    }) : ''}
                </div>
                <div>
                    {(selectedBook) ? <BookPage account={account} selectedBook={selectedBook} /> : ''}
                </div>
            </div>
            <div style={{ textAlign: "center", padding: "6rem", fontSize: '20px' }}>
                <div>Newest Books</div>
            </div>
            <div>
                <div id="gridd">
                    {allBooks ? allBooks.map((b, index) => {
                        // (higherPurchaseArrayHelper.length !== 0) && (b.purchase === higherPurchaseArrayHelper[0] || b.purchase === higherPurchaseArrayHelper[1] || b.purchase === higherPurchaseArrayHelper[2] || b.purchase === higherPurchaseArrayHelper[3])
                        // (index === allBooks.length - 1 || index === allBooks.length - 2 || index === allBooks.length - 3 || index === allBooks.length - 4)
                        return (
                            ((index === allBooks.length - 1 || index === allBooks.length - 2 || index === allBooks.length - 3 || index === allBooks.length - 4)) ? (
                                <div key={b._id} className={'griddSon'} onClick={() => newestBooksHandler(b)}>
                                    {b.name}
                                </div>
                            ) : ''
                        )
                    }) : ''}
                </div>
                <div>
                    {(selectedBookNewest) ? <BookPage account={account} selectedBook={selectedBookNewest} /> : ''}
                </div>
            </div>
            <div style={{ textAlign: "center", padding: "6rem", fontSize: '20px' }}>
                <a href='/allBooks'><div>All Books Random</div></a>
            </div>
            <div>
                <div id="griddd">
                   {/* {console.log(randomBooksArrayHelper)} */}
                    {allBooks && randomBooksArrayHelper.length !== 0 ? randomBooksArrayHelper.map((b, index) => {
                        // (higherPurchaseArrayHelper.length !== 0) && (b.purchase === higherPurchaseArrayHelper[0] || b.purchase === higherPurchaseArrayHelper[1] || b.purchase === higherPurchaseArrayHelper[2] || b.purchase === higherPurchaseArrayHelper[3])
                        // (index === allBooks.length - 1 || index === allBooks.length - 2 || index === allBooks.length - 3 || index === allBooks.length - 4)
                        return (
                            (index === 0 || index === 1 || index === 2 || index === 3) ? (
                                <div key={b._id} className={'gridddSon'} onClick={() => randomBooksHandler(b)}>
                                    {b.name}
                                </div>
                            ) : ''
                        )
                    }) : ''}
                </div>
                <div>
                    {(selectedBookAllBooksRandom) ? <BookPage account={account} selectedBook={selectedBookAllBooksRandom} /> : ''}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AllBooks