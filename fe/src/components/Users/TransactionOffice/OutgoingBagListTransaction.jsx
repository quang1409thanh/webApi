import React, {useContext, useEffect, useState} from 'react';
import {TransactionOfficeContext} from "./TransactionOfficeProvider.jsx";
import axiosClient from "../../../axios.js";

const OutgoingBagListTransaction = () => {
    const [listOutgoingTransaction, setListOutgoingTransaction] = useState([])
    useEffect(() => {
        axiosClient.get('/list_outgoing_transaction')
            .then(({data}) => {
                // Kiểm tra xem dữ liệu có tồn tại không trước khi thêm vào state
                console.log("data", data.shipmentGdTk);
                if (data && data.shipmentGdTk) {
                    setListOutgoingTransaction(data.shipmentGdTk);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="page_container">
            <main className="main_content">
                <div id="mainContent">
                    <div className="full_container">
                        <div className="content_title">
                            DANH SÁCH TÚI HÀNG ĐI LÊN ĐIỂM TẬP KẾT
                        </div>
                        <div className="container_product_list">
                            <div>

                            </div>
                            <div className="centered-container nav_bar_service">
                                <input type="button" value="Xóa" name="delete"/>
                                <input
                                    type="button"
                                    value="Tạo túi hàng"
                                    id="btn_tao_tui"
                                    className="check_btn"
                                />
                                <input
                                    type="button"
                                    value="Sắp xếp tăng dần"
                                />
                                <input
                                    type="button"
                                    value="Sắp xếp giảm dần"
                                />
                                <input
                                    type="button"
                                    value="ALL"
                                />
                            </div>

                            <table id="product_list_table">
                                <thead>
                                <tr>
                                    <th>ID</th>

                                    <th>Status</th>
                                    <th>Created At</th>
                                    <th>Điểm giao dịch gửi</th>
                                    <th>Điểm giao dịch nhận</th>
                                    <th className="py-2 px-4 border-b">Delete</th>
                                    <th className="py-2 px-4 border-b">View/ Edit</th>

                                    {/* Thêm các cột khác tùy ý */}
                                </tr>
                                </thead>
                                <tbody>
                                {/* Sử dụng map để lặp qua danh sách và hiển thị thông tin */}
                                {listOutgoingTransaction.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.status}</td>
                                        <td>{item.created_at}</td>
                                        <td>{item.sending_transaction_point.name}</td>
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
                                        {/* Thêm các cột khác tùy ý */}
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

export default OutgoingBagListTransaction;
