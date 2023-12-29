import React from 'react';
import "../../../css/transation_staff.css"

const SidebarAggregation = () => {
    return (
        <div className="sidebar">
            <div className="sidebar_inner">
                <ul className="sidebar_menu">
                    <li className="nav_item">
                        <a href="/aggregation_employee/order_search" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Tra cứu đơn</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/aggregation_employee/order_list_to_aggregation" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Đơn đi điểm tập kết</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/aggregation_employee/order_list_to_transaction" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Đơn đi điểm giao dịch</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/aggregation_employee/outgoing_list_to_transaction" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Túi đi giao dịch</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/aggregation_employee/incoming_list_from_aggregation" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Túi nhận từ tập kết</span>
                        </a>
                    </li>

                    <li className="nav_item">
                        <a href="/aggregation_employee/outgoing_list_to_aggregation" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Túi đi tập kết</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/aggregation_employee/incoming_list_from_transaction" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Túi nhận giao dịch</span>
                        </a>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default SidebarAggregation;
