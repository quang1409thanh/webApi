import React, {useContext, useEffect, useState} from 'react';
import "../../../css/app.css" ;
import "../../../css/home.css" ;
import Toast from "../../Common/Toast.jsx";
import AggregationEmployeeList from "./AggregationEmployeeList.jsx";
import {AggregationHeadProvider} from "./AggregationHeadProvider.jsx";
import AggregationEmployeeAdd from "./AggregationEmployeeAdd.jsx";


const AggregationHeadLayout = () => {
    return (
        <>
            <h1>===
            </h1>
            <div className="container">
                <AggregationHeadProvider>
                    <AggregationEmployeeList/>
                    <AggregationEmployeeAdd/>
                </AggregationHeadProvider>
            </div>
        </>

    );
};

export default AggregationHeadLayout;
