import React from 'react';

const OrderSearchTransaction = ({ trackingCode, data, noiGui, noiNhan, trangThai, listTrangThai, foundParcel }) => {
    return (
        <div className="page_container">
            <main className="main_content">
                <div id="mainContent">
                    <div className="full_container">
                        <div className="content_title">
                            TRA CỨU ĐƠN HÀNG
                        </div>
                        <div className="tra_cuu_don_hang_staff">
                            <section className="find-items-content">
                                <div className="search-code-items" style={{ backgroundColor: 'aliceblue' }}>
                                    <div className="search-items-text">
                                        <img src="/img/order-search.png" alt="" />
                                        <div>Mã bưu gửi (VD: JZb1GcicLvDw0rmWIH5TdqwRVuNFhF)</div>
                                    </div>
                                    <div className="search-items-input">
                                        <form id="form_code_tracking" method="get" action="/find_postal_items/">
                                            <div className="row">
                                                <div className="col-sm-9">
                                                    <input type="text" name="code" id="input_code_tracking" placeholder="Nhập mã bưu gửi" value={trackingCode} />
                                                </div>
                                                <div className="col-sm-3">
                                                    <button className="btn-find_item">Tra cứu</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {foundParcel ? (
                                    <div className="order-search-info">
                                        <div className="order-search-info-title">
                                            <h3>THÔNG TIN BƯU GỬI</h3>
                                        </div>
                                        <div id="iframeContainer">
                                            <iframe id="myIframe" code={trackingCode} src="" frameBorder="0" height="1100px" width="1300px"></iframe>
                                        </div>
                                        <div className="order-search-info-top row">
                                            <div className="order-search-info-top-text col-lg-2 col-sm-3 col-6">
                                                <div>Code Tracking</div>
                                                <p>{trackingCode}</p>
                                            </div>
                                            <div className="order-search-info-top-text col-lg-2 col-sm-3 col-6">
                                                <div>Khối lượng (kg)</div>
                                                <p>{data.weight}</p>
                                            </div>
                                            <div className="order-search-info-top-text col-lg-4 col-sm-3 col-6">
                                                <div>Nơi gửi</div>
                                                <p>{noiGui}</p>
                                            </div>
                                            <div className="order-search-info-top-text col-lg-4 col-sm-3 col-6">
                                                <div>Nơi nhận</div>
                                                <p>{noiNhan}</p>
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
                                                            <th>Ngày</th>
                                                            <th>Giờ</th>
                                                            <th>Trạng thái</th>
                                                            <th>Vị trí</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {listTrangThai.map((trangThai, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{trangThai.ngay}</td>
                                                                <td>{trangThai.gio}</td>
                                                                <td>{trangThai.trang_thai}</td>
                                                                <td>{trangThai.vi_tri}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div id="error_note" style={{ display: '' }}>
                                        <i style={{ color: 'red' }}>*Không tìm thấy đơn hàng</i>
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OrderSearchTransaction;
