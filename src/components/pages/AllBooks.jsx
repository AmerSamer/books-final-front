import React from "react";
import './style.css';
import BookPage from "./BookPage";
import Footer from "./Footer";
import Link from "./Link";
// let higherPurchaseArrayHelper = [];
let xy = [];
let xyz = [];
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

const AllBooks = ({ account, accounts, allBooks }) => {
    const [selectedBook, setSelectedBook] = React.useState(null);
    const [selectedBookNewest, setSelectedBookNewest] = React.useState(null);
    const [selectedBookAllBooksRandom, setSelectedBookAllBooksRandom] = React.useState(null);
    const [higherPurchase, setHigherPurchase] = React.useState([]);
    const [shuffleAll, setShuffleAll] = React.useState([]);

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
        xy = []
        for (let i = 0; i < allBooks.length; i++) {
            xy.push(allBooks[i].purchase);
        }
        setHigherPurchase(xy.sort((a, b) => b - a))
    }
    const shuffleRandomBooks = () => {
        xyz = []
        for (let i = 0; i < allBooks.length; i++) {
            xyz.push(allBooks[i]);
        }
        setShuffleAll(shuffle(xyz))
    }

    return (
        <div>
            <div style={{ textAlign: "center", padding: "6rem", fontSize: '20px' }}>
                <Link className="item" href="/allBooks">
                    All Books Random
                </Link>
            </div>
            <div>
                <div id="griddd">
                    {allBooks && shuffleAll ? shuffleAll.map((b, index) => {
                        return (
                            (index === 0 || index === 1 || index === 2 || index === 3 || index === 4) ? (
                                <div key={b._id} className={'gridddSon'} onClick={() => randomBooksHandler(b)}>
                                    <img src={`${b.img}`} style={{ height: '60vh', width: '100%' }} />
                                    <p className={'centeredText'}>{b.name}</p>
                                </div>
                            ) : ''
                        )
                    }) : ''}
                </div>
                <div>
                    {(selectedBookAllBooksRandom) ? <BookPage account={account} selectedBook={selectedBookAllBooksRandom} /> : ''}
                </div>
            </div>
            <div style={{ textAlign: "center", padding: "6rem", fontSize: '20px' }}>
                <div>Top Purchases</div>
            </div>
            <div>
                <div id="grid">
                    {((allBooks) && (higherPurchase.length !== 0)) ? allBooks.map((b, index) => {
                        return (
                            ((higherPurchase.length !== 0) && (b.purchase === higherPurchase[0] || b.purchase === higherPurchase[1] || b.purchase === higherPurchase[2] || b.purchase === higherPurchase[3])) ? (
                                <div key={b._id} className={'gridSon'} onClick={() => topPurchasesHandler(b)} style={{ backgroundColor: "transparent" }}>
                                    <img src={`${b.img}`} style={{ height: '60vh', width: '100%' }} />
                                    <p className={'centeredText'}>{b.name}</p>

                                </div>
                            ) : ''
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
                        return (
                            ((index === allBooks.length - 1 || index === allBooks.length - 2 || index === allBooks.length - 3 || index === allBooks.length - 4 || index === allBooks.length - 5)) ? (
                                <div key={b._id} className={'griddSon'} onClick={() => newestBooksHandler(b)}>
                                    <img src={`${b.img}`} style={{ height: '60vh', width: '100%' }} />
                                    <p className={'centeredText'}>{b.name}</p>
                                </div>
                            ) : ''
                        )
                    }) : ''}
                </div>
                <div>
                    {(selectedBookNewest) ? <BookPage account={account} selectedBook={selectedBookNewest} /> : ''}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AllBooks