import React, {useContext, useEffect, useState} from 'react';
import "../../../css/app.css" ;
import "../../../css/home.css" ;
import Toast from "../../Common/Toast.jsx";
import AggregationEmployeeList from "./AggregationEmployeeList.jsx";
import {AggregationHeadProvider} from "./AggregationHeadProvider.jsx";
import AggregationEmployeeAdd from "./AggregationEmployeeAdd.jsx";
import AggregationEmployeeFormEdit from "./AggregationEmployeeFormEdit.jsx";
import {useParams} from "react-router-dom";


const AggregationEmployeeEdit = () => {
    const {dynamicValue} = useParams();
    return (
        <>
            <h1>===
            </h1>
            <div className="container">
                <AggregationHeadProvider>
                    <AggregationEmployeeFormEdit id={dynamicValue}/>
                </AggregationHeadProvider>
            </div>
        </>

    );
};

export default AggregationEmployeeEdit;
