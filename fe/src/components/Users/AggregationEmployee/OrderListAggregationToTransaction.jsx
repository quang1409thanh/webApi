import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {AggregationEmployeeContext} from "./AggregationEmployeeProvider.jsx";
import axiosClient from "../../../axios.js";

const OrderListAggregationToTransaction = () => {

    const [listGoodToTransaction, setListGoodToTransaction] = useState([]);

    useEffect(() => {
        axiosClient.get('/list_good_from_aggregation')
            .then(({data}) => {
                // Kiểm tra xem dữ liệu có tồn tại không trước khi thêm vào state
                console.log("data", data.goods);
                if (data && data.goods) {
                    setListGoodToTransaction(data.goods);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [selectedOrderIds, setSelectedOrderIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        setData(listGoodToTransaction);
    }, [listGoodToTransaction]);

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

            navigate(`/aggregation_employee/create-package-tk-gd?orderIds=${selectedOrderIds.join(',')}`);
        } else {
            console.log('Vui lòng chọn ít nhất một đơn hàng để tạo túi hàng.');
        }
    };

    return (
        <div className="page_container">
            <main className="main_content">
                <div id="mainContent">
                    <div className="full_container">
                        <div className="content_title">
                            DANH SÁCH ĐƠN TẠO
                        </div>
                        <div className="container_product_list">
                            {listGoodToTransaction.length > 0 ? (
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
                                    />
                                    <input
                                        type="button"
                                        value="Sắp xếp giảm dần"
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
                            {listGoodToTransaction.length > 0 && (
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
                                            <th>Bưu cục giao dịch</th>
                                            <th>Mã đơn hàng</th>
                                            <th>Tên Người Gửi</th>
                                            <th>Tên Người Nhận</th>
                                            <th>Ngày tạo đơn</th>
                                            <th>Trạng thái</th>
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
                                                    <span>{item.sending_transaction_point_id}</span>
                                                    <span>{item.receiving_transaction_point_id}</span>
                                                </td>
                                                <td>{item.code}</td>
                                                <td>{item.sender_name}</td>
                                                <td>{item.receiver_name}</td>
                                                <td>
                                                    <span>{item.created_at}</span>
                                                </td>
                                                <td>{item.status}</td>
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

export default OrderListAggregationToTransaction;
