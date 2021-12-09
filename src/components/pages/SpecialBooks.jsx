import React from "react";
import BookPage from "./BookPage";

const SpecialBooks = ({ account, allBooks }) => {
    const [selectedBookk, setSelectedBookk] = React.useState(null);

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
            <p>hello {account.name}</p>

            {allBooks ? allBooks.map((allB, index) => {
                return (

                    allB.category === 'specialBook' ? (
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
                    ) : ''
                )
            }) : ''}

        </>
    )
}
export default SpecialBooks