import React, { useContext, useEffect, useState } from "react";
import "../../../../css/app.css";
import "../../../../css/home.css";
import Footer from "../../../Common/Footer.jsx";
import Toast from "../../../Common/Toast.jsx";
import "../styleAggregation.css";
import HeadList from "./HeadList.jsx";
import { CompanyLeaderContext } from "../CompanyLeaderProvider.jsx";

const SwitchButton = () => {
    const { userType, setUserType } = useContext(CompanyLeaderContext);
    console.log("userGlobal" + userType);

    return (
        <>
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">User Type Toggle</h1>
                <p className={`text-2xl font-semibold text-blue-600 mb-4`}>
                    {userType === "aggregationHead"
                        ? "Aggregation Head"
                        : "Transaction Head"}
                </p>
                <button
                    onClick={() =>
                        setUserType((prevUserType) =>
                            prevUserType === "aggregationHead"
                                ? "transactionHead"
                                : "aggregationHead"
                        )
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                    Toggle User Type
                </button>
            </div>
        </>
    );
};

export default SwitchButton;
