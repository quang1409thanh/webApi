import React from 'react';
import Header from "../../Users/Header.jsx";
import Footer from "../Footer.jsx";
import ManageView from "./ManageView.jsx";
import AddressForm from "./AddressForm.jsx";

const FindView = ({headerType, body}) => {
    return (
        <div className="min-h-full">
            {headerType !== 'none' && <Header/>}
            {<ManageView/>}
            {headerType !== 'none' && <Footer/>}
        </div>
    );
};

export default FindView;
