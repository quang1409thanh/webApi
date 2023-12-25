import {Fragment} from "react";
import {Navigate, NavLink, Outlet} from "react-router-dom";

export default function TransactionHead() {
    return (
        <>
            <Outlet/>
        </>
    );
}
