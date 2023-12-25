import React, {useContext, useEffect, useState} from 'react';
import "../../../../css/app.css" ;
import "../../../../css/home.css" ;
import Footer from "../../../Common/Footer.jsx";
import Toast from "../../../Common/Toast.jsx";
import "../styleAggregation.css"
import HeadList from "./HeadList.jsx";
import SwitchButton from "./SwitchButton.jsx";
import AddUserForm from "./AddUserForm.jsx";
import {CompanyLeaderProvider} from "../CompanyLeaderProvider.jsx";


const AddUserLayout = () => {
    return (
        <div className="container">
            <CompanyLeaderProvider>
                <SwitchButton/>
                {<HeadList/>}
                <AddUserForm/>
            </CompanyLeaderProvider>
        </div>

    );
};

export default AddUserLayout;
