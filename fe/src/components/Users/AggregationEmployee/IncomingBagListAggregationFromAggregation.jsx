import React, {useContext, useEffect, useState} from 'react';
import {AggregationEmployeeContext} from "./AggregationEmployeeProvider.jsx";
import axiosClient from "../../../axios.js";
import {useStateContext} from "../../../contexts/ContextProvider.jsx";

const IncomingBagListAggregationFromAggregation = () => {
    const {showToast} = useStateContext();
    const [submitted, setSubmitted] = useState(false);

    const [buttonClicked, setButtonClicked] = useState(false);
    const [listIncomingFromAggregation, setListIncomingFromAggregation] = useState([]);
    useEffect(() => {
        axiosClient.get('/list_incoming_from_aggregation')
            .then(({data}) => {
                console.log("data", data.shipmentTkTk);
                if (data && data.shipmentTkTk) {
                    setListIncomingFromAggregation(data.shipmentTkTk);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [submitted]);

    console.log("listIncomingFromAggregation", listIncomingFromAggregation);
    const handleAccept = (e, id) => {
        e.preventDefault();
        setSubmitted(true);
        showToast("Đã chấp nhận đơn gửi từ điểm tập kết")
        // Gửi dữ liệu đến API backend
        axiosClient.post(`/accept-tk-tk/${id}`,
            {})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                // Xử lý lỗi nếu cần
                console.error('Error adding user:', error);
            });
        setButtonClicked(true);

    };

    return (
        <div className="page_container">
            <main className="main_content">
                <div id="mainContent">
                    <div className="full_container">
                        <div className="content_title">
                            DANH SÁCH TÚI HÀNG ĐẾN TỪ ĐIỂM TẬP KẾT.
                        </div>
                        <div className="container_product_list">
                            <div className="form_input_time">
                                <div className="since_input">
                                    <div className="date-picker-container">
                                        <label htmlFor="since_input">Từ ngày:</label>
                                        <div className="picker_container">
                                            <input type="text" name="since_input" className="date-picker-input"
                                                   id="datepicker1" readOnly/>
                                            <div className="calendar-icon"
                                                 onClick={() => showCalendar1()}>&#128197;</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="to_input">
                                    <div className="date-picker-container">
                                        <label htmlFor="to_input">Đến ngày:</label>
                                        <div className="picker_container">
                                            <input type="text" name="to_input" className="date-picker-input"
                                                   id="datepicker2" readOnly/>
                                            <div className="calendar-icon"
                                                 onClick={() => showCalendar2()}>&#128197;</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn_find_for_date">
                                    <div className="btn_tim" id="btn_tim">
                                        <img src="/img/order-search.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="nav_bar_service">
                                {/* Uncomment the lines below if needed */}
                                {/* <input type="button" value="Xóa" name="delete" />
                <input type="button" value="Cap nhat trang thai" />
                <input type="button" value="ALL" /> */}
                            </div>
                            <table id="product_list_table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                    <th>Được Gửi Từ</th>
                                    <th>Gửi Đến</th>
                                    <th className="py-2 px-4 border-b">Delete</th>
                                    <th className="py-2 px-4 border-b">View/ Edit</th>
                                    <th className="py-2 px-4 border-b">Chấp nhận</th>

                                    {/* Thêm các cột khác tùy ý */}
                                </tr>
                                </thead>
                                <tbody>
                                {/* Sử dụng map để lặp qua danh sách và hiển thị thông tin */}
                                {listIncomingFromAggregation.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.status}</td>
                                        <td>{item.created_at}</td>
                                        <td>{item.sending_aggregation_point.name}</td>
                                        <td>{item.receiving_aggregation_point.name}< /td>
                                        <td className="py-2 px-4 border-b">
                                            <form
                                                method="DELETE"
                                                onSubmit={(event) => handleDelete(event, item.id)}>
                                                <button type="submit"
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                    DELETE
                                                </button>
                                            </form>
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                               href={`/transaction_staff/outgoing_bag_list/${item.id}`}>
                                                DETAIL
                                            </a>
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <form
                                                method="POST"
                                                onSubmit={(event) => handleAccept(event, item.id)}>
                                                <button
                                                    type="submit"
                                                    className={`bg-${item.status === "chuyển thành công" ? 'green' : 'blue'}-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
                                                >
                                                    {item.status === "chuyển thành công" ? 'ACCEPTED' : 'ACCEPT'}
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default IncomingBagListAggregationFromAggregation;
