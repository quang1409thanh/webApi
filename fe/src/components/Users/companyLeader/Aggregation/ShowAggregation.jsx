import React from 'react';
import "../../../../css/app.css" ;
import "../../../../css/home.css" ;
import Header from "../../Header.jsx";
import Footer from "../../../Common/Footer.jsx";
import Toast from "../../../Common/Toast.jsx";
import {useParams} from "react-router-dom";
import AggregationEditForm from "./AggregationEditForm.jsx";
import {CompanyLeaderProvider} from "../CompanyLeaderProvider.jsx";

const ShowAggregation = ({headerType, body}) => {
    const {dynamicValue} = useParams();
    return (
        <div className="min-h-full">
            <Toast/>
            {headerType !== 'none' && <Header/>}
            <section className="block-search-post-office">
                <div className="container">
                    <CompanyLeaderProvider>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <AggregationEditForm id={dynamicValue}/>
                    </CompanyLeaderProvider>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default ShowAggregation;
