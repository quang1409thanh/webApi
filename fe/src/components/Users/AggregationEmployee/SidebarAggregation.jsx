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
                        <a href="/aggregation_employee/order_list" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Danh sách đơn</span>
                        </a>
                    </li>

                    <li className="nav_item">
                        <a href="/aggregation_employee/outgoing_list" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Danh sách túi đi</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/aggregation_employee/incoming_list" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Danh sách túi nhận</span>
                        </a>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default SidebarAggregation;
