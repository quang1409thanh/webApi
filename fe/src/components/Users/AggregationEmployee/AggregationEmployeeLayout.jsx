import React from 'react';
import "../../../css/transation_staff.css"

import {useLocation} from "react-router-dom";
import SidebarAggregation from "../AggregationEmployee/SidebarAggregation.jsx";
import OrderListAggregationToAggregation from './OrderListAggregationToAggregation.jsx';
import OutgoingBagListAggregation from './OutgoingBagListAggregation.jsx';
import IncomingBagListAggregationFromTransaction from './IncomingBagListAggregationFromTransaction.jsx';
import OrderSearchAggregation from "./OrderSearchAggregation.jsx";
import {AggregationEmployeeProvider} from "./AggregationEmployeeProvider.jsx";
import OrderListAggregationToTransaction from "./OrderListAggregationToTransaction.jsx";
import CreatePackageComponent from "../TransactionOffice/CreatePackageComponent.jsx";
import IncomingBagListAggregationFromAggregation from "./IncomingBagListAggregationFromAggregation.jsx";
import CreateShipmentAggregationToAggregation from "./CreateShipmentAggregationToAggregation.jsx";
import CreateShipmentAggregationToTransaction from "./CreateShipmentAggregationToTransaction.jsx";
import Toast from "../../Common/Toast.jsx";


const AggregationEmployeeLayout = () => {
    const location = useLocation();
    const {pathname} = location;

    const renderComponent = (pathname) => {
        switch (pathname) {
            case '/aggregation_employee':
                return <OrderSearchAggregation/>;
            case '/aggregation_employee/order_search':
                return <OrderSearchAggregation/>;
            case '/aggregation_employee/order_list_to_aggregation':
                return <OrderListAggregationToAggregation/>;
            case '/aggregation_employee/order_list_to_transaction':
                return <OrderListAggregationToTransaction/>;
            case '/aggregation_employee/create-package-tk-tk':
                return <CreateShipmentAggregationToAggregation/>;
            case '/aggregation_employee/create-package-tk-gd':
                return <CreateShipmentAggregationToTransaction/>;
            case '/aggregation_employee/outgoing_list_to_aggregation':
                return <OutgoingBagListAggregation/>;
            case '/aggregation_employee/incoming_list_from_transaction':
                return <IncomingBagListAggregationFromTransaction/>;
            case '/aggregation_employee/incoming_list_from_aggregation':
                return <IncomingBagListAggregationFromAggregation/>;
            // Add more cases as needed
            default:
                return null;
        }
    }

    return (
        <>
            <Toast/>
            <AggregationEmployeeProvider>
                <SidebarAggregation/>
                {renderComponent(pathname)}
            </AggregationEmployeeProvider>
        </>
    );
};
export default AggregationEmployeeLayout;
