import React from "react";
import "./Invoice.css";

function Invoice() {

    return (
        <div>
            <div className="hoadon_container">
                <div className="logo_qr_container">
                    <div className="logo_hoadon">
                        <img src="/img/logo.png" alt="" />
                    </div>
                    <div className="qr_hoadon">
                        <img src="/img/qr.jpg" alt="" />
                        <div className="code_hoadon">
                            <h3>ID</h3>
                        </div>
                    </div>
                </div>
                <div className="hoadon_content">
                    {/* Left side */}
                    <div className="hoadon_left">
                        {/* 1. Info customer */}
                        <div className="info_customer">
                            <div className="name_customer">
                                <h3>1. Họ tên địa chỉ người gửi</h3>
                                <span>Lê Hải Nam</span>
                                <br />
                                <span>Điểm Giao Dịch Cầu Giấy</span>
                            </div>
                            <div className="other_info">
                                <div className="phone_cus type_flex">
                                    <h3>Điện thoại:</h3>
                                    <span>0944427167</span>
                                </div>
                                <div className="postal_code type_flex">
                                    <h3>Mã bưu chính:</h3>
                                    <span>1</span>
                                </div>
                            </div>
                        </div>

                        {/* 3.4. Info parcel */}
                        <div className="info_parcel">
                            <div className="info_sectors">
                                <h3>3. Loại hàng gửi:</h3>
                                <div
                                    className="sectors_checkbox"
                                    id="loai_hang"
                                >
                                    <div className="box_tailieu label">
                                        <input
                                            style={{ width: 20 }}
                                            type="checkbox"
                                            name="tai_lieu"
                                            id="tai_lieu"
                                            checked
                                            disabled
                                        />
                                        <label
                                            style={{ width: 400 }}
                                            htmlFor="tai_lieu"
                                        >
                                            Tài Liệu
                                        </label>
                                    </div>
                                    <div className="box_hanghoa label">
                                        <input
                                            style={{ width: 20 }}
                                            type="checkbox"
                                            name="hang_hoa"
                                            id="hang_hoa"
                                            disabled
                                        />
                                        <label
                                            style={{ width: 400 }}
                                            htmlFor="hang_hoa"
                                        >
                                            Hàng Hóa
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="info_table">
                                <h3>4. Nội dung trị giá bưu gửi:</h3>
                                <div className="table_content"></div>
                                <table className="table4">
                                    <thead>
                                        <tr>
                                            <th>Nội dung</th>
                                            <th>Số lượng</th>
                                            <th>Trị giá</th>
                                            <th>Giấy tờ đi kèm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Tổng</td>
                                            <td>0</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 5. Other service */}
                        <div className="other_service">
                            <div className="">
                                <h3>5. Dịch vụ đặc biệt/Cộng thêm:</h3>
                                <p
                                    style={{
                                        height: "50px",
                                        wordWrap: "break-word",
                                    }}
                                    className="other_service_content"
                                >
                                    khong
                                </p>
                            </div>
                        </div>

                        {/* 6. Sender instructions */}
                        <div className="sender_instructions" id="chi_dan_gui">
                            <div>
                                <h3>
                                    6. Chỉ dẫn của người gửi khi không phát được
                                    bưu gửi:
                                </h3>
                                <div className="box_tailieu label">
                                    <input
                                        style={{ width: 20 }}
                                        type="checkbox"
                                        name="tai_lieu"
                                        id="tai_lieu"
                                        checked
                                        disabled
                                    />
                                    <label
                                        style={{ width: 400 }}
                                        htmlFor="tai_lieu"
                                    >
                                        Chuyển hoàn ngay
                                    </label>
                                </div>
                                <div className="box_hanghoa label">
                                    <input
                                        style={{ width: 20 }}
                                        type="checkbox"
                                        name="hang_hoa"
                                        id="hang_hoa"
                                        disabled
                                    />
                                    <label
                                        style={{ width: 400 }}
                                        htmlFor="hang_hoa"
                                    >
                                        Gọi điện cho người gửi
                                    </label>
                                </div>
                                <div className="box_tailieu label">
                                    <input
                                        style={{ width: 20 }}
                                        type="checkbox"
                                        name="tai_lieu"
                                        id="tai_lieu"
                                        disabled
                                    />
                                    <label
                                        style={{ width: 400 }}
                                        htmlFor="tai_lieu"
                                    >
                                        Chuyển hoàn trước ngày
                                    </label>
                                </div>
                                <div className="box_hanghoa label">
                                    <input
                                        style={{ width: 20 }}
                                        type="checkbox"
                                        name="hang_hoa"
                                        id="hang_hoa"
                                        disabled
                                    />
                                    <label
                                        style={{ width: 400 }}
                                        htmlFor="hang_hoa"
                                    >
                                        Chuyển hoàn khi hết thời gian lưu trữ
                                    </label>
                                </div>
                                <div className="box_tailieu label">
                                    <input
                                        style={{ width: 20 }}
                                        type="checkbox"
                                        name="tai_lieu"
                                        id="tai_lieu"
                                        disabled
                                    />
                                    <label
                                        style={{ width: 400 }}
                                        htmlFor="tai_lieu"
                                    >
                                        Hủy
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* 7. Commitment */}
                        <div className="commitment">
                            <div className="user_commit">
                                <h3>7. Cam kết của người gửi:</h3>
                                <span>
                                    Chấp nhận các điều khoản của công ty
                                </span>
                            </div>

                            {/* 7. Time signature */}
                            <div className="time_signature">
                                <div className="time">
                                    <h3>
                                        8. Ngày giờ gửi:
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        Chữ ký người gửi
                                    </h3>
                                    <span>4:13 PM 12/29/2023</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="hoadon_right">
                        {/* 1. Info customer */}
                        <div className="info_customer">
                            <div className="name_customer">
                                <h3>2. Họ tên địa chỉ người nhận</h3>
                                <span>Lê Anh Đức</span>
                                <br />
                                <span>Điểm Giao Dịch Bình Thạnh</span>
                            </div>
                            {/* Other info */}
                            <div className="other_info">
                                <div className="phone_cus type_flex">
                                    <h3>Điện thoại:</h3>
                                    <span>0332258398</span>
                                </div>
                                <div className="postal_code type_flex">
                                    <h3>Mã bưu chính:</h3>
                                    <span>2</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Info costs weight */}
                        <div className="info_costs_weight">
                            {/* 2.1 Costs */}
                            <div className="costs">
                                {/* 2.1.1 Cost */}
                                <div className="cost">
                                    <h3 className="cost_header">9. Cước:</h3>
                                    <div className="cost_item">
                                        <span>Cước chính:</span>
                                        <span>0</span>
                                    </div>
                                    <div className="cost_item">
                                        <span>Phụ phí:</span>
                                        <span>0</span>
                                    </div>
                                    <div className="cost_item">
                                        <span>Thu hộ:</span>
                                        <span>0</span>
                                    </div>
                                    <div className="cost_item">
                                        <span>Tổng thu:</span>
                                        <span>0</span>
                                    </div>
                                    {/* Cost items go here */}
                                </div>

                                {/* 2.1.2 COD */}
                                <div className="COD">
                                    <h3 className="cost_header">
                                        11. Thu của người nhận:
                                    </h3>
                                    <div className="cost_item">
                                        <span>COD:</span>
                                        <span>0</span>
                                    </div>
                                    <div className="cost_item">
                                        <span>Thu khác:</span>
                                        <span>0</span>
                                    </div>
                                    <div className="cost_item">
                                        <span>Tổng thu:</span>
                                        <span>0</span>
                                    </div>
                                </div>
                            </div>

                            {/* 2.2 Weight */}
                            <div className="weight_">
                                {/* 2.2.1 Weight */}
                                <div
                                    className="weight"
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    <h3
                                        style={{
                                            marginLeft: "10px",
                                            textAlign: "left",
                                        }}
                                    >
                                        10. Khối lượng(kg):
                                    </h3>
                                    <span
                                        style={{
                                            marginLeft: "10px",
                                        }}
                                    >
                                        1
                                    </span>
                                </div>

                                {/* 2.2.2 Note weight */}
                                <div
                                    style={{
                                        textAlign: "center",
                                    }}
                                    className="note_weight cost_header"
                                >
                                    <h3 style={{ textAlign: "left" }}>
                                        12. Chú dẫn nghiệp vụ:
                                    </h3>
                                    <span>khong</span>
                                </div>
                            </div>
                        </div>

                        {/* 3. Stamped */}
                        <div className="stamped">
                            {/* 3.1 Postal stamped */}
                            <div className="postal_stamped">
                                <h3 style={{ marginLeft: "30px" }}>
                                    13. Bưu cục chấp nhận
                                </h3>
                                <span style={{ marginLeft: "75px" }}>
                                    Chữ ký GDV nhận
                                </span>
                            </div>

                            {/* 3.2 Time stamped */}
                            <div className="time_stamped">
                                <h3 style={{ marginLeft: "10px" }}>
                                    14. Ngày giờ nhận:
                                </h3>
                                <span style={{ marginLeft: "100px" }}>...</span>
                                <br />
                                <span style={{ marginLeft: "65px" }}>
                                    Người nhận
                                </span>
                                <br />
                                <span style={{ marginLeft: "42px" }}>
                                    (Ký, ghi rõ họ tên)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="centered-container">
                <div className="submit_hoadon">
                    <div className="btn_submit_hoadon">
                        <input
                            type="button"
                            value="Xác nhận"
                            className="confirm-btn"
                        />
                    </div>
                    <div className="btn_submit_hoadon">
                        <button className="print-btn">In</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Invoice;
