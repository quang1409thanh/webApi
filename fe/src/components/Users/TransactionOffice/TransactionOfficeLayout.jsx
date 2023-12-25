import React from 'react';
import "../../../css/transation_staff.css"
import TransactionStaff from "./TransactionStaff.jsx";
import SuccessfulDeliveriesList from "./SuccessfulDeliveriesList.jsx";
import IncomingBagListTransaction from "./IncomingBagListTransaction.jsx";
import {useLocation} from "react-router-dom";
import SidebarTransaction from "./SidebarTransaction.jsx";
import OrderSearchTransaction from "./OrderSearchTransaction.jsx";
import OutgoingBagListTransaction from "./OutgoingBagListTransaction.jsx";
import OrderListTransaction from "./OrderListTransaction.jsx";
import FailedDeliveriesList from "./FailedDeliveriesList.jsx";


const TransactionOfficeLayout = () => {
    const location = useLocation();
    const {pathname} = location;

    return (
        <>
            <SidebarTransaction/>
            {pathname === '/transaction_staff' ? <TransactionStaff/> : null}
            {pathname === '/transaction_staff/order_search' ? <OrderSearchTransaction/> : null}
            {pathname === '/transaction_staff/order_list' ? <OrderListTransaction/> : null}
            {pathname === '/transaction_staff/outgoing_bag_list' ? <IncomingBagListTransaction/> : null}
            {pathname === '/transaction_staff/incoming_bag_list' ? <IncomingBagListTransaction/> : null}
            {pathname === '/transaction_staff/success_order_list' ? <SuccessfulDeliveriesList/> : null}
            {pathname === '/transaction_staff/failed_order_list' ? <FailedDeliveriesList/> : null}
        </>
    );
};

export default TransactionOfficeLayout;
