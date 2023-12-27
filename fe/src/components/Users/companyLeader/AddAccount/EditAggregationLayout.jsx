import React, { useContext, useEffect, useState } from "react";
import "../../../../css/app.css";
import "../../../../css/home.css";
import Footer from "../../../Common/Footer.jsx";
import Toast from "../../../Common/Toast.jsx";
import "../styleAggregation.css";
import { useParams } from "react-router-dom";
import { CompanyLeaderProvider } from "../CompanyLeaderProvider.jsx";
import AggregationEditForm from "./AggregationEditForm.jsx";

const EditAggregationLayout = () => {
    const { dynamicValue } = useParams();
    return (
        <>
            <div className="container">
                <CompanyLeaderProvider>
                    <AggregationEditForm id={dynamicValue} />
                </CompanyLeaderProvider>
            </div>
            <Footer />
        </>
    );
};

export default EditAggregationLayout;
