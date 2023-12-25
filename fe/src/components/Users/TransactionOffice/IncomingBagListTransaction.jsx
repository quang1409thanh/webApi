import React from 'react';

const IncomingBagListTransaction = () => {
  return (
    <div className="page_container">
      <main className="main_content">
        <div id="mainContent">
          <div className="full_container">
            <div className="content_title">
              DANH SÁCH GIAO THẤT BẠI
            </div>
            <div className="container_product_list">
              <div className="form_input_time">
                <div className="since_input">
                  <div className="date-picker-container">
                    <label htmlFor="since_input">Từ ngày:</label>
                    <div className="picker_container">
                      <input type="text" name="since_input" className="date-picker-input" id="datepicker1" />
                      <div className="calendar-icon" onClick={() => showCalendar1()}>&#128197;</div>
                    </div>
                  </div>
                </div>
                <div className="to_input">
                  <div className="date-picker-container">
                    <label htmlFor="to_input">Đến ngày:</label>
                    <div className="picker_container">
                      <input type="text" name="to_input" className="date-picker-input" id="datepicker2" />
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
                {/* <input type="button" value="Xóa" name="delete" /> */}
                {/* <input type="button" value="Cap nhat trang thai" /> */}
                {/* <input type="button" value="ALL" /> */}
              </div>
              <div className="product_list" id="product_list">
                {/* Add content for the list here */}
              </div>
              <div id="error_note" style={{ display: '' }}>
                <i style={{ color: 'red' }}>*Không tìm thấy đơn hàng</i>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IncomingBagListTransaction;
