import React from 'react';
import "../../../css/transation_staff.css"
import TransactionStaff from "./TransactionStaff.jsx";
import SuccessfulDeliveriesList from "./SuccessfulDeliveriesList.jsx";
import IncomingBagListTransaction from "./IncomingBagListTransaction.jsx";
import {useLocation, useParams} from "react-router-dom";
import SidebarTransaction from "./SidebarTransaction.jsx";
import OrderSearchTransaction from "./OrderSearchTransaction.jsx";
import OrderListTransaction from "./OrderListTransaction.jsx";
import FailedDeliveriesList from "./FailedDeliveriesList.jsx";
import ReceiveList from "./ReceiveList.jsx";
import {TransactionOfficeProvider} from "./TransactionOfficeProvider.jsx";
import CreatePackageComponent from "./CreatePackageComponent.jsx";
import OutgoingBagListTransaction from "./OutgoingBagListTransaction.jsx";
import OutgoingBagListTransactionDetails from "./OutgoingBagListTransactionDetails.jsx";
import OrderListTransactionReceiving from "./OrderListTransactionReceiving.jsx";
import Invoice from "./Invoice.jsx";
import LossDeliveriesList from "./LossDeliveriesList.jsx";
import Toast from "../../Common/Toast.jsx";

const TransactionOfficeLayout = () => {
    let location = useLocation();
    let {dynamicValue} = useParams();
    const renderComponent = (pathname) => {
        switch (pathname) {
            case '/transaction_staff':
                return <TransactionStaff/>;
            case '/transaction_staff/order_search':
                return <OrderSearchTransaction/>;
            case '/transaction_staff/order_list':
                return <OrderListTransaction/>;
            case '/transaction_staff/create-package':
                return <CreatePackageComponent/>;
            case '/transaction_staff/order_list_receive':
                return <OrderListTransactionReceiving/>;
            case '/transaction_staff/outgoing_bag_list':
                return <OutgoingBagListTransaction/>;
            case '/transaction_staff/incoming_bag_list':
                return <IncomingBagListTransaction/>;
            case `/transaction_staff/outgoing_bag_list/${dynamicValue}`:
                return <OutgoingBagListTransactionDetails/>;
            case '/transaction_staff/success_order_list':
                return <SuccessfulDeliveriesList/>;
            case '/transaction_staff/failed_order_list':
                return <FailedDeliveriesList/>;
            case '/transaction_staff/loss_order_list':
                return <LossDeliveriesList/>;

            // Add more cases as needed
            default:
                return null;
        }
    }
    return (
        <>
            <Toast/>
            <TransactionOfficeProvider>
                <SidebarTransaction/>
                {renderComponent(location.pathname)}
            </TransactionOfficeProvider>
        </>
    );
};

export default TransactionOfficeLayout;
