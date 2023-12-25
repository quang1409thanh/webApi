import React from 'react';
import "../../../css/transation_staff.css"

import {useLocation} from "react-router-dom";
import Toast from "../../Common/Toast.jsx";
import Sidebar from "../AggregationEmployee/Sidebar.jsx";
import OrderSearchComponent_AGG from './Tracuu_agg.jsx';
import OrderList from './Danhsachdon_agg.jsx';
import OutgoingBagList from './Tui_di_agg.jsx';
import IncomingBagList from './Tui_nhan_agg.jsx';


const Aggregation_employee = () => {
    const location = useLocation();
    const {pathname} = location;

    return (
        <div className="min-h-full">
            {/*<Header/>*/}
            <Toast/>
            <Sidebar/>
            {/*{pathname === '/aggregation_employee' ? <TransactionStaff/> : null}*/}

            {/*{pathname === '/transaction_staff' ? <TransactionStaff/> : null}*/}
            {pathname === '/aggregation_employee/Tracuu_agg' ? <OrderSearchComponent_AGG/> : null}
            {pathname === '/aggregation_employee/Danhsachdon_agg' ? <OrderList/> : null}
            {pathname === '/aggregation_employee/Tui_di_agg' ? <OutgoingBagList/> : null}
            {pathname === '/aggregation_employee/Tui_nhan_agg' ? <IncomingBagList/> : null}
            {/*{pathname === '/transaction_staff/danh_sach_giao_thanh_cong' ? <SuccessfulDeliveriesList/> : null}*/}
            {/*{pathname === '/transaction_staff/danh_sach_giao_that_bai' ? <FailedDeliveriesList/> : null}*/}
        </div>
    );
};

export default Aggregation_employee;
