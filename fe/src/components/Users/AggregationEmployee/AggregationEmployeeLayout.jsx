import React from 'react';
import "../../../css/transation_staff.css"

import {useLocation} from "react-router-dom";
import SidebarAggregation from "../AggregationEmployee/SidebarAggregation.jsx";
import OrderListAggregation from './OrderListAggregation.jsx';
import OutgoingBagListAggregation from './OutgoingBagListAggregation.jsx';
import IncomingBagListAggregation from './IncomingBagListAggregation.jsx';
import OrderSearchAggregation from "./OrderSearchAggregation.jsx";


const AggregationEmployeeLayout = () => {
    const location = useLocation();
    const {pathname} = location;

    return (
        <>
            <SidebarAggregation/>
            {pathname === '/aggregation_employee' ? <OrderSearchAggregation/> : null}
            {pathname === '/aggregation_employee/order_search' ? <OrderSearchAggregation/> : null}
            {pathname === '/aggregation_employee/order_list' ? <OrderListAggregation/> : null}
            {pathname === '/aggregation_employee/outgoing_list' ? <OutgoingBagListAggregation/> : null}
            {pathname === '/aggregation_employee/incoming_list' ? <IncomingBagListAggregation/> : null}
        </>
    );
};

export default AggregationEmployeeLayout;
