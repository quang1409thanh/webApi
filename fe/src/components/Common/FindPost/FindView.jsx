import React from 'react';
import Header from "../../Users/Header.jsx";
import Footer from "../Footer.jsx";
import ManageView from "./ManageView.jsx";
import AddressForm from "./AddressForm.jsx";
import Toast from "../Toast.jsx";
import ManagePost from "../../Users/companyLeader/managePost.jsx";

const FindView = ({headerType, body}) => {
    return (
        <div className="min-h-full">
            {headerType !== 'none' && <Header/>}
            {<ManageView/>}
            {headerType !== 'none' && <Footer/>}
            <Toast/>
        </div>
    );
};

export default FindView;
