import React from 'react';
import "../../../../css/app.css" ;
import "../../../../css/home.css" ;
import Header from "../../Header.jsx";
import Footer from "../../../Common/Footer.jsx";
import Toast from "../../../Common/Toast.jsx";
import "../styleAggregation.css"
import TransactionList from "./TransactionList.jsx";
import TransactionForm from "./TransactionForm.jsx";
import {CompanyLeaderContext, CompanyLeaderProvider} from "../CompanyLeaderProvider.jsx";


const TransactionLayout = ({}) => {
    return (
        <>
            <section className="block-search-post-office">
                <div className="container">
                    <CompanyLeaderProvider>
                        <TransactionList/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <TransactionForm/>
                    </CompanyLeaderProvider>
                </div>
            </section>
        </>
    );
};

export default TransactionLayout;
