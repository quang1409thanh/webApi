import React, {useContext, useEffect, useState} from 'react';
import {TransactionOfficeContext} from "./TransactionOfficeProvider.jsx";
import {useNavigate} from "react-router-dom";
import axiosClient from "../../../axios.js";

const OrderListTransactionReceiving = () => {

    const [listGoodReceive, setListGoodReceive] = useState([]);

    const [submitted, setSubmitted] = useState(false);
    useEffect(() => {
        axiosClient.get('/list_good_receive_transaction')
            .then(({data}) => {
                // Kiểm tra xem dữ liệu có tồn tại không trước khi thêm vào state
                console.log("data", data.goods);
                if (data && data.goods) {
                    setSubmitted(false);
                    setListGoodReceive(data.goods);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [submitted]);
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [selectedOrderIds, setSelectedOrderIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        setData(listGoodReceive);
    }, [listGoodReceive]);

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

            // Chuyển hướng đến trang tạo túi hàng và truyền danh sách ID qua URL
            navigate(`/transaction_staff/create-package?orderIds=${selectedOrderIds.join(',')}`);
        } else {
            console.log('Vui lòng chọn ít nhất một đơn hàng để tạo túi hàng.');
        }
    };

    function handleDeliverySuccess(id) {

    }

    function handleDeliveryFailure(id) {

    }

    function handleLoss(id) {

    }

    function handleDeliverySuccessPackage() {

        axiosClient.post('/change-status-good', {
            good_ids: selectedOrderIds,
            type: "success",
        }).then(response => {
            setSubmitted(true);
            // Handle success, you might want to do something with the response
            console.log('Shipment created successfully:', response.data);
        }).catch(error => {
            // Handle error, you might want to show an error message to the user
            console.error('Error creating shipment:', error);
        });
    }

    function handleDeliveryFailurePackage() {
        axiosClient.post('/change-status-good', {
            good_ids: selectedOrderIds,
            type: "failure",
        }).then(response => {
            setSubmitted(true);
            // Handle success, you might want to do something with the response
            console.log('Shipment created successfully:', response.data);
        }).catch(error => {
            // Handle error, you might want to show an error message to the user
            console.error('Error creating shipment:', error);
        });


    }

    function handleLossPackage() {
        axiosClient.post('/change-status-good', {
            good_ids: selectedOrderIds,
            type: "loss",
        }).then(response => {
            setSubmitted(true);

            // Handle success, you might want to do something with the response
            console.log('Shipment created successfully:', response.data);
        }).catch(error => {
            // Handle error, you might want to show an error message to the user
            console.error('Error creating shipment:', error);
        });


    }

    return (
        <div className="page_container">
            <main className="main_content">
                <div id="mainContent">
                    <div className="full_container">
                        <div className="content_title">
                            DANH SÁCH ĐƠN HÀNG ĐÃ NHẬN TỪ ĐIỂM TẬP KẾT
                        </div>
                        <div className="container_product_list">
                            {listGoodReceive.length > 0 ? (
                                <div className="nav_bar_service">
                                    <div className="py-2 px-4 border-b">
                                        <div className="flex">
                                            <button type="button" value="Xóa" name="delete"
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                            >
                                                Xóa
                                            </button>

                                            <button
                                                type="button"
                                                value="ALL"
                                                onClick={handleSelectAll}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"

                                            >
                                                All
                                            </button>


                                            <button
                                                type="button"
                                                className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                                onClick={() => handleDeliverySuccessPackage()}
                                            >
                                                Delivery Success
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                                onClick={() => handleDeliveryFailurePackage()}
                                            >
                                                Delivery Failure
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => handleLossPackage()}
                                            >
                                                Loss
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div id="error_note" style={{display: ''}}>
                                    <i style={{color: 'red'}}>*Không tìm thấy đơn hàng</i>
                                </div>
                            )}
                            {listGoodReceive.length > 0 && (
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
                                            <th>Ngày Tạo Đơn</th>
                                            <th>Ngày Cập Nhật</th>
                                            <th>Status</th>
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
                                                <td>
                                                    <span>{item.updated_at}</span>
                                                </td>

                                                <td className="py-2 px-4 border-b">
                                                    {item.status === 'chuyển thành công đến người nhận' ? (
                                                        <button
                                                            type="button"
                                                            className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => handleDeliverySuccess(item.id)}
                                                        >
                                                            Delivery Success
                                                        </button>
                                                    ) : item.status === 'chuyển thất bại đến người nhận' ? (
                                                        <button
                                                            type="button"
                                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => handleDeliveryFailure(item.id)}
                                                        >
                                                            Delivery Failure
                                                        </button>
                                                    ) : item.status === 'đơn hàng bị thất lạc' ? (
                                                        <button
                                                            type="button"
                                                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => handleLoss(item.id)}
                                                        >
                                                            Loss
                                                        </button>
                                                    ) : (
                                                        // You can add a default action or leave it empty
                                                        <span>No action available</span>
                                                    )}
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

export default OrderListTransactionReceiving;
