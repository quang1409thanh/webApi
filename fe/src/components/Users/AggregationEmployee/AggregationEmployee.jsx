import React from 'react';
import "../../../css/transation_staff.css"

import {useLocation} from "react-router-dom";
import Toast from "../../Common/Toast.jsx";
import Sidebar from "../TransactionOffice/Slidebar.jsx";


const TransactionOfficeLayout = () => {
    const location = useLocation();
    const {pathname} = location;

    return (
        <div className="min-h-full">
            {/*<Header/>*/}
            <Toast/>
            <Sidebar/>
            {/*{pathname === '/aggregation_employee' ? <TransactionStaff/> : null}*/}

            {/*{pathname === '/transaction_staff' ? <TransactionStaff/> : null}*/}
            {/*{pathname === '/transaction_staff/tracuu' ? <OrderSearchComponent/> : null}*/}
            {/*{pathname === '/transaction_staff/danh_sach_don' ? <OrderList/> : null}*/}
            {/*{pathname === '/transaction_staff/danh_sach_tui_di' ? <ShipmentList/> : null}*/}
            {/*{pathname === '/transaction_staff/danh_sach_tui_nhan' ? <BagListArrival/> : null}*/}
            {/*{pathname === '/transaction_staff/danh_sach_giao_thanh_cong' ? <SuccessfulDeliveriesList/> : null}*/}
            {/*{pathname === '/transaction_staff/danh_sach_giao_that_bai' ? <FailedDeliveriesList/> : null}*/}
        </div>
    );
};

export default TransactionOfficeLayout;
