import React, { useState } from 'react';

const TrackingComponent = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [foundParcel, setFoundParcel] = useState(false);
  const [data, setData] = useState({
    weight: '',
    send_city: '',
    send_district: '',
    recipient_city: '',
    recipient_district: '',
  });
  const [noiGui, setNoiGui] = useState('');
  const [noiNhan, setNoiNhan] = useState('');
  const [trangThai, setTrangThai] = useState('');
  const [listTrangThai, setListTrangThai] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setTrackingCode(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      // Replace the URL with your actual server API endpoint
      const response = await fetch(`/find_postal_items?code_tracking=${trackingCode}`);
      const result = await response.json();

      if (result.found_parcel) {
        setFoundParcel(true);
        setData(result.data);
        setNoiGui(result.data.send_city);
        setNoiNhan(result.data.recipient_city);
        setTrangThai(result.trang_thai);
        setListTrangThai(result.list_trang_thai);
      } else {
        setFoundParcel(false);
        setError('*Không tìm thấy đơn hàng');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('*Đã xảy ra lỗi khi tìm kiếm đơn hàng');
    }
  };

  return (
    <div className="container-costs">
      <section className="find-items-content">
        <div className="search-code-items">
          <div className="search-items-text">
            <img src="./img/order-search.png" alt="" />
            <div>Ma buu gui (VD: 655ba7422bef17c718d6489f)</div>
          </div>
          <div className="search-items-input">
            <form id="form_code_tracking" onSubmit={handleSearch}>
              <div className="row">
                <div className="col-sm-9">
                  <input
                    type="text"
                    name="code_tracking"
                    id="input_code_tracking"
                    placeholder="Nhập mã bưu gửi"
                    value={trackingCode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-sm-3">
                  <button type="submit" className="btn-find_item">
                    Tra cứu
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {true ? (
          <div className="order-search-info">
            {/* Render the information based on state variables */}
            <div className="order-search-info-title">
              <h3>THÔNG TIN BƯU GỬI</h3>
            </div>
            <div className="order-search-info-top row">
              {/* ... (Render other information components) */}
            </div>
            <div className="order-search-info-middle row">
              {/* ... (Render other information components) */}
            </div>
            <div className="order-search-info-bottom row">
              {/* ... (Render other information components) */}
            </div>

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
                      {listTrangThai.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.ngay}</td>
                          <td>{item.gio}</td>
                          <td>{item.trang_thai}</td>
                          <td>{item.vi_tri}</td>
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
            <i style={{ color: 'red' }}>{error}</i>
          </div>
        )}
      </section>
    </div>
  );
};

export default TrackingComponent;
