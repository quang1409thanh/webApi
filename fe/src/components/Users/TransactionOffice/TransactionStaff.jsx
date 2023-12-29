import "../../../css/transation_staff.css"

import React, {useContext, useEffect, useState} from 'react';
import axiosClient from "../../../axios.js";
import {TransactionOfficeContext} from "./TransactionOfficeProvider.jsx";
import {useStateContext} from "../../../contexts/ContextProvider.jsx";
import AddressSelectionTransactionOfficer from "../../Common/FindPost/AddressSelectionTransactionOfficer.jsx";
import AddressSelectionTransactionOfficerDisable
    from "../../Common/FindPost/AddressSelectionTransactionOfficerDisable.jsx";
import {useNavigate} from "react-router-dom";

const TransactionStaff = () => {
    const navigate = useNavigate();

    const {data} = useContext(TransactionOfficeContext)
    const id = data?.transaction_officer?.transaction_point_id;

    const {showToast} = useStateContext();

    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [sendTransaction, setSendTransaction] = useState({
        address: {
            province: '',
            district: '',
            ward: '',
        },
        name: '',
    });


    const [sendTransactionPoint, setSendTransactionPoint] = useState('');

    useEffect(() => {
        axiosClient
            .get(`/transactionPoint/${id}`)
            .then(({data}) => {
                setSendTransaction(data.transactionPoint);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);


    useEffect(() => {
        if (sendTransaction) {

            setProvince(sendTransaction.address.province);
            setDistrict(sendTransaction.address.district);
            setWard(sendTransaction.address.ward);
            setSendTransactionPoint(sendTransaction.name);
        }
    }, [sendTransaction]);

    const [receiveTransaction, setReceiveTransaction] = useState({
        province: '',
        district: '',
        ward: '',
        transactionPointId: '',
    });


    const [sendName, setSendName] = useState('');
    const [sendPostalCode, setSendPostalCode] = useState('');
    const [sendPhoneNumber, setSendPhoneNumber] = useState('');
    const [sendEmail, setSendEmail] = useState('');

    const [recipientName, setRecipientName] = useState('');
    const [recipientPhoneNumber, setRecipientPhoneNumber] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');

    const [packageType, setPackageType] = useState('--Loại hàng gửi--');
    const [weight, setWeight] = useState('');
    const [chiDanGui, setChiDanGui] = useState('--Chọn chỉ dẫn--');
    const [chuDanNV, setChuDanNV] = useState('');
    const [dichVu, setDichVu] = useState('');
    const [totalRevenue, setTotalRevenue] = useState(0);

    const addRow = () => {
        // Implement the logic to add a new row
        // For example, you can update the parcelData state
        // to include a new r   ow, and then render it in the table.
    };
    const renderOptions = (array) => {
        return array.map(element => (
            <option key={element.id} value={element.id}>{element.name}</option>
        ));
    };


    const updateTotal = () => {
        // Implement the logic to update the total
        // based on the values in the input fields.

        const mainFee = parseFloat(document.getElementById('cuoc_chinh').value) || 0;
        const surcharge = parseFloat(document.getElementById('phu_thu').value) || 0;
        const collectionFee = parseFloat(document.getElementById('thu_ho').value) || 0;

        // Tính toán tổng thu
        const total = mainFee + surcharge + collectionFee;

        // Cập nhật state totalRevenue
        setTotalRevenue(total);
    };

    const handleAddressChange = (selectedCode, selectedText, type) => {
        switch (type) {
            case 'province':
                setReceiveTransaction((prevAddress) => ({
                    ...prevAddress,
                    province: selectedText,
                    district: "",
                    ward: "",
                }));
                break;
            case 'district':
                setReceiveTransaction((prevAddress) => ({
                    ...prevAddress,
                    district: selectedText,
                    ward: "",
                }));
                break;
            case 'ward':
                setReceiveTransaction((prevAddress) => ({
                    ...prevAddress,
                    ward: selectedText,
                }));
                break;
            case 'receive_transaction':
                setReceiveTransaction((prevAddress) => ({
                    ...prevAddress,
                    transactionPointId: selectedCode,
                }));
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosClient
            .post('/good', {
                code: '1',
                sender_name: sendName,
                receiver_name: recipientName,
                sending_transaction_point_id: id,
                receiving_transaction_point_id: receiveTransaction.transactionPointId,
                shipment_id_gd_tk: '0',
                goods_information: null,
                package_type: packageType,
                weight: weight,
                instructions_send: chiDanGui,
                instructions_staff: chuDanNV,
                service: dichVu,
                main_fee: 34,
                surcharge: 0,
                collection_fee: 0,
                status: 'Chấp nhận gửi',
                history: null,
            })
            .then((response) => {
                const dataToPass = response.good;
                const userConfirmed = window.confirm('Đơn hàng đã được tạo. Bạn có muốn xem hóa đơn không?');

                if (userConfirmed) {
                    navigate(`/new-page/data=${encodeURIComponent(dataToPass)}`);
                } else {
                    // If the user clicks "Đóng," you can handle it here (optional)
                }
                showToast("Tạo đơn hàng thành công")
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

    };


    return (
        <div className="page_container">
            <main className="main_content">
                <div id="mainContent">
                    <div className="full_container">
                        <div className="content_title">
                            Tạo đơn hàng
                        </div>
                        <form action="/" method="post" id="parcel_form">
                            <div className="customer_info">
                                <div className="form sent_info">
                                    <div className="tmp">
                                        <label htmlFor="send_name">Tên Người Gửi
                                            <span style={{color: 'red'}}>*</span>
                                            <span>:</span>
                                        </label>
                                        <input type="text" id="send_name" name="senderName" value={sendName}
                                               onChange={(e) => setSendName(e.target.value)} required/>
                                    </div>

                                    <AddressSelectionTransactionOfficerDisable
                                        selectedProvince={province} // Pass the selected province
                                        selectedDistrict={district} // Pass the selected district
                                        selectedWard={ward} // Pass the selected ward
                                        selectTransactionPoint={sendTransactionPoint} // Pass the selected detailed address
                                    />

                                    <div className="form-group">
                                        <div>
                                            <label htmlFor="send_phone_number">Số Điện Thoại:</label>
                                            <input type="tel" id="send_phone_number" name="phoneNumber"
                                                   value={sendPhoneNumber}
                                                   onChange={(e) => setSendPhoneNumber(e.target.value)} required/>
                                        </div>
                                        <div>
                                            <label htmlFor="send_email">Địa chỉ người gửi</label>
                                            <input type="email" id="send_email" name="email" value={sendEmail}
                                                   onChange={(e) => setSendEmail(e.target.value)} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form received_info">
                                    <div className="tmp">
                                        <label htmlFor="recipient_name">Tên Người Nhận
                                            <span style={{color: 'red'}}>*</span>
                                            <span>:</span>
                                        </label>
                                        <input type="text" id="recipient_name" name="senderName" value={recipientName}
                                               onChange={(e) => setRecipientName(e.target.value)} required/>
                                    </div>

                                    <AddressSelectionTransactionOfficer
                                        onSelectProvince={(code, text) => handleAddressChange(code, text, 'province')}
                                        onSelectDistrict={(code, text) => handleAddressChange(code, text, 'district')}
                                        onSelectWard={(code, text) => handleAddressChange(code, text, 'ward')}
                                        onSelectTransactionPoint={(code, text) => handleAddressChange(code, text, 'receive_transaction')}
                                    />

                                    <div className="form-group">
                                        <div>
                                            <label htmlFor="recipient_phone_number">Số Điện Thoại:</label>
                                            <input type="tel" id="recipient_phone_number" name="phoneNumber"
                                                   value={recipientPhoneNumber}
                                                   onChange={(e) => setRecipientPhoneNumber(e.target.value)} required/>
                                        </div>
                                        <div>
                                            <label htmlFor="recipient_email">Địa chỉ người nhận</label>
                                            <input type="email" id="recipient_email" name="email" value={recipientEmail}
                                                   onChange={(e) => setRecipientEmail(e.target.value)} required/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container_info_product">
                                <div className="form-section">
                                    <div className="inline-inputs">
                                        <div>
                                            <label htmlFor="loai_hang">Loại Hàng: </label>
                                            <select id="loai_hang" name="packageType" value={packageType}
                                                    onChange={(e) => setPackageType(e.target.value)}>
                                                <option>--Loại hàng gửi--</option>
                                                <option value="Tài liệu">Tài liệu</option>
                                                <option value="Hàng hóa">Hàng hóa</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="weight">Khối Lượng(kg): </label>
                                            <input type="text" name="weight" id="weight" style={{width: '90%'}}
                                                   placeholder="0 kg" value={weight}
                                                   onChange={(e) => setWeight(e.target.value)}/>
                                        </div>
                                        <div>
                                            <label htmlFor="chi_dan_gui">Chỉ dẫn khi gửi thất bại: </label>
                                            <select id="chi_dan_gui" name="note" value={chiDanGui}
                                                    onChange={(e) => setChiDanGui(e.target.value)}>
                                                <option>--Chọn chỉ dẫn--</option>
                                                <option value="Chuyển hoàn ngay">Chuyển hoàn ngay</option>
                                                <option value="Gọi điện cho người gửi">Gọi điện cho người gửi</option>
                                                <option value="Chuyển hoàn trước ngày">Chuyển hoàn trước ngày</option>
                                                <option value="Chuyển hoàn khi hết thời gian lưu trữ">Chuyển hoàn khi
                                                    hết thời gian lưu trữ
                                                </option>
                                                <option value="Hủy">Hủy</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="chu_dan_nv">Chú Dẫn Nghiệp Vụ</label>
                                        <textarea id="chu_dan_nv" name="businessValue"
                                                  style={{width: '100%', height: '80px'}} value={chuDanNV}
                                                  onChange={(e) => setChuDanNV(e.target.value)}></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="dich_vu">Dịch Vụ Thêm</label>
                                        <textarea type="text" id="dich_vu" name="additionalService"
                                                  style={{width: '100%', height: '80px'}} value={dichVu}
                                                  onChange={(e) => setDichVu(e.target.value)}></textarea>
                                    </div>
                                </div>

                                <div className="table-section">
                                    <div>
                                        <span style={{fontSize: '18px', fontWeight: 400}}>
                                          Nội dung trị giá bưu gửi:
                                        </span>
                                    </div>
                                    <table id="parcelTable">
                                        <thead>
                                        <tr>
                                            <th>Nội Dung</th>
                                            <th>Số Lượng</th>
                                            <th>Trị Giá</th>
                                            <th>Giấy Tờ Đi Kèm</th>
                                        </tr>
                                        </thead>
                                        {/* Render rows here based on parcelData state */}
                                    </table>
                                    <span className="add-row-btn" onClick={addRow}>
                                        +Thêm Hàng
                                      </span>
                                    <div className="total-section">
                                        <div>
                                            <label htmlFor="estimatedFee">Cước chính:</label>
                                            <input
                                                type="number"
                                                id="cuoc_chinh"
                                                name="estimatedFee"
                                                onInput={updateTotal}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="additionalFee">Phụ phí:</label>
                                            <input
                                                type="number"
                                                id="phu_thu"
                                                name="additionalFee"
                                                onInput={updateTotal}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="cashOnDelivery">Thu hộ:</label>
                                            {/*<input type="number" id="thu_ho" name="cashOnDelivery"/>*/}
                                            <input
                                                type="number"
                                                id="thu_ho"
                                                name="cashOnDelivery"
                                                onInput={updateTotal}
                                            />
                                        </div>
                                    </div>

                                    <div className="total-price">
                                        <label htmlFor="total">Tổng thu:</label>
                                        <input
                                            type="text"
                                            id="total"
                                            name="total"
                                            readOnly
                                            value={totalRevenue}
                                            style={{width: '50%'}}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="submit_info">
                                <div className="btn_submit_info">
                                    <input type="button" value="TẠO ĐƠN" onClick={handleSubmit}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
        ;
};

export default TransactionStaff;

///
