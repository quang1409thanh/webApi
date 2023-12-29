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
                            <span className="titlesiderbar">Đơn đi điểm tập kết</span>
                        </a>
                    </li>
                    {/* Uncomment the code below if needed */}
                    <li className="nav_item">
                        <a href="/transaction_staff/order_list_receive" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Đơn nhận từ tập kết</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/transaction_staff/outgoing_bag_list" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Túi đi tập kết</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/transaction_staff/incoming_bag_list" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Túi nhận từ tập kết</span>
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
                    <li className="nav_item">
                        <a href="/transaction_staff/loss_order_list" className="sidebar_link">
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
