import {Fragment} from "react";
import {Navigate, NavLink, Outlet} from "react-router-dom";
import Header from "../Header.jsx";
import Toast from "../../Common/Toast.jsx";

export default function AggregationHead() {
    return (
        <>
            <Outlet/>
        </>
    );
}
