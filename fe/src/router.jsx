import {Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from "./components/Users/Dashboard.jsx";
import Login from "./components/Guess/Login.jsx";
import Home from "./components/Common/Home.jsx";
import GuestLayout from "./components/Guess/GuessLayout.jsx";
import HomeGuess from "./components/Guess/HomeGuess.jsx";
import DefaultLayout from "./components/Users/DefaultLayout.jsx";
import AggregationLayout from "./components/Users/companyLeader/Aggregation/AggregationLayout.jsx";
import ShowAggregation from "./components/Users/companyLeader/Aggregation/ShowAggregation.jsx";
import TransactionLayout from "./components/Users/companyLeader/Transaction/TransactionLayout.jsx";
import ShowTransaction from "./components/Users/companyLeader/Transaction/ShowTransaction.jsx";
import ShowProfile from "./components/Users/ShowProfile.jsx";
import ResetPassword from "./components/Users/ResetPassword.jsx";
import AddUserLayout from "./components/Users/companyLeader/AddAccount/AddUserLayout.jsx";
import TransactionOfficeLayout from "./components/Users/TransactionOffice/TransactionOfficeLayout.jsx";
import GoodsQr from "./components/Users/GoodsQr.jsx";
import React, {useContext} from "react";
import AggregationEmployee from "./components/Users/AggregationEmployee/AggregationEmployee.jsx";
import CompanyLeader from "./components/Users/companyLeader/CompanyLeader.jsx";
import TransactionOffice from "./components/Users/TransactionOffice/TransactionOffice.jsx";
import EditTransactionLayout from "./components/Users/companyLeader/AddAccount/EditTransactionLayout.jsx";
import EditAggregationLayout from "./components/Users/companyLeader/AddAccount/EditAggregationLayout.jsx";
import {useStateContext} from "./contexts/ContextProvider.jsx";
import AggregationHead from "./components/Users/AggregationHead/AggregationHead.jsx";
import TransactionHead from "./components/Users/TransactionHead/TransactionHead.jsx";
import TransactionOfficerLayout from "./components/Users/TransactionHead/TransactionOfficerLayout.jsx";
import AggregationEmployeeList from "./components/Users/AggregationHead/AggregationEmployeeList.jsx";
import AggregationHeadLayout from "./components/Users/AggregationHead/AggregationHeadLayout.jsx";
import AggregationEmployeeEdit from "./components/Users/AggregationHead/AggregationEmployeeEdit.jsx";
import TransactionOfficerEdit from "./components/Users/TransactionHead/TransactionOfficerEdit.jsx";
import Aggregation_employee from "./components/Users/AggregationEmployee/AggregationEmployee.jsx";
import AggregationEmployeeLayout from "./components/Users/AggregationEmployee/AggregationEmployeeLayout.jsx";


function AppRouter() {
    const {userRole} = useStateContext();
    console.log(userRole);
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
                {userRole === 'company_leader' && (
                    <Route path="/" element={<CompanyLeader/>}>
                        <Route path="/aggregationPoint" element={<AggregationLayout/>}/>
                        <Route path="/transactionPoint" element={<TransactionLayout/>}/>
                        <Route path="/manageuser" element={<AddUserLayout/>}/>
                        <Route path="/transactionPoint/:dynamicValue" element={<ShowTransaction/>}/>
                        <Route path="/aggregationPoint/:dynamicValue" element={<ShowAggregation/>}/>
                        <Route path="/aggregationHead/:dynamicValue" element={<EditAggregationLayout/>}/>
                        <Route path="/transactionHead/:dynamicValue" element={<EditTransactionLayout/>}/>
                    </Route>
                )}
                {(userRole === "aggregation_point_head" &&
                    <Route path="/" element={<AggregationHead/>}>
                        <Route path="/aggregationEmployee" element={<AggregationHeadLayout/>}/>
                        <Route path="/aggregationEmployee/:dynamicValue" element={<AggregationEmployeeEdit/>}/>
                        <Route path="/manage_transaction_point" element={<AggregationHeadLayout/>}/>
                    </Route>
                )}
                {(userRole === "aggregation_point_employee" &&
                    <Route path="/" element={<AggregationEmployee/>}>
                        <Route path="/aggregation_employee" element={<AggregationEmployeeLayout/>}/>
                        <Route path="/aggregation_employee/Tracuu_agg" element={<AggregationEmployeeLayout/>}/>
                        <Route path="/aggregation_employee/Danhsachdon_agg" element={<AggregationEmployeeLayout/>}/>
                        <Route path="/aggregation_employee/Tui_di_agg" element={<AggregationEmployeeLayout/>}/>
                        <Route path="/aggregation_employee/Tui_nhan_agg" element={<AggregationEmployeeLayout/>}/>
                    </Route>
                )}
                {(userRole === "transaction_point_head" &&
                    <Route path="/" element={<TransactionHead/>}>
                        <Route path="/transactionOfficer" element={<TransactionOfficerLayout/>}/>
                        <Route path="/transactionOfficer/:dynamicValue" element={<TransactionOfficerEdit/>}/>

                    </Route>
                )}
                {userRole === 'transaction_officer' && (
                    <Route path="/" element={<TransactionOffice/>}>
                        <Route path="/transaction_staff" element={<TransactionOfficeLayout/>}/>
                        <Route path="/transaction_staff/tracuu" element={<TransactionOfficeLayout/>}/>
                        <Route path="/transaction_staff/danh_sach_don" element={<TransactionOfficeLayout/>}/>
                        <Route path="/transaction_staff/danh_sach_tui_di" element={<TransactionOfficeLayout/>}/>
                        <Route path="/transaction_staff/danh_sach_tui_nhan" element={<TransactionOfficeLayout/>}/>
                        <Route path="/transaction_staff/danh_sach_giao_thanh_cong"
                               element={<TransactionOfficeLayout/>}/>
                        <Route path="/transaction_staff/danh_sach_giao_that_bai" element={<TransactionOfficeLayout/>}/>
                        <Route path="/aggregation_employee" element={<AggregationEmployee/>}/>
                    </Route>
                )}
                {(userRole === "guess") &&
                    <Route path="/dashboard" element={<Navigate to="/"/>}/>
                }
                <Route index element={<Dashboard/>}/>
                <Route path="/profile" element={<ShowProfile/>}/>
                <Route path="/dashboard" element={<Navigate to="/"/>}/>
                <Route path="/password-reset/:token" element={<ResetPassword/>}/>
            </Route>
            <Route path="/" element={<GuestLayout/>}>
                <Route path="/index" element={<HomeGuess/>}/>
                <Route path="/login" element={<Login/>}/>
            </Route>

            <Route path="/home" element={<HomeGuess/>}/>
            <Route path="/gioithieu" element={<GoodsQr/>}/>
        </Routes>
    );
}

export default AppRouter;
