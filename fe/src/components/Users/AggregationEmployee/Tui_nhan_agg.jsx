import React from 'react';

const IncomingBagList = () => {
  return (
    <div className="page_container">
      <main className="main_content">
        <div id="mainContent">
          <div className="full_container">
            <div className="content_title">
              DANH SÁCH TÚI HÀNG ĐẾN
            </div>
            <div className="container_product_list">
              <div className="form_input_time">
                <div className="since_input">
                  <div className="date-picker-container">
                    <label htmlFor="since_input">Từ ngày:</label>
                    <div className="picker_container">
                      <input type="text" name="since_input" className="date-picker-input" id="datepicker1" readOnly />
                      <div className="calendar-icon" onClick={() => showCalendar1()}>&#128197;</div>
                    </div>
                  </div>
                </div>
                <div className="to_input">
                  <div className="date-picker-container">
                    <label htmlFor="to_input">Đến ngày:</label>
                    <div className="picker_container">
                      <input type="text" name="to_input" className="date-picker-input" id="datepicker2" readOnly />
                      <div className="calendar-icon" onClick={() => showCalendar2()}>&#128197;</div>
                    </div>
                  </div>
                </div>
                <div className="btn_find_for_date">
                  <div className="btn_tim" id="btn_tim">
                    <img src="/img/order-search.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="nav_bar_service">
                {/* Uncomment the lines below if needed */}
                {/* <input type="button" value="Xóa" name="delete" />
                <input type="button" value="Cap nhat trang thai" />
                <input type="button" value="ALL" /> */}
              </div>
              <div className="product_list" id="product_list">
                <table id="product_list_table">
                  <thead>
                    <tr>
                      {/* Uncomment the line below if needed */}
                      {/* <th><input type="checkbox" name="all" id="check_all" /></th> */}
                      <th>Ma so tui</th>
                      <th>Buu cuc gui</th>
                      {/* Uncomment the line below if needed */}
                      {/* <th>Nhan vien tao don</th> */}
                      <th>Ngay gui</th>
                      <th>Xac nhan den</th>
                      <th>Xac nhan chi tiet</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* Uncomment the line below if needed */}
                      {/* <td><input type="checkbox" name="" id="" className="check_list" /></td> */}
                      <td><span>65412f17bf22195287703a0b</span>
                      </td>
                      <td>
                        <span>65412f17bf22195287703a0b</span>
                        <span>Dong Hung</span>
                      </td>
                      {/* Uncomment the line below if needed */}
                      {/* <td>
                        <span>65412f17bf22195287703a0b</span>
                        <span>Vu Trong Hieu</span>
                      </td> */}
                      <td>
                        <span>11/11/2023</span>
                        <span>15:23:00</span>
                      </td>
                      <td>
                        <div className="hidden btn_xac_nhan_tui">
                          <input type="button" value="Xac nhan" />
                        </div>
                        <span>Đã xác nhận</span>
                      </td>
                      <td>
                        <div className="hidden btn_xac_nhan_chi_tiet_tui">
                          <input type="button" value="Xac nhan" />
                        </div>
                        <span>Đã xác nhận</span>
                      </td>
                    </tr>
                    {/* Repeat the structure for additional rows */}
                  </tbody>
                </table>
              </div>
              <div id="error_note" style={{ display: '' }}>
                <i style={{ color: 'red' }}>*Không tìm thấy túi hàng</i>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IncomingBagList;