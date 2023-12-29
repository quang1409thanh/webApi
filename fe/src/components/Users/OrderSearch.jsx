import React from "react";

const value = {
    id: 11,
    code: "k7JM2IWt4DsudEfiTvT6WQXzHWs6sK",
    sending_transaction_point_id: 4,
    receiving_transaction_point_id: 1,
    sender_name: "Le Nam",
    receiver_name: "le duc",
    shipment_id_gd_tk: "8",
    shipment_id_tk_tk: "4",
    shipment_id_tk_gd: null,
    goods_information: null,
    package_type: "Tài liệu",
    weight: 12,
    instructions_send: "Chuyển hoàn ngay",
    instructions_staff: "2",
    service: "2",
    main_fee: 34,
    surcharge: 0,
    collection_fee: 0,
    status: "Đã gửi đến điểm tập kết Điểm Tập Kết Hà Nội",
    history:
        '[{"status": "Chấp nhận gửi tại địa điểm giao dịch Điểm Giao Dịch Bình Thạnh", "updated_at": "2023-12-28T10:59:36.643162Z"}, {"status": "Đang gửi lên điểm tập kết Điểm Tập Kết Sài Gòn", "updated_at": "2023-12-28T11:00:31.512976Z"}, {"status": "Đã gửi đến điểm tập kết Điểm Tập Kết Sài Gòn", "updated_at": "2023-12-28T11:03:51.121850Z"}, {"status": "Đang gửi đến điểm tập kết nhận: Điểm Tập Kết Hà Nội", "updated_at": "2023-12-28T11:05:03.840201Z"}]',
    current_location_id: 1,
    current_location_type: "App\\Models\\AggregationPoint",
    created_at: "2023-12-28T10:58:36.000000Z",
    updated_at: "2023-12-28T11:05:03.000000Z",
};

const OrderSearch = ({
    trackingCode,
    data,
    noiGui,
    noiNhan,
    trangThai,
    listTrangThai,
    foundParcel,
}) => {
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
                                <div className="order-search-info-top-text col-lg-2 col-sm-3 col-6">
                                    <div>Code Tracking</div>
                                    <p>{value.code}</p>
                                </div>
                                <div className="order-search-info-top-text col-lg-2 col-sm-3 col-6">
                                    <div>Khối lượng (kg)</div>
                                    <p>{value.weight}</p>
                                </div>
                                <div className="order-search-info-top-text col-lg-4 col-sm-3 col-6">
                                    <div>Nơi gửi</div>
                                    <p>
                                        ID điểm giao dịch gửi:{" "}
                                        {value.sending_transaction_point_id}
                                    </p>
                                </div>
                                <div className="order-search-info-top-text col-lg-4 col-sm-3 col-6">
                                    <div>Nơi nhận</div>
                                    <p>
                                        ID điểm giao dịch nhận:{" "}
                                        {value.receiving_transaction_point_id}
                                    </p>
                                </div>
                            </div>
                            <div class="order-search-info-middle row">
                                <div class="col-lg-4-1 col-sm-6 col-12">
                                    <div>
                                        Tỉnh gửi:
                                        {/* <span>{{data.send_city}}</span> */}
                                    </div>
                                </div>
                                <div class="col-lg-8 col-sm-6 col-12">
                                    <div>
                                        Địa chỉ gửi:
                                        {/* <span>{{data.send_district}}</span> */}
                                    </div>
                                </div>
                            </div>
                            <div class="order-search-info-middle row">
                                <div class="col-lg-4-1 col-sm-6 col-12">
                                    <div>
                                        Tỉnh Nhận:
                                        {/* <span>{{data.recipient_city}}</span> */}
                                    </div>
                                </div>
                                <div class="col-lg-8 col-sm-6 col-12">
                                    <div>
                                        Địa chỉ nhận:
                                        {/* <span>{{data.recipient_district}}</span> */}
                                    </div>
                                </div>
                            </div>
                            <div class="order-search-info-bottom row">
                                <div class="col-12">
                                    <div>
                                        Trạng thái:
                                        <span>{value.status}</span>
                                    </div>
                                </div>
                            </div>
                            {/* ... (Các phần thông tin khác) */}
                            <div className="order-search-info-status">
                                <div className="order-search-info-status-title">
                                    <h3>THÔNG TIN TRẠNG THÁI</h3>
                                </div>
                                <div className="order-search-info-status-content">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Người gửi</th>
                                                    <th>Người nhận</th>
                                                    <th>Trạng thái</th>
                                                    <th>Vị trí</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{value.id}</td>
                                                    <td>{value.sender_name}</td>
                                                    <td>
                                                        {value.receiver_name}
                                                    </td>
                                                    <td>trang_thai</td>
                                                    <td>vi_tri</td>
                                                </tr>
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
