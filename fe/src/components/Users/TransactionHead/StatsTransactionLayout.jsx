import React from "react";
import Toast from "../../Common/Toast.jsx";
import { TransactionOfficeProvider } from "./TransactionOfficeProvider.jsx";
import { useLocation, useParams } from "react-router-dom";
import SidebarTransactionHead from "./SidebarTransactionHead.jsx";
import TransactionHeadSuccessfulOrder from "./TransactionHeadSuccessfulOrder";
import TransactionHeadFailOrder from "./TransactionHeadFailOrder";

const statsTransactionLayout = () => {
    let location = useLocation();
    let { dynamicValue } = useParams();
    const renderComponent = (pathname) => {
        switch (pathname) {
            case '/statsTransactionHead':
                return <TransactionHeadSuccessfulOrder />;
            case '/statsTransactionHead/failed_order_list':
                return <TransactionHeadFailOrder />;

            // Add more cases as needed
            default:
                return null;
        }
    };
    return (
        <>
            <Toast />
            <SidebarTransactionHead />
            {renderComponent(location.pathname)}
        </>
    );
};

export default statsTransactionLayout;
