import React, {useContext, useEffect, useState} from 'react';
import "../../../../css/app.css" ;
import "../../../../css/home.css" ;
import Toast from "../../Common/Toast.jsx";
import AggregationHead from "./AggregationHead.jsx";


function AggregationHeadProvider(props: { children: ReactNode }) {
    return null;
}

const AggregationEmployeeLayout = () => {
    return (
        <div className="min-h-full">
            <Toast/>
            <div className="container">
                <AggregationHeadProvider>
                    <AggregationEmployeeList />
                </AggregationHeadProvider>
            </div>
        </div>

    );
};

export default AggregationEmployeeLayout;
