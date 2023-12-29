import React, {useContext, useEffect, useState} from 'react';
import {TransactionOfficeContext} from "./TransactionOfficeProvider.jsx";
import {useNavigate} from "react-router-dom";
import axiosClient from "../../../axios.js";

const OrderListTransaction = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [selectedOrderIds, setSelectedOrderIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const [listGood, setListGood] = useState([]);

    useEffect(() => {
        axiosClient.get('/list_good_send_transaction')
            .then(({data}) => {
                console.log("data", data.goods);
                if (data && data.goods) {
                    setListGood(data.goods);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        setData(listGood);
    }, [listGood]);

    const handleSelectAll = () => {
        const updatedData = data.map(item => ({...item, check_: !selectAll}));
        setData(updatedData);
        setSelectAll(!selectAll);
        const allOrderIds = updatedData.map(item => item.id);
        setSelectedOrderIds(!selectAll ? allOrderIds : []);
    };

    const handleSelectOrder = (orderId) => {
        const updatedData = data.map(item =>
            item.id === orderId ? {...item, check_: !item.check_} : item
        );
        setData(updatedData);

        // Use the updatedData directly to determine whether to set selectAll
        const allSelected = updatedData.every(item => item.check_);
        setSelectAll(allSelected);

        // Use updatedData to get the selected order IDs
        const selectedIds = updatedData.filter(item => item.check_).map(item => item.id);
        setSelectedOrderIds(selectedIds);
    };

    const handleCreatePackage = () => {
        if (selectedOrderIds.length > 0) {
            // Kiểm tra giá trị của selectedOrderIds
            console.log('Selected Order IDs:', selectedOrderIds);

            // Chuyển hướng đến trang tạo túi hàng và truyền danh sách ID qua URL
            navigate(`/transaction_staff/create-package?orderIds=${selectedOrderIds.join(',')}`);
        } else {
            console.log('Vui lòng chọn ít nhất một đơn hàng để tạo túi hàng.');
        }
    };
    const handleSortAscending = () => {
        // Sắp xếp listGood tăng dần và cập nhật state
        const sortedList = [...listGood].sort((a, b) => a.receiving_transaction_point_id - b.receiving_transaction_point_id);
        setListGood(sortedList);
    };

    const handleSortDescending = () => {
        // Sắp xếp listGood giảm dần và cập nhật state
        const sortedList = [...listGood].sort((a, b) => b.receiving_transaction_point_id - a.receiving_transaction_point_id);
        setListGood(sortedList);
    };


    return (
        <div className="page_container">
            <main className="main_content">
                <div id="mainContent">
                    <div className="full_container">
                        <div className="content_title">
                            DANH SÁCH ĐƠN TẠO ĐI ĐIỂM TẬP KẾT
                        </div>
                        <div className="container_product_list">
                            {listGood.length > 0 ? (
                                <div className="nav_bar_service">
                                    <input type="button" value="Xóa" name="delete"/>
                                    <input
                                        type="button"
                                        value="Tạo túi hàng"
                                        id="btn_tao_tui"
                                        className="check_btn"
                                        onClick={handleCreatePackage}
                                        // disabled={!selectAll}
                                    />
                                    <input
                                        type="button"
                                        value="Sắp xếp tăng dần"
                                        onClick={handleSortAscending}
                                    />
                                    <input
                                        type="button"
                                        value="Sắp xếp giảm dần"
                                        onClick={handleSortDescending}
                                    />

                                    <input
                                        type="button"
                                        value="ALL"
                                        onClick={handleSelectAll}
                                    />
                                </div>
                            ) : (
                                <div id="error_note" style={{display: ''}}>
                                    <i style={{color: 'red'}}>*Không tìm thấy đơn hàng</i>
                                </div>
                            )}
                            {listGood.length > 0 && (
                                <div className="product_list" id="product_list">
                                    <table id="product_list_table">
                                        <thead>
                                        <tr>
                                            <th>
                                                <input
                                                    type="checkbox"
                                                    name="all"
                                                    id="check_all"
                                                    onChange={handleSelectAll}
                                                    checked={selectAll}
                                                />
                                            </th>
                                            <th>Điểm giao dịch gửi</th>
                                            <th>Điểm giao dịch nhận</th>
                                            <th>Mã đơn hàng</th>
                                            <th>Tên Người Gửi</th>
                                            <th>Tên Người Nhận</th>
                                            <th>Ngày tạo đơn</th>
                                            <th>Trạng thái</th>
                                            <th className="py-2 px-4 border-b">Delete</th>
                                            <th className="py-2 px-4 border-b">View/ Edit</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {data.map(item => (
                                            <tr key={item.id}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        name="check_list"
                                                        id={item.id}
                                                        className="check_list"
                                                        checked={item.check_}
                                                        onChange={() => handleSelectOrder(item.id)}
                                                    />
                                                </td>
                                                <td>
                                                    <span>{item.sending_transaction_point.name}</span>
                                                </td>
                                                <td>
                                                    <span>{item.receiving_transaction_point.name}</span>
                                                </td>
                                                <td>{item.code}</td>
                                                <td>{item.sender_name}</td>
                                                <td>{item.receiver_name}</td>
                                                <td>
                                                    <span>{item.created_at}</span>
                                                </td>
                                                <td>{item.status}</td>
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
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OrderListTransaction;
