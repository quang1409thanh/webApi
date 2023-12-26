import {Fragment} from "react";
import {Navigate, NavLink, Outlet} from "react-router-dom";
import Footer from "../../Common/Footer.jsx";

export default function TransactionOffice() {
    return (
        <>
            <Outlet/>
        </>
    );
}
