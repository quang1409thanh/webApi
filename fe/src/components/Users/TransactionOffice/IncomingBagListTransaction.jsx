import React, {useContext, useEffect, useState} from "react";
import {TransactionOfficeContext} from "./TransactionOfficeProvider.jsx";
import axiosClient from "../../../axios.js";
import {useStateContext} from "../../../contexts/ContextProvider.jsx";

const IncomingBagListTransaction = () => {
    const {showToast} = useStateContext();
    const [submitted, setSubmitted] = useState(false);
    const [listIncomingTransaction, setListIncomingTransaction] = useState([])
    useEffect(() => {
        axiosClient.get('/list_incoming_transaction')
            .then(({data}) => {
                // Kiểm tra xem dữ liệu có tồn tại không trước khi thêm vào state
                console.log("data", data.shipmentTkGd);
                if (data && data.shipmentTkGd) {
                    setSubmitted(false);
                    setListIncomingTransaction(data.shipmentTkGd);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [submitted]);

    const handleAccept = (e, id) => {
        e.preventDefault();
        // Gửi dữ liệu đến API backend
        axiosClient
            .post(`/accept-tk-gd/${id}`, {})
            .then((response) => {
                console.log(response);
                setSubmitted(true);
                showToast("Đã chấp nhận túi hàng từ điểm tập kết")
            })
            .catch((error) => {
                // Xử lý lỗi nếu cần
                console.error("Error adding user:", error);
            });
    };

    return (
        <div className="page_container">
            <main className="main_content">
                <div id="mainContent">
                    <div className="full_container">
                        <div className="content_title">
                            DANH SÁCH TÚI HÀNG NHẬN TỪ ĐIỂM TẬP KẾT
                        </div>
                        <div className="container_product_list">
                            <table id="product_list_table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                    <th>Được Gửi Từ</th>
                                    <th>Gửi Đến</th>
                                    <th className="py-2 px-4 border-b">
                                        Delete
                                    </th>
                                    <th className="py-2 px-4 border-b">
                                        View/ Edit
                                    </th>
                                    <th className="py-2 px-4 border-b">
                                        Accept
                                    </th>

                                    {/* Thêm các cột khác tùy ý */}
                                </tr>
                                </thead>
                                <tbody>
                                {/* Sử dụng map để lặp qua danh sách và hiển thị thông tin */}
                                {listIncomingTransaction.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.status}</td>
                                        <td>{item.created_at}</td>
                                        <td>
                                            {
                                                item
                                                    .sending_aggregation_point
                                                    .name
                                            }
                                        </td>
                                        <td>
                                            {
                                                item
                                                    .receiving_transaction_point
                                                    .name
                                            }
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <form
                                                method="DELETE"
                                                onSubmit={(event) =>
                                                    handleDelete(
                                                        event,
                                                        item.id
                                                    )
                                                }
                                            >
                                                <button
                                                    type="submit"
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    DELETE
                                                </button>
                                            </form>
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <a
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                href={`/transaction_staff/outgoing_bag_list/${item.id}`}
                                            >
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

export default IncomingBagListTransaction;
