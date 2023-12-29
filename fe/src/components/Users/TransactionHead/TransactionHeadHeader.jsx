import React, { Fragment } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import axiosClient from "../../../axios.js";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function TransactionHeadHeader() {
    const { currentUser, userToken, setCurrentUser, setUserToken } =
        useStateContext();

    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then((res) => {
            setCurrentUser({});
            setUserToken(null);
        });
    };

    return (
        <>
            <div className="container">
                <header className="header">
                    <div className="container">
                        <nav>
                            <ol className="menu_item">
                                {currentUser ? (
                                    <NavLink
                                        onClick={(ev) => logout(ev)}
                                        className="text-gray-400"
                                        to={"/"}
                                    >
                                        Sign out
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        to="/login"
                                        className="text-gray-400"
                                    >
                                        Đăng nhập
                                    </NavLink>
                                )}
                            </ol>

                            <ul className="main_nav">
                                <li>
                                    <a href="/" className="logo_nav">
                                        <img src="/img/logo.png" alt="" />
                                    </a>
                                </li>
                                <li className="menu_item">
                                    <NavLink
                                        to="/profile"
                                        className={({ isActive }) =>
                                            classNames(
                                                isActive
                                                    ? "bg-blue-300 text-gray-800" // Thay đổi màu nền ở đây
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "px-3 py-2 rounded-md text-sm font-medium"
                                            )
                                        }
                                    >
                                        <img
                                            src="./img/icon-profile.svg"
                                            alt=""
                                        />
                                        {currentUser && currentUser.name}
                                    </NavLink>
                                </li>
                                {/*<li className="menu_item">*/}
                                {/*    <NavLink*/}
                                {/*        to="/gioithieu"*/}
                                {/*        className={({isActive}) =>*/}
                                {/*            classNames(*/}
                                {/*                isActive*/}
                                {/*                    ? "bg-blue-300 text-gray-800" // Thay đổi màu nền ở đây*/}
                                {/*                    : "text-gray-300 hover:bg-gray-700 hover:text-white",*/}
                                {/*                "px-3 py-2 rounded-md text-sm font-medium"*/}
                                {/*            )*/}
                                {/*        }*/}
                                {/*    >*/}
                                {/*        Giới thiệu*/}
                                {/*    </NavLink>*/}
                                {/*</li>*/}
                                <li className="menu_item">
                                    <NavLink
                                        to="/transactionOfficer"
                                        className={({ isActive }) =>
                                            classNames(
                                                isActive
                                                    ? "bg-blue-300 text-gray-800" // Thay đổi màu nền ở đây
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "px-3 py-2 rounded-md text-sm font-medium"
                                            )
                                        }
                                    >
                                        Quản lý nhân viên điểm giao dịch
                                    </NavLink>
                                </li>
                                <li className="menu_item">
                                    <NavLink
                                        to="/statsTransactionHead"
                                        className={({ isActive }) =>
                                            classNames(
                                                isActive
                                                    ? "bg-blue-300 text-gray-800" // Thay đổi màu nền ở đây
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "px-3 py-2 rounded-md text-sm font-medium"
                                            )
                                        }
                                    >
                                        Thống kê đơn hàng
                                    </NavLink>
                                </li>

                                <li className="menu_item">
                                    <b>Trang trưởng điểm giao dịch</b>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <div className="back_to_top">
                    <img src="./img/icon-back-to-top.svg" alt="" />
                </div>
            </div>
        </>
    );
}
