import React from 'react';
import "../../../css/transation_staff.css"
import TransactionStaff from "./TransactionStaff.jsx";
import SuccessfulDeliveriesList from "./SuccessfulDeliveriesList.jsx";
import IncomingBagListTransaction from "./IncomingBagListTransaction.jsx";
import {useLocation} from "react-router-dom";
import SidebarTransaction from "./SidebarTransaction.jsx";
import OrderSearchTransaction from "./OrderSearchTransaction.jsx";
import OrderListTransaction from "./OrderListTransaction.jsx";
import FailedDeliveriesList from "./FailedDeliveriesList.jsx";
import ReceiveList from "./ReceiveList.jsx";
import {TransactionOfficeProvider} from "./TransactionOfficeProvider.jsx";

const TransactionOfficeLayout = () => {
    const location = useLocation();
    const {pathname} = location;

    return (
        <>
            {/*<TransactionOfficeProvider>*/}
                <SidebarTransaction/>
                {pathname === '/transaction_staff' ? <TransactionStaff/> : null}
                {pathname === '/transaction_staff/order_search' ? <OrderSearchTransaction/> : null}
                {pathname === '/transaction_staff/order_list' ? <OrderListTransaction/> : null}
                {pathname === '/transaction_staff/order_list_receive' ? <ReceiveList/> : null}
                {pathname === '/transaction_staff/outgoing_bag_list' ? <IncomingBagListTransaction/> : null}
                {pathname === '/transaction_staff/incoming_bag_list' ? <IncomingBagListTransaction/> : null}
                {pathname === '/transaction_staff/success_order_list' ? <SuccessfulDeliveriesList/> : null}
                {pathname === '/transaction_staff/failed_order_list' ? <FailedDeliveriesList/> : null}
            {/*</TransactionOfficeProvider>*/}
        </>
    );
};

export default TransactionOfficeLayout;
