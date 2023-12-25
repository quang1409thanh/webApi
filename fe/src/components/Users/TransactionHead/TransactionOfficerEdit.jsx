import React, {useContext, useEffect, useState} from 'react';
import "../../../css/app.css" ;
import "../../../css/home.css" ;
import {useParams} from "react-router-dom";
import {TransactionHeadProvider} from "./TransactionHeadProvider.jsx";
import TransactionOfficerFormEdit from "./TransactionOfficerFormEdit.jsx";


const TransactionOfficerEdit = () => {
    const {dynamicValue} = useParams();
    return (
        <>
            <h1>===
            </h1>
            <div className="container">
                <TransactionHeadProvider>
                    <TransactionOfficerFormEdit id={dynamicValue}/>
                </TransactionHeadProvider>
            </div>
        </>

    );
};

export default TransactionOfficerEdit;
