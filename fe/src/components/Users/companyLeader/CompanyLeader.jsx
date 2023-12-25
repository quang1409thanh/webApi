import {Fragment} from "react";
import {Navigate, NavLink, Outlet} from "react-router-dom";
import Header from "../Header.jsx";
import Toast from "../../Common/Toast.jsx";
import CompanyHeader from "./CompanyHeader.jsx";

export default function CompanyLeader() {
    return (
        <>
            <Outlet/>
        </>
    );
}
