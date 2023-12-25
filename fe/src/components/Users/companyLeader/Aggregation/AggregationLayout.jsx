import React from 'react';
import "../../../../css/app.css" ;
import "../../../../css/home.css" ;
import Footer from "../../../Common/Footer.jsx";
import Toast from "../../../Common/Toast.jsx";
import "../styleAggregation.css"
import AggregationList from "./AggregationList.jsx";
import AggregationForm from "./AggregationForm.jsx";
import {CompanyLeaderProvider} from "../CompanyLeaderProvider.jsx";


const AggregationLayout = ({headerType, body}) => {
    return (
        <>
            <section className="block-search-post-office">
                <div className="container">
                    <CompanyLeaderProvider>
                        <AggregationList/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <AggregationForm/>
                    </CompanyLeaderProvider>
                </div>
            </section>
        </>
    );
};

export default AggregationLayout;
