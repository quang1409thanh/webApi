import React from 'react';
import "../../../css/transation_staff.css"

import Sidebar from "./Slidebar.jsx";
import Toast from "../../Common/Toast.jsx";
import OrderSearchComponent from "./tracuu.jsx";
import TransactionStaff from "./TransactionStaff.jsx";
import {useLocation} from "react-router-dom";


const TransactionOfficeLayout = () => {
    const location = useLocation();
    const {pathname} = location;

    return (
        <div className="min-h-full">
            {/*<Header/>*/}
            <Toast/>
            <Sidebar/>
            {pathname === '/transaction_staff' ? <TransactionStaff/> : null}
            {pathname === '/transaction_staff/tracuu' ? <OrderSearchComponent/> : null}
        </div>
    );
};

export default TransactionOfficeLayout;