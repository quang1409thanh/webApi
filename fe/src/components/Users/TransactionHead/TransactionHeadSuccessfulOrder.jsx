import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios.js";

const TransactionHeadSuccessfulOrder = () => {
    const [listGoodSuccess, setlistGoodSuccess] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(listGoodSuccess);
    }, [listGoodSuccess]);

    useEffect(() => {
        axiosClient
            .get("/list_good_send_success")
            .then(({ data }) => {
                console.log("data", data.goods);
                if (data && data.goods) {
                    setlistGoodSuccess(data.goods);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="page_container">
            <main className="main_content">
                <div id="mainContent">
                    <div className="full_container">
                        <div className="content_title">
                            DANH SÁCH ĐƠN THÀNH CÔNG
                        </div>
                        <div className="container_product_list">
                            <div className="nav_bar_service">
                                <input
                                    type="button"
                                    value="Xóa"
                                    name="delete"
                                />
                            </div>
                            <div className="product_list" id="product_list">
                                <table id="product_list_table">
                                    <thead>
                                        <tr>
                                            <th>Điểm giao dịch gửi</th>
                                            <th>Điểm giao dịch nhận</th>
                                            <th>Mã đơn hàng</th>
                                            <th>Tên Người Gửi</th>
                                            <th>Tên Người Nhận</th>
                                            <th>Ngày tạo đơn</th>
                                            <th>Trạng thái</th>
                                            <th className="py-2 px-4 border-b">
                                                Delete
                                            </th>
                                            <th className="py-2 px-4 border-b">
                                                View/ Edit
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>item</span>
                                            </td>
                                            <td>
                                                <span>
                                                    .receiving_transaction_point
                                                </span>
                                            </td>
                                            <td>code</td>
                                            <td>ender_name</td>
                                            <td>receiver_name</td>
                                            <td>
                                                <span>.created_at</span>
                                            </td>
                                            <td>.status</td>
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
                                                    href={`/transaction_staff/outgoing_bag_list/$.id}`}
                                                >
                                                    DETAIL
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TransactionHeadSuccessfulOrder;
