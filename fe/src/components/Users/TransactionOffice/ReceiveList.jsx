import React from 'react';

const sampleOrderList = [
  {
    _id: '1',
    check_: true,
    ma_buu_cuc_giao_dich: 'BC001',
    ten_buu_cuc: 'Bưu cục A',
    ten_nguoi_gui: 'Người Gửi A',
    ngay_tao_don: '2023-12-23',
    gio_tao: '10:30 AM',
    trang_thai_hien_tai: 'Đang chờ chuyển đi',
    chuyen_don: 'Chuyến 1',
  },
  {
    _id: '2',
    check_: false,
    ma_buu_cuc_giao_dich: 'BC002',
    ten_buu_cuc: 'Bưu cục B',
    ten_nguoi_gui: 'Người Gửi B',
    ngay_tao_don: '2023-12-24',
    gio_tao: '11:45 AM',
    trang_thai_hien_tai: 'Thất lạc',
    chuyen_don: 'Chuyến 2',
  },
  // Add more order items as needed
];


const Order_list_receive = ({ checkProduct, data }) => {
  return (
    <div className="page_container">
      <main className="main_content">
        <div id="mainContent">
          <div className="full_container">
            <div className="content_title">
              DANH SÁCH ĐƠN NHẬN VỀ
            </div>
            <div className="container_product_list">
              {checkProduct ? (
                <div className="nav_bar_service">
                  {/* Uncomment the line below if needed */}
                  {/* <input type="button" value="Xóa" name="delete" /> */}
                  {/* <input type="button" value="Tạo túi hàng" id="btn_tao_tui" className="check_btn" disabled /> */}
                  {/* Uncomment the line below if needed */}
                  {/* <input type="button" value="ALL" /> */}
                </div>
              ) : (
                <div id="error_note" style={{ display: '' }}>
                  <i style={{ color: 'red' }}>*Không tìm thấy đơn hàng</i>
                </div>
              )}
              {checkProduct && (
                <div className="product_list" id="product_list">
                  <table id="product_list_table">
                    <thead>
                      <tr>
                        <th><input type="checkbox" name="all" id="check_all" /></th>
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
                            {item.check_ && (
                              <input type="checkbox" name="check_list" id={item._id} className="check_list" />
                            )}
                          </td>
                          <td>
                            <span>{item.ma_buu_cuc_giao_dich}</span>
                            <span>{item.ten_buu_cuc}</span>
                          </td>
                          <td>{item._id}</td>
                          <td>{item.ten_nguoi_gui}</td>
                          <td>
                            <span>{item.ngay_tao_don}</span>
                            <span>{item.gio_tao}</span>
                          </td>
                          <td>{item.trang_thai_hien_tai}</td>
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

export default Order_list_receive;
