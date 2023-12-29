import React, {Fragment} from "react";
import {Navigate, NavLink, Outlet} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import axiosClient from "../../axios.js";
import {useEffect} from "react";
import Toast from "../Common/Toast.jsx";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Header() {
    const {currentUser, userToken, setCurrentUser, setUserToken} =
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
                                        <img src="/img/logo.png" alt=""/>
                                    </a>
                                </li>
                                <li className="menu_item">
                                    <NavLink
                                        to="/profile"
                                        className={({isActive}) =>
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
                                        to="/aggregationPoint"
                                        className={({isActive}) =>
                                            classNames(
                                                isActive
                                                    ? "bg-blue-300 text-gray-800" // Thay đổi màu nền ở đây
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "px-3 py-2 rounded-md text-sm font-medium"
                                            )
                                        }
                                    >
                                        Quản lý điểm tập kết
                                    </NavLink>
                                </li>

                                <li className="menu_item">
                                    <NavLink
                                        to="/transactionPoint"
                                        className={({isActive}) =>
                                            classNames(
                                                isActive
                                                    ? "bg-blue-300 text-gray-800" // Thay đổi màu nền ở đây
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "px-3 py-2 rounded-md text-sm font-medium"
                                            )
                                        }
                                    >
                                        Quản lý điểm giao dịch
                                    </NavLink>
                                </li>

                                <li className="menu_item">
                                    <NavLink
                                        to="/manageuser"
                                        className={({isActive}) =>
                                            classNames(
                                                isActive
                                                    ? "bg-blue-300 text-gray-800" // Thay đổi màu nền ở đây
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "px-3 py-2 rounded-md text-sm font-medium"
                                            )
                                        }
                                    >
                                        Thêm tài khoản
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <div className="back_to_top">
                    <img src="./img/icon-back-to-top.svg" alt=""/>
                </div>
            </div>
        </>
    );
}
