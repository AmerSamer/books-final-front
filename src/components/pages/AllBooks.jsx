import React from "react";
import axios from "axios"
import './style.css';

const AllBooks = ({ account, accounts, allBooks }) => {

    return (
        <>
             <div style={{textAlign: "center" , padding: "6rem" , fontSize: '20px'}}>
                <div>Top Week</div>
            </div> 
            <div>
                <div id="grid">
                    {allBooks ? allBooks.map((b) => {
                        return <div className={'gridSon'}> {b.name} </div>
                    }) : ''}
                </div>
                 
            </div>
        </>
    )
}

export default AllBooks