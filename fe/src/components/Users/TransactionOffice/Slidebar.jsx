import React from 'react';
import "../../../css/transation_staff.css"

const Sidebar = () => {
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
                        <a href="/transaction_staff/tracuu" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Tra cứu đơn</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/transaction_staff/danh_sach_don" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Danh sách đơn</span>
                        </a>
                    </li>
                    {/* Uncomment the code below if needed */}
                    {/* <li className="nav_item">
                        <a href="/transaction_staff/tao_tui" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt="" />
                            </span>
                            <span className="titlesiderbar">Tạo túi hàng</span>
                        </a>
                    </li> */}
                    <li className="nav_item">
                        <a href="/transaction_staff/danh_sach_tui_di" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Danh sách túi đi</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/transaction_staff/danh_sach_tui_nhan" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Danh sách túi nhận</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/transaction_staff/danh_sach_giao_thanh_cong" className="sidebar_link">
                            <span className="icon_holder">
                                <img src="/img/icon-login.svg" alt=""/>
                            </span>
                            <span className="titlesiderbar">Giao thành công</span>
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="/transaction_staff/danh_sach_giao_that_bai" className="sidebar_link">
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

export default Sidebar;
