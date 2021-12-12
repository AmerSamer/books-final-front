import React from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookPage from "./BookPage";

const User = ({ account, allBooks }) => {
    const [selectedMessage, setSelectedMessage] = React.useState(null);
    const [allNotifications, setAllNotifications] = React.useState(null);
    const [allNotificationsReceived, setAllNotificationsReceived] = React.useState(null);
    const [replyContentToUser, setReplyContentToUser] = React.useState(null);
    const [renderr, setRenderr] = React.useState(false);
    
    React.useEffect(() => {
        getAllNotifications();
        getAllNotificationsReceived();
    }, [renderr])
    const getAllNotifications = async () => {
        const response = await axios.get(`https://books-store-back.herokuapp.com/books/store/notifications/${account._id}`);
        setAllNotifications(response.data);
    }
    const getAllNotificationsReceived = async () => {
        const response = await axios.get(`https://books-store-back.herokuapp.com/books/store/notificationsReceived/${account._id}`);
        setAllNotificationsReceived(response.data);
    }
    const replyHandler = (b) => {

        if (selectedMessage) {
            if (selectedMessage._id !== b._id) {
                setSelectedMessage(b)
            } else {
                setSelectedMessage(null)
            }
        } else {
            setSelectedMessage(b)
            console.log("selectedMessage", selectedMessage);
        }
    }
    const replyContentHandler = (e) => {
        setReplyContentToUser("@" + (account.name) + ", " + (e.target.value) + ", at: " + (new Date()))
    }
    const sendReplyMessageToUserHandler = () => {
        // console.log(replyContentToUser);
        if (replyContentToUser) {
            const reply = {
                reply: replyContentToUser
            }
            axios.put(`https://books-store-back.herokuapp.com/books/store/notificationsReply/${selectedMessage}`, reply)
                .then((res) => {
                    if (res.status === 200) {
                        notify()
                        setRenderr(!renderr)
                        // setMsgFavoritesCart(`Your Comment has been Added successfully`)
                        // const commentsArray = selectedMessage.reply;
                        // commentsArray.push(changeComment.comments)
                        // setSelectedBookComm(commentsArray)
                    }
                    else {
                        console.log("first if out");
                        alert("Something went wrong")
                    }
                }).catch((err) => {
                    console.log("catch");
                    // setMsgFavoritesCart('ERROR')
                })
        } else {
            console.log("first if out");
            // setMsgFavoritesCart('You Should Fill in the input to Added Your Coment')
        }
    }
    const notify = () => toast(`Reply ${replyContentToUser}, was added successfully`);
    return (
        <>
        <div>
                Hello, @{account.name}
                <hr />
            </div>
            {/* <p style={{ fontSize: '1.5em' }}>hello {account.name}</p> */}
            <div>
                <div style={{ letterSpacing: '10px' ,textAlign: 'center', fontSize: '2em', padding: '1em' }}>
                    Incoming request
                </div>

                {allNotificationsReceived ? allNotificationsReceived.map((allB, index) => {
                    return (
                        !allB.isDone ? (
                            <div key={index} >
                                <div className="ui segment">
                                    <div className="ui divided items">
                                        <div className="item" >
                                            {/* <div className="image">
                                        <div style={{
                                                backgroundImage: `url(${allB.img})`,
                                                height: '100%',
                                                width: '100%',
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat'
                                            }}></div>
                                    </div> */}
                                            <div className="content" >
                                                {/* <p className="header">book: {allB.bookId}</p> */}
                                                <p className="header">Book: {allB.bookId.name}</p>
                                                <div className="meta">
                                                    <div>from: @{allB.usersender.name}</div>
                                                    <div>To: @{allB.userreceiver.name}</div>
                                                </div>
                                                <div className="description">
                                                    <p>Time: {allB.timePublished}</p>
                                                    <p>Title: {allB.title}</p>
                                                    <p>Content: {allB.content}</p>
                                                    <p>Reply: {allB.reply === '' ? <span style={{ color: 'red' }}>no Reply</span> : allB.reply.map((rp, index) => {
                                                        return <div key={index}>{rp}</div>
                                                    })}</p>
                                                </div>
                                                <div className="extra">

                                                </div>
                                            </div>
                                        </div>
                                        {/* <button type="button" class="btn btn-success">Done</button> */}
                                        <button type="button" class="btn btn-info" onClick={() => replyHandler(allB._id)}>Reply</button>
                                        {selectedMessage === allB._id ? (
                                            <div>
                                                {/* {console.log("selectedMessage", selectedMessage)} */}
                                                <div class="mb-3">
                                                    <label for="exampleFormControlTextarea1" class="form-label">Reply:</label>
                                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={replyContentHandler}></textarea>
                                                </div>
                                                <div class="mb-3">
                                                    <button type="button" class="btn btn-success" onClick={sendReplyMessageToUserHandler}>Send</button>
                                                    <ToastContainer />
                                                </div>
                                            </div>
                                        ) : ''}
                                    </div>
                                </div>
                            </div>
                        ) : ""
                    )
                }) : ''}
            </div>
            <div>
                <div style={{ letterSpacing: '10px', textAlign: 'center', fontSize: '2em', padding: '1em' }}>
                    Outgoing request
                </div>

                {allNotifications ? allNotifications.map((allB, index) => {
                    return (
                        <div key={index} >
                            <div className="ui segment">
                                <div className="ui divided items">
                                    <div className="item" >
                                        {/* <div className="image">
                                        <div style={{
                                                backgroundImage: `url(${allB.img})`,
                                                height: '100%',
                                                width: '100%',
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat'
                                            }}></div>
                                    </div> */}
                                        <div className="content" >
                                            {/* <p className="header">book: {allB.bookId}</p> */}
                                            <p className="header">Book: {allB.bookId.name}</p>
                                            <div className="meta">
                                                <div>from: @{allB.usersender.name}</div>
                                                <div>To: @{allB.userreceiver.name}</div>
                                            </div>
                                            <div className="description">
                                                <p>Time: {allB.timePublished}</p>
                                                <p>Title: {allB.title}</p>
                                                <p>Content: {allB.content}</p>
                                                <p>Reply: {allB.reply === '' ? <span style={{ color: 'red' }}>no Reply</span> : allB.reply.map((rp, index) => {
                                                    return <div key={index}>{rp}</div>
                                                })}</p>
                                            </div>
                                            <div className="extra">

                                            </div>
                                        </div>
                                    </div>
                                    {/* <button type="button" class="btn btn-success">Done</button> */}
                                    <button type="button" class="btn btn-info" onClick={() => replyHandler(allB._id)}>Reply</button>
                                    {selectedMessage === allB._id ? (
                                        <div>
                                            {/* {console.log("selectedMessage", selectedMessage)} */}
                                            <div class="mb-3">
                                                <label for="exampleFormControlTextarea1" class="form-label">Reply:</label>
                                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={replyContentHandler}></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <button type="button" class="btn btn-success" onClick={sendReplyMessageToUserHandler}>Send</button>
                                                <ToastContainer />
                                            </div>
                                        </div>
                                    ) : ''}
                                </div>
                            </div>
                            {/* <div>
                            {((selectedBookk) && (selectedBookk._id === allB._id)) ? <UserProfileBook account={account} selectedBook={selectedBookk} /> : ''}
                        </div> */}
                        </div>
                    )
                }) : ''}
            </div>

        </>
    )
}

export default User