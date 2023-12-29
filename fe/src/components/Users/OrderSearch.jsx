import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import axiosClient from "../../axios.js";

const OrderSearch = ({}) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    console.log("code", code);

    const [goodInfo, setGoodInfo] = useState({
        code: '',
        sending_transaction_point: {
            name: '',
            address: {
                province: '',
            }
        },
        receiving_transaction_point: {
            name: '',
            address: {
                province: '',
            }
        },
        current_location: {
            name: '',
        },
        sender_name: '',
        receiver_name: '',
        history: [],
        status: '',
    });


    useEffect(() => {
        axiosClient.get(`/search_good/${code}`)
            .then(({data}) => {
                setGoodInfo(data);
                console.log('Good Info:', data);
                const parsedHistory = JSON.parse(data.history);
                // Cập nhật state với mảng đã được chuyển đổi
                setGoodInfo({...data, history: parsedHistory});
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        return {date: formattedDate, time: formattedTime};
    };

    return (
        <div>
            <main className="search_content">
                <div id="mainContent">
                    <section className="find-items-content">
                        <div className="order-search-info">
                            <div className="order-search-info-title">
                                <h3>THÔNG TIN BƯU GỬI</h3>
                            </div>
                            <div className="order-search-info-top row">
                                <div className="order-search-info-top-text col-lg-5 col-sm-3 col-6">
                                    <div>Code Tracking</div>
                                    <p>{goodInfo.code}</p>
                                </div>
                                <div className="order-search-info-top-text col-lg-1 col-sm-3 col-6">
                                    <div>Khối lượng (kg)</div>
                                    <p>{goodInfo.weight}</p>
                                </div>
                                <div className="order-search-info-top-text col-lg-4 col-sm-3 col-6">
                                    <div>Điểm giao dịch gửi:{" "}
                                    </div>
                                    <p>
                                        {goodInfo.sending_transaction_point.name}
                                    </p>
                                </div>
                                <div className="order-search-info-top-text col-lg-4 col-sm-3 col-6">
                                    <div>
                                        Đểm giao dịch nhận:{" "}
                                    </div>
                                    <p>
                                        {goodInfo.receiving_transaction_point.name}
                                    </p>
                                </div>
                            </div>
                            <div className="order-search-info-middle row">
                                <div className="col-lg-4-1 col-sm-6 col-12">
                                    <div>
                                        Tỉnh gửi:
                                        <span>{goodInfo.sending_transaction_point.address.province}</span>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-sm-6 col-12">
                                    <div>
                                        Địa chỉ gửi:
                                        <span>{goodInfo.sending_transaction_point.address.district}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="order-search-info-middle row">
                                <div className="col-lg-4-1 col-sm-6 col-12">
                                    <div>
                                        Tỉnh Nhận:
                                        <span>{goodInfo.receiving_transaction_point.address.province}</span>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-sm-6 col-12">
                                    <div>
                                        Địa chỉ nhận:
                                        <span>{goodInfo.receiving_transaction_point.address.district}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="order-search-info-bottom row">
                                <div className="col-12">
                                    <div>
                                        Trạng thái:
                                        <span>{goodInfo.status}</span>
                                    </div>
                                </div>
                            </div>
                            {/* ... (Các phần thông tin khác) */}
                            <div className="order-search-info-status">
                                <div className="order-search-info-status-title">
                                    <h3>THÔNG TIN CỤ THỂ</h3>
                                </div>
                                <div className="order-search-info-status-content">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Ngày</th>
                                                <th>Giờ</th>
                                                <th>Trạng Thái</th>
                                                <th>Thời gian cập nhật</th>
                                                <th>Vị trí hiện tại</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {goodInfo.history.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    {/* Thêm các ô dữ liệu cần hiển thị */}
                                                    <td>{formatDateTime(item.updated_at).date}</td>
                                                    <td>{formatDateTime(item.updated_at).time}</td>
                                                    <td>{item.status}</td>
                                                    <td>{item.updated_at}</td>
                                                    <td>{goodInfo.current_location.name}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* )
                                : (
                                     <div id="error_note" style={{ display: '' }}>
                                         <i style={{ color: 'red' }}>*Không tìm thấy đơn hàng</i>
                                     </div>
                                 )} */}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default OrderSearch;
