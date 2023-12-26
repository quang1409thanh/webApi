import React, {useContext, useEffect, useState} from 'react';
import {TransactionOfficeContext, TransactionOfficeProvider} from "./TransactionOfficeProvider.jsx";

const sampleOrderList =[
    {
        "id": 1,
        "code": "GTfghsoAT5",
        "sending_transaction_point_id": 2,
        "receiving_transaction_point_id": 3,
        "shipment_id": "0",
        "goods_information": null,
        "loai_hang": "H\u00e0ng h\u00f3a",
        "weight": 123546,
        "chi_dan_gui": "G\u1ecdi \u0111i\u1ec7n cho ng\u01b0\u1eddi g\u1eedi",
        "chu_dan_nv": "\u00ea\u00ea",
        "dich_vu": "\u00ea",
        "cuoc_chinh": 34,
        "phu_thu": 0,
        "thu_ho": 0,
        "status": "Ch\u1ea5p nh\u1eadn g\u1eedi",
        "history": null,
        "current_location_id": 2,
        "current_location_type": "App\\Models\\TransactionPoint",
        "created_at": "2023-12-26T09:08:52.000000Z",
        "updated_at": "2023-12-26T09:08:52.000000Z"
    },
    {
        "id": 2,
        "code": "k1v28TmeFSKA7wGSr9QgJdND5XDaSj",
        "sending_transaction_point_id": 2,
        "receiving_transaction_point_id": 3,
        "shipment_id": "0",
        "goods_information": null,
        "loai_hang": "H\u00e0ng h\u00f3a",
        "weight": 123546,
        "chi_dan_gui": "G\u1ecdi \u0111i\u1ec7n cho ng\u01b0\u1eddi g\u1eedi",
        "chu_dan_nv": "G\u1eeci cho \u0111\u1ee9c",
        "dich_vu": "144",
        "cuoc_chinh": 34,
        "phu_thu": 0,
        "thu_ho": 0,
        "status": "Ch\u1ea5p nh\u1eadn g\u1eedi",
        "history": null,
        "current_location_id": 2,
        "current_location_type": "App\\Models\\TransactionPoint",
        "created_at": "2023-12-26T09:11:59.000000Z",
        "updated_at": "2023-12-26T09:11:59.000000Z"
    },
    {
        "id": 3,
        "code": "zmvxEE9e35Z90jcNDeMYb6HWlCJ3Um",
        "sending_transaction_point_id": 2,
        "receiving_transaction_point_id": 3,
        "shipment_id": "0",
        "goods_information": null,
        "loai_hang": "T\u00e0i li\u1ec7u",
        "weight": 2,
        "chi_dan_gui": "G\u1ecdi \u0111i\u1ec7n cho ng\u01b0\u1eddi g\u1eedi",
        "chu_dan_nv": "234",
        "dich_vu": "134",
        "cuoc_chinh": 34,
        "phu_thu": 0,
        "thu_ho": 0,
        "status": "Ch\u1ea5p nh\u1eadn g\u1eedi",
        "history": null,
        "current_location_id": 2,
        "current_location_type": "App\\Models\\TransactionPoint",
        "created_at": "2023-12-26T10:18:56.000000Z",
        "updated_at": "2023-12-26T10:18:56.000000Z"
    },
    {
        "id": 4,
        "code": "1V6vwYHvnBflZaRrLi4zX0jtjlMYO1",
        "sending_transaction_point_id": 2,
        "receiving_transaction_point_id": 3,
        "shipment_id": "0",
        "goods_information": null,
        "loai_hang": "T\u00e0i li\u1ec7u",
        "weight": 234,
        "chi_dan_gui": "Chuy\u1ec3n ho\u00e0n tr\u01b0\u1edbc ng\u00e0y",
        "chu_dan_nv": "234rt",
        "dich_vu": "234rt",
        "cuoc_chinh": 34,
        "phu_thu": 0,
        "thu_ho": 0,
        "status": "Ch\u1ea5p nh\u1eadn g\u1eedi",
        "history": null,
        "current_location_id": 2,
        "current_location_type": "App\\Models\\TransactionPoint",
        "created_at": "2023-12-26T10:27:00.000000Z",
        "updated_at": "2023-12-26T10:27:00.000000Z"
    },
    {
        "id": 5,
        "code": "Y4fRPMm0eJKmwn2ANT8RWut2mzE6bl",
        "sending_transaction_point_id": 2,
        "receiving_transaction_point_id": 3,
        "shipment_id": "0",
        "goods_information": null,
        "loai_hang": "H\u00e0ng h\u00f3a",
        "weight": 1,
        "chi_dan_gui": "Chuy\u1ec3n ho\u00e0n ngay",
        "chu_dan_nv": "33",
        "dich_vu": "133",
        "cuoc_chinh": 34,
        "phu_thu": 0,
        "thu_ho": 0,
        "status": "Ch\u1ea5p nh\u1eadn g\u1eedi",
        "history": null,
        "current_location_id": 2,
        "current_location_type": "App\\Models\\TransactionPoint",
        "created_at": "2023-12-26T11:01:32.000000Z",
        "updated_at": "2023-12-26T11:01:32.000000Z"
    }
];

const OrderListTransaction = ({checkProduct}) => {
    const {listGood} = useContext(TransactionOfficeContext);
    checkProduct = true;

    const [data, setData] = useState(sampleOrderList);
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAll = () => {
        const updatedData = data.map(item => ({...item, check_: !selectAll}));
        setData(updatedData);
        setSelectAll(!selectAll);
    };

    const handleSelectOrder = (orderId) => {
        const updatedData = data.map(item =>
            item._id === orderId ? {...item, check_: !item.check_} : item
        );
        setData(updatedData);
        const allSelected = updatedData.every(item => item.check_);
        setSelectAll(allSelected);
    };

    const handleCreatePackage = () => {
        const selectedOrders = data.filter(item => item.check_);
        if (selectedOrders.length > 0) {
            console.log('Tạo túi hàng với các đơn hàng đã chọn:', selectedOrders);
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
                            {checkProduct ? (
                                <div className="nav_bar_service">
                                    <input type="button" value="Xóa" name="delete"/>
                                    <input
                                        type="button"
                                        value="Tạo túi hàng"
                                        id="btn_tao_tui"
                                        className="check_btn"
                                        onClick={handleCreatePackage}
                                        disabled={!selectAll}
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
                            {checkProduct && (
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
                                            <th>Tên khách hàng</th>
                                            <th>Ngày tạo đơn</th>
                                            <th>Trạng thái</th>
                                            <th>Cập nhật trạng thái</th>
                                            <th>Chuyến đơn</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {data.map(item => (
                                            <tr key={item._id}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        name="check_list"
                                                        id={item._id}
                                                        className="check_list"
                                                        checked={item.check_}
                                                        onChange={() => handleSelectOrder(item._id)}
                                                    />
                                                </td>
                                                <td>
                                                    <span>{item.sending_transaction_point_id}</span>
                                                    <span>{item.receiving_transaction_point_id}</span>
                                                </td>
                                                <td>{item.code}</td>
                                                <td>{item.ten_nguoi_gui}</td>
                                                <td>
                                                    <span>{item.create_at}</span>
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

export default OrderListTransaction;
