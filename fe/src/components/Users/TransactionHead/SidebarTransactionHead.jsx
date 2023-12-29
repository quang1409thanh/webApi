import React from "react";
import "../../../css/transation_staff.css";

const SidebarTransaction = () => {
    return (
        <div className="sidebar">
            <div className="sidebar_inner">
                <ul className="sidebar_menu">
                    <li className="nav_item">
                        <a
                            href="/statsTransactionHead"
                            className="sidebar_link"
                        >
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt="" />
                            </span>
                            <span className="titlesiderbar">
                                Đơn thành công
                            </span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a
                            href="/statsTransactionHead/failed_order_list"
                            className="sidebar_link"
                        >
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt="" />
                            </span>
                            <span className="titlesiderbar">Đơn thất bại</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarTransaction;
