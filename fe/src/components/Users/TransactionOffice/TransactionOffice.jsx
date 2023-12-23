import {Fragment} from "react";
import {Navigate, NavLink, Outlet} from "react-router-dom";
import Header from "../Header.jsx";
import Toast from "../../Common/Toast.jsx";

export default function TransactionOffice() {
    return (
        <>
            <div className="min-h-full">
                <Header/>
                <Outlet/>
                <Toast/>
                <h1>de</h1>
            </div>
        </>
    );
}
