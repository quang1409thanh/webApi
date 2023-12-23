import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from "./components/Users/Dashboard.jsx";
import Login from "./components/Guess/Login.jsx";
import Home from "./components/Common/Home.jsx";
import {useStateContext} from "./contexts/ContextProvider.jsx";
import GuestLayout from "./components/Guess/GuessLayout.jsx";
import Header from "./components/Users/Header.jsx";
import HomeGuess from "./components/Guess/HomeGuess.jsx";
import DefaultLayout from "./components/Users/DefaultLayout.jsx";
import FindView from "./components/Common/FindPost/FindView.jsx";
import AggregationLayout from "./components/Users/companyLeader/Aggregation/AggregationLayout.jsx";
import ShowAggregation from "./components/Users/companyLeader/Aggregation/ShowAggregation.jsx";
import TransactionLayout from "./components/Users/companyLeader/Transaction/TransactionLayout.jsx";
import ShowTransaction from "./components/Users/companyLeader/Transaction/ShowTransaction.jsx";
import ShowProfile from "./components/Users/ShowProfile.jsx";
import ResetPassword from "./components/Users/ResetPassword.jsx";
import AddUserLayout from "./components/Users/companyLeader/addAccount/AddUserLayout.jsx";
import TransactionOfficeLayout from "./components/Users/TransactionOffice/TransactionOfficeLayout.jsx";

function AppRouter() {
    let AggregationDetails;
    let TransactionDetails;
    return (
        <Routes>
            <Route path="/" element={<GuestLayout/>}>
                <Route path="/index" element={<HomeGuess/>}/>
                <Route path="/login" element={<Login/>}/>
            </Route>
            <Route path="/" element={<DefaultLayout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path="/dashboard" element={<Navigate to="/"/>}/>
                <Route path="/aggregationPoint" element={<AggregationLayout/>}/>
                <Route path="/transactionPoint" element={<TransactionLayout/>}/>
                <Route path="/manageuser" element={<AddUserLayout/>}/>
                <Route path="/profile" element={<ShowProfile/>}/>
                <Route path="/transactionPoint/:dynamicValue" element={<ShowTransaction/>}/>
                <Route path="/aggregationPoint/:dynamicValue" element={<ShowAggregation/>}/>
                <Route path="/password-reset/:token" element={<ResetPassword/>}/>
                <Route path="/aggregation/:id" component={AggregationDetails} />
                <Route path="/transaction/:id" component={TransactionDetails} />


            </Route>

            <Route path="/home" element={<Home/>}/>
            <Route path="/transaction_staff" element={<TransactionOfficeLayout/>}/>
            <Route path="/transaction_staff/tracuu" element={<TransactionOfficeLayout/>}/>
            <Route path="/transaction_staff/danh_sach_don" element={<TransactionOfficeLayout/>}/>
            <Route path="/transaction_staff/danh_sach_tui_di" element={<TransactionOfficeLayout/>}/>
            <Route path="/transaction_staff/danh_sach_tui_nhan" element={<TransactionOfficeLayout/>}/>
            <Route path="/transaction_staff/danh_sach_giao_thanh_cong" element={<TransactionOfficeLayout/>}/>
            <Route path="/transaction_staff/danh_sach_giao_that_bai" element={<TransactionOfficeLayout/>}/>


            <Route path="/gioithieu" element={<Home/>}/>
        </Routes>
    );
}

export default AppRouter;
