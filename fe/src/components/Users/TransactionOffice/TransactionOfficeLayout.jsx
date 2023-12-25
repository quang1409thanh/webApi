import React from 'react';
import "../../../css/transation_staff.css"

import Sidebar from "./Slidebar.jsx";
import Toast from "../../Common/Toast.jsx";
import OrderSearchComponent from "./tracuu.jsx";
import OrderList from "./Danhsachdon.jsx";
import TransactionStaff from "./TransactionStaff.jsx";
import ShipmentList from "./Danhsachtuidi.jsx";
import BagListArrival from "./Danhsachtuinhan.jsx";
import SuccessfulDeliveriesList from "./Giaothanhcong.jsx";
import FailedDeliveriesList from "./Giaothatbai.jsx";
import {useLocation} from "react-router-dom";


const TransactionOfficeLayout = () => {
    const location = useLocation();
    const {pathname} = location;

    return (
        <>
            <Sidebar/>
            {pathname === '/transaction_staff' ? <TransactionStaff/> : null}
            {pathname === '/transaction_staff/tracuu' ? <OrderSearchComponent/> : null}
            {pathname === '/transaction_staff/danh_sach_don' ? <OrderList/> : null}
            {pathname === '/transaction_staff/danh_sach_tui_di' ? <ShipmentList/> : null}
            {pathname === '/transaction_staff/danh_sach_tui_nhan' ? <BagListArrival/> : null}
            {pathname === '/transaction_staff/danh_sach_giao_thanh_cong' ? <SuccessfulDeliveriesList/> : null}
            {pathname === '/transaction_staff/danh_sach_giao_that_bai' ? <FailedDeliveriesList/> : null}
        </>
    );
};

export default TransactionOfficeLayout;
