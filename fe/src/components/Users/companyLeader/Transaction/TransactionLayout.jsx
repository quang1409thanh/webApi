import React from 'react';
import Header from "../../../Users/Header.jsx";
import Footer from "../../../Common/Footer.jsx";
import Toast from "../../../Common/Toast.jsx";
import ManagePost from "../../../Users/companyLeader/managePost.jsx";

const TransactionLayout = ({headerType, body}) => {
    return (
        <div className="min-h-full">
            {headerType !== 'none' && <Header/>}
            {<ManagePost/>}
            {headerType !== 'none' && <Footer/>}
            <Toast/>
        </div>
    );
};

export default TransactionLayout;
