import React from 'react';
import "../../../css/transation_staff.css"

const SidebarTransaction = () => {
    return (
        <div className="sidebar">
            <div className="sidebar_inner">
                <ul className="sidebar_menu">
                    <li className="nav_item">
                        <a href="/transaction_staff" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Tạo đơn</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/transaction_staff/order_search" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Tra cứu đơn</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/transaction_staff/order_list" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Danh sách đơn đi</span>
                        </a>
                    </li>
                    {/* Uncomment the code below if needed */}
                    <li className="nav_item">
                        <a href="/transaction_staff/order_list_receive" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt="" />
                            </span>
                            <span className="titlesiderbar">Danh sách đơn nhận</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/transaction_staff/outgoing_bag_list" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Danh sách túi đi</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/transaction_staff/incoming_bag_list" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Danh sách túi nhận</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/transaction_staff/success_order_list" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Giao thành công</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/transaction_staff/failed_order_list" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Giao thất bại</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarTransaction;
