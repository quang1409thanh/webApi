import React from 'react';
import "../../../css/transation_staff.css"

import {useLocation} from "react-router-dom";
import Toast from "../../Common/Toast.jsx";
import Sidebar from "../AggregationEmployee/Sidebar.jsx";
import OrderSearchComponent_AGG from './Tracuu_agg.jsx';
import OrderList from './Danhsachdon_agg.jsx';
import OutgoingBagList from './Tui_di_agg.jsx';
import IncomingBagList from './Tui_nhan_agg.jsx';
import TransactionStaff from "../TransactionOffice/TransactionStaff.jsx";


const AggregationEmployeeLayout = () => {
    const location = useLocation();
    const {pathname} = location;

    return (
        <>
            <Sidebar/>
            {pathname === '/aggregation_employee' ? <OrderSearchComponent_AGG/> : null}
            {pathname === '/aggregation_employee/Tracuu_agg' ? <OrderSearchComponent_AGG/> : null}
            {pathname === '/aggregation_employee/Danhsachdon_agg' ? <OrderList/> : null}
            {pathname === '/aggregation_employee/Tui_di_agg' ? <OutgoingBagList/> : null}
            {pathname === '/aggregation_employee/Tui_nhan_agg' ? <IncomingBagList/> : null}
        </>
    );
};

export default AggregationEmployeeLayout;
