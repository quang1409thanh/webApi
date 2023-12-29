import { Routes, Route, Navigate } from "react-router-dom";
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
import GoodsQr from "./components/Users/Info.jsx";
import React, { useContext } from "react";
import AggregationEmployee from "./components/Users/AggregationEmployee/AggregationEmployee.jsx";
import CompanyLeader from "./components/Users/companyLeader/CompanyLeader.jsx";
import TransactionOffice from "./components/Users/TransactionOffice/TransactionOffice.jsx";
import EditTransactionLayout from "./components/Users/companyLeader/AddAccount/EditTransactionLayout.jsx";
import EditAggregationLayout from "./components/Users/companyLeader/AddAccount/EditAggregationLayout.jsx";
import { useStateContext } from "./contexts/ContextProvider.jsx";
import AggregationHead from "./components/Users/AggregationHead/AggregationHead.jsx";
import TransactionHead from "./components/Users/TransactionHead/TransactionHead.jsx";
import TransactionOfficerLayout from "./components/Users/TransactionHead/TransactionOfficerLayout.jsx";
import AggregationEmployeeList from "./components/Users/AggregationHead/AggregationEmployeeList.jsx";
import AggregationHeadLayout from "./components/Users/AggregationHead/AggregationHeadLayout.jsx";
import AggregationEmployeeEdit from "./components/Users/AggregationHead/AggregationEmployeeEdit.jsx";
import TransactionOfficerEdit from "./components/Users/TransactionHead/TransactionOfficerEdit.jsx";
import Aggregation_employee from "./components/Users/AggregationEmployee/AggregationEmployee.jsx";
import AggregationEmployeeLayout from "./components/Users/AggregationEmployee/AggregationEmployeeLayout.jsx";
import FindView from "./components/Common/FindPost/FindView.jsx";
import CreatePackageComponent from "./components/Users/TransactionOffice/CreatePackageComponent.jsx";
import Invoice from "./components/Users/TransactionOffice/Invoice.jsx";
import OrderSearch from "./components/Users/OrderSearch.jsx";
import StatsTransactionLayout from "./components/Users/TransactionHead/StatsTransactionLayout.jsx";
import OrderSearchAggregation from "./components/Users/AggregationEmployee/OrderSearchAggregation.jsx";
import TransactionHeadSuccessfulOrder from "./components/Users/TransactionHead/TransactionHeadSuccessfulOrder.jsx";
import TransactionHeadFailOrder from "./components/Users/TransactionHead/TransactionHeadFailOrder.jsx";
import ManageTransactionPoint from "./components/Users/AggregationHead/ManageTransactionPoint.jsx";


function AppRouter() {
    const { userRole } = useStateContext();
    console.log(userRole);
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                {userRole === "company_leader" && (
                    <Route path="/" element={<CompanyLeader />}>
                        <Route
                            path="/aggregationPoint"
                            element={<AggregationLayout />}
                        />
                        <Route
                            path="/transactionPoint"
                            element={<TransactionLayout />}
                        />
                        <Route path="/manageuser" element={<AddUserLayout />} />
                        <Route
                            path="/transactionPoint/:dynamicValue"
                            element={<ShowTransaction />}
                        />
                        <Route
                            path="/aggregationPoint/:dynamicValue"
                            element={<ShowAggregation />}
                        />
                        <Route
                            path="/aggregationHead/:dynamicValue"
                            element={<EditAggregationLayout />}
                        />
                        <Route
                            path="/transactionHead/:dynamicValue"
                            element={<EditTransactionLayout />}
                        />
                    </Route>
                )}
                {userRole === "aggregation_point_head" && (
                    <Route path="/" element={<AggregationHead />}>
                        <Route
                            path="/aggregationEmployee"
                            element={<AggregationHeadLayout />}
                        />
                        <Route
                            path="/aggregationEmployee/:dynamicValue"
                            element={<AggregationEmployeeEdit />}
                        />
                        <Route
                            path="/manage_transaction_point"
                            element={<AggregationHeadLayout />}
                        />
                        <Route
                            path="/transactionPoint/:dynamicValue"
                            element={<ShowTransaction/>}
                        />

                    </Route>
                )}

                {userRole === "aggregation_point_employee" && (
                    <Route path="/" element={<AggregationEmployee />}>
                        <Route
                            path="/aggregation_employee"
                            element={<AggregationEmployeeLayout />}
                        />
                        <Route
                            path="/aggregation_employee/order_search"
                            element={<AggregationEmployeeLayout />}
                        />
                        <Route
                            path="/aggregation_employee/order_list_to_aggregation"
                            element={<AggregationEmployeeLayout />}
                        />
                        <Route
                            path="/aggregation_employee/order_list_to_transaction"
                            element={<AggregationEmployeeLayout />}
                        />
                        <Route
                            path="/aggregation_employee/outgoing_list_to_aggregation"
                            element={<AggregationEmployeeLayout />}
                        />
                        <Route
                            path="/aggregation_employee/outgoing_list_to_transaction"
                            element={<AggregationEmployeeLayout />}
                        />
                        <Route
                            path="/aggregation_employee/incoming_list_from_transaction"
                            element={<AggregationEmployeeLayout />}
                        />
                        <Route
                            path="/aggregation_employee/incoming_list_from_aggregation"
                            element={<AggregationEmployeeLayout />}
                        />
                        <Route
                            path="/aggregation_employee/create-package-tk-tk"
                            element={<AggregationEmployeeLayout />}
                        />
                        <Route
                            path="/aggregation_employee/create-package-tk-gd"
                            element={<AggregationEmployeeLayout />}
                        />
                    </Route>
                )}
                {userRole === "transaction_point_head" && (
                    <Route path="/" element={<TransactionHead />}>
                        <Route
                            path="/transactionOfficer"
                            element={<TransactionOfficerLayout />}
                        />
                        <Route
                            path="/transactionOfficer/:dynamicValue"
                            element={<TransactionOfficerEdit />}
                        />
                    </Route>
                )}
                {userRole === "statsTransactionHead" && (
                    <Route path="/" element={<TransactionHeadSuccessfulOrder />}>
                        <Route
                            path="/statsTransactionHead/failed_order_list"
                            element={<StatsTransactionLayout />}
                        />

                    </Route>
                )}
                {userRole === "transaction_officer" && (
                    <Route path="/" element={<TransactionOffice />}>
                        <Route
                            path="/transaction_staff"
                            element={<TransactionOfficeLayout />}
                        />
                        <Route path="/new-page" element={<Invoice />} />
                        <Route
                            path="/transaction_staff/order_search"
                            element={<TransactionOfficeLayout />}
                        />
                        <Route
                            path="/transaction_staff/order_list"
                            element={<TransactionOfficeLayout />}
                        />
                        <Route
                            path="/transaction_staff/order_list_receive"
                            element={<TransactionOfficeLayout />}
                        />
                        <Route
                            path="/transaction_staff/outgoing_bag_list"
                            element={<TransactionOfficeLayout />}
                        />
                        <Route
                            path="/transaction_staff/outgoing_bag_list/:dynamicValue"
                            element={<TransactionOfficeLayout />}
                        />
                        <Route
                            path="/transaction_staff/incoming_bag_list"
                            element={<TransactionOfficeLayout />}
                        />
                        <Route
                            path="/transaction_staff/success_order_list"
                            element={<TransactionOfficeLayout />}
                        />
                        <Route
                            path="/transaction_staff/failed_order_list"
                            element={<TransactionOfficeLayout />}
                        />
                        <Route
                            path="/transaction_staff/loss_order_list"
                            element={<TransactionOfficeLayout />}
                        />
                        <Route
                            path="/transaction_staff/create-package"
                            element={<TransactionOfficeLayout />}
                        />
                    </Route>
                )}
                {userRole === "guess" && (
                    <Route path="/dashboard" element={<Navigate to="/" />} />
                )}
                <Route index element={<Dashboard />} />
                <Route path="/profile" element={<ShowProfile />} />
                <Route path="/dashboard" element={<Navigate to="/" />} />
                <Route
                    path="/password-reset/:token"
                    element={<ResetPassword />}
                />
                <Route
                    path="/statsTransactionHead"
                    element={<StatsTransactionLayout />}
                />
            </Route>
            <Route path="/" element={<GuestLayout />}>
                <Route path="/index" element={<HomeGuess />} />
                <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/list_office" element={<FindView />} />
            <Route path="/home" element={<HomeGuess />} />
            <Route path="/gioithieu" element={<GoodsQr />} />
            <Route path="/find_postal_items" element={<OrderSearch />} />
            <Route path="/new-page" element={<Invoice />} />
        </Routes>
    );
}

export default AppRouter;
