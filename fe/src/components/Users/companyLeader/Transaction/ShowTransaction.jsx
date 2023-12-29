import React from 'react';
import "../../../../css/app.css" ;
import "../../../../css/home.css" ;
import Footer from "../../../Common/Footer.jsx";
import Toast from "../../../Common/Toast.jsx";
import {useParams} from "react-router-dom";
import TransactionEditForm from "./TransactionEditForm.jsx";
import {CompanyLeaderProvider} from "../CompanyLeaderProvider.jsx";

const ShowTransaction = ({headerType, body}) => {
    const {dynamicValue} = useParams();
    return (
        <div className="min-h-full">
            <Toast/>
            <section className="block-search-post-office">
                <div className="container">
                    <CompanyLeaderProvider>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <TransactionEditForm id={dynamicValue}/>
                    </CompanyLeaderProvider>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default ShowTransaction;
