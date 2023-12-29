import React from 'react';
import "../../../css/app.css" ;
import "../../../css/home.css" ;
import "../companyLeader/styleAggregation.css"
import {AggregationHeadProvider} from "./AggregationHeadProvider.jsx";
import TransactionListInAggregationHead from "./TransactionListInAggregationHead.jsx";


const ManageTransactionPoint = ({}) => {
    return (
        <>
            <section className="block-search-post-office">
                <div className="container">
                    <AggregationHeadProvider>
                        <TransactionListInAggregationHead/>
                    </AggregationHeadProvider>
                </div>
            </section>
        </>
    );
};

export default ManageTransactionPoint;
