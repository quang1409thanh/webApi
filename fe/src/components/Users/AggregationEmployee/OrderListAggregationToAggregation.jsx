import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {AggregationEmployeeContext} from "./AggregationEmployeeProvider.jsx";
import axiosClient from "../../../axios.js";

const OrderListAggregationToAggregation = () => {

    const [listGoodToAggregation, setListGoodToAggregation] = useState([]);

    useEffect(() => {
        axiosClient.get('/list_good_from_transaction')
            .then(({data}) => {
                // Kiểm tra xem dữ liệu có tồn tại không trước khi thêm vào state
                console.log("data", data.goods);
                if (data && data.goods) {
                    setListGoodToAggregation(data.goods);
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
        setData(listGoodToAggregation);
    }, [listGoodToAggregation]);

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
            navigate(`/aggregation_employee/create-package-tk-tk?orderIds=${selectedOrderIds.join(',')}`);
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
                            {listGoodToAggregation.length > 0 ? (
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
                                        value="ALL"
                                        onClick={handleSelectAll}
                                    />
                                </div>
                            ) : (
                                <div id="error_note" style={{display: ''}}>
                                    <i style={{color: 'red'}}>*Không tìm thấy đơn hàng</i>
                                </div>
                            )}
                            {listGoodToAggregation.length > 0 && (
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
                                            <th>Cập nhật trạng thái</th>
                                            <th>Chuyến đơn</th>
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
                                                <td>
                                                    <span>
                                                      <select name="select_trang_thai" className="select_trang_thai">
                                                        <option>--CN Trạng thái--</option>
                                                        <option>Chấp nhận gửi</option>
                                                        <option>Đã giao hàng</option>
                                                        <option>Giao thất bại</option>
                                                        <option>Thất lạc</option>
                                                      </select>
                                                    </span>
                                                    <span>
                                                      <div className="btn_cn_trang_thai">
                                                        <input
                                                            type="button"
                                                            className="cn_trang_thai check_btn"
                                                            code={item._id}
                                                            value="OK"
                                                        />
                                                      </div>
                                                    </span>
                                                </td>
                                                <td>{item.chuyen_don}</td>
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

export default OrderListAggregationToAggregation;
