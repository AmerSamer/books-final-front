import React from "react";
import axios from "axios";
import Link from "./Link";
// import Main from "./Main";

const Logout = ({ account }) => {

    const logoutUser = () => {
        // const find = account.find((f) => ((f.email === account.email) && (f.password === account.password)))
        // if (find) {
        account.active = false
        axios.put(`https://books-store-back.herokuapp.com/books/store/logout/${account._id}`)
            .then((res) => {
                if (res.status === 200) {
                    // setMsg('Login Successfully')
                    alert(`${account.email} logout successfully`)
                    window.location.reload(false);
                }
                else {
                    alert("Something went wrong")
                }
            }).catch((err) => {
                // setMsg('ERRORRRRR')
                alert(err)
            })
        // } else {
        //     setMsg('Invalid Email And Password!')
        // }
    }
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <div style={{ textAlign: 'center', color: 'red', fontSize: '2rem' }}> Are you sure you want to Log Out?</div>
                <br /><br />
                <Link className="item" href="/login">
                <input type="button" value="YES" onClick={logoutUser} />
                </Link>
                 {/* <input type="button" value="YES" onClick={logoutUser} /> */}
                <Link className="item" href="/">
                    <input type="button" value="CANCEL" />
                </Link>
                {/* <input type="button" value="CANCEL" /> */}
            </div>
            {/* {window.confirm('Are you sure you want to save this thing into the database?') ? <Main /> : 's'} */}
        </>
    )
}
export default Logout