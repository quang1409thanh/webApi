import { Fragment, useContext } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import axiosClient from "../../axios.js";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import Toast from "../Common/Toast.jsx";
import Header from "./Header.jsx";
import CompanyHeader from "./companyLeader/CompanyHeader.jsx";
import TransactionOfficeHeader from "./TransactionOffice/TransactionOfficeHeader.jsx";
import Footer from "../Common/Footer.jsx";
import AggregationHeadHeader from "./AggregationHead/AggregationHeadHeader.jsx";
import { TransactionHeadProvider } from "./TransactionHead/TransactionHeadProvider.jsx";
import TransactionHeadHeader from "./TransactionHead/TransactionHeadHeader.jsx";
import AggregationEmployeeHeader from "./AggregationEmployee/AggregationEmployeeHeader.jsx";

const roleHeaderMapping = {
    admin_system: <Header />, // Thay thế <Header /> bằng component tương ứng
    company_leader: <CompanyHeader />,
    aggregation_point_employee: <AggregationEmployeeHeader />, // Thay thế <Header /> bằng component tương ứng
    aggregation_point_head: <AggregationHeadHeader />, // Thay thế <Header /> bằng component tương ứng
    customer: <Header />, // Thay thế <Header /> bằng component tương ứng
    transaction_officer: <TransactionOfficeHeader />, // Thay thế <Header /> bằng component tương ứng
    transaction_point_head: <TransactionHeadHeader />, // Thay thế <Header /> bằng component tương ứng
    shipper: <Header />, // Thay thế <Header /> bằng component tương ứng
    guess: <Header />, // Thay thế <Header /> bằng component tương ứng
};

export default function DefaultLayout() {
    const { currentUser, userToken, setCurrentUser, setUserToken } =
        useStateContext();

    const { userRole } = useStateContext();

    if (!userToken) {
        return <Navigate to="/home" />;
    }

    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then((res) => {
            setCurrentUser({});
            setUserToken(null);
        });
    };

    return (
        <>
            <div className="min-h-full bgg-xam">
                {roleHeaderMapping[userRole]}
                <Outlet />
                <Toast />
            </div>
        </>
    );
}
