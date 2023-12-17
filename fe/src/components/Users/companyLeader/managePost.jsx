import React, {useEffect, useState} from 'react';
import axiosClient from "../../../axios.js";
import axios from "axios";
import AddressSelect from "../../Common/FindPost/AddressForm.jsx";

const host = "https://provinces.open-api.vn/api/";

const ManagePost = () => {

    // đoạn mã này để dùng gọi api tỉnh thành từ bên ngoài
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");
    const [aggregationId, setAggregationId] = useState("");
    // more
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [operatingHours, setOperatingHours] = useState('');
    const [status, setStatus] = useState('');
    const [notes, setNotes] = useState('');
    const [capacity, setCapacity] = useState(0); // Mặc định là 0, bạn có thể thay đổi giá trị mặc định theo ý muốn
    const [current_load, setCurrentLoad] = useState(0);

    // Thêm các state cho các trường còn lại tương tự

    const [provinceName, setSelectedProvinceText] = useState("");
    const [districtName, setSelectedDistrictText] = useState("");
    const [wardName, setSelectedWardText] = useState("");
    const [detailed_address, setDetail] = useState("");
    const [aggregationName, setAggregationName] = useState("");

    const [aggregation_list, setAggregationList] = useState([]);
    const handleAddressChange = (selectedCode, selectedText, type) => {
        switch (type) {
            case 'province':
                setProvince(selectedCode);
                setSelectedProvinceText(selectedText);
                break;
            case 'district':
                setDistrict(selectedCode);
                setSelectedDistrictText(selectedText);
                break;
            case 'ward':
                setWard(selectedCode);
                setSelectedWardText(selectedText);
                break;
            case 'detailed_address':
                setDetail(selectedText);
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        axiosClient.get('/aggregationPoint')
            .then(({data}) => {
                setAggregationList(data.aggregationPoints)
            })
    }, [])


    /// đoạn mã này để xử lý dữ liệu từ be của mình gửi về.
    const [offices, setOffices] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the parent's onSubmit function with the form data
        axiosClient.post('/transactionPoint', {
            province: provinceName,
            district: districtName,
            ward: wardName,
            detailed_address: detailed_address,
            aggregation_point_id: aggregationId,
            name: name,
            code: code,
            phone: phone,
            email: email,
            operatingHours: operatingHours,
            status: status,
            notes: notes,
            capacity: capacity,
            current_load: current_load,
        })
            .then((response) => {
                setSubmitted(true);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const renderOptions = (array) => {
        return array.map(element => (
            <option key={element.id} value={element.id}>{element.name}</option>
        ));
    };

    const handleAggregation = (e) => {
        const selectedAggregation = e.target.value;
        setAggregationName(selectedAggregation);
        setAggregationId(selectedAggregation);
    };

    return (
        <section className="block-search-post-office">
            <div className="container">
                <div className="row">
                    <div className="box-title text-uppercase">Thêm Bưu Cục</div>
                    {/* Use onSubmit directly on the form element */}
                    <form
                        style={{width: '100%'}}
                        onSubmit={handleSubmit}
                        method="POST" // Use the GET method
                    >
                        <div className="col-search-box">
                            <h1>Các thông tin quan trọng khác .</h1>
                            <div className="search-box">
                                <div className="col-tmp-1 col-left">
                                    <label htmlFor="city">Thuộc điểm tập kết ?</label>
                                    <select
                                        id="city"
                                        className="form-control"
                                        value={aggregationId}
                                        onChange={handleAggregation}
                                        style={{width: '100%'}} // Thiết lập độ rộng tương đương
                                    >
                                        <option disabled value="">chọn điểm tập kết ?</option>
                                        {renderOptions(aggregation_list)}
                                    </select>
                                </div>
                                <div className="col-tmp-1 col-right">
                                    <label htmlFor="name">Tên công ty:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={{width: '94%'}}
                                    />
                                </div>

                                <div className="col-tmp-1 col-left">
                                    <label htmlFor="code">Mã công ty:</label>
                                    <input
                                        type="text"
                                        id="code"
                                        className="form-control"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        style={{width: '94%'}} // Thiết lập độ rộng tương đương
                                    />
                                </div>

                                <div className="col-tmp-1 col-right">
                                    <label htmlFor="phone">Số điện thoại:</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        className="form-control"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        style={{width: '94%'}}
                                    />
                                </div>

                                <div className="col-tmp-1 col-left ">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="text"
                                        id="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{width: '94%'}}
                                    />
                                </div>
                                <div className="col-tmp-1">
                                    <label htmlFor="operatingHours">Giờ làm việc:</label>
                                    <input
                                        type="text"
                                        id="operatingHours"
                                        className="form-control"
                                        value={operatingHours}
                                        onChange={(e) => setOperatingHours(e.target.value)}
                                        style={{width: '94%'}}
                                    />
                                </div>

                                <div className="col-tmp-1">
                                    <label htmlFor="status">Trạng thái:</label>
                                    <input
                                        type="text"
                                        id="status"
                                        className="form-control"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        style={{width: '94%'}}
                                    />
                                </div>

                                <div className="col-tmp-1">
                                    <label htmlFor="notes">Ghi chú:</label>
                                    <input
                                        type="text"
                                        id="notes"
                                        className="form-control"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        style={{width: '94%'}}
                                    />
                                </div>

                                <div className="col-tmp-1">
                                    <label htmlFor="capacity">Dung lượng:</label>
                                    <input
                                        type="number"
                                        id="capacity"
                                        className="form-control"
                                        value={capacity}
                                        onChange={(e) => setCapacity(e.target.value)}
                                        style={{width: '94%'}}
                                    />
                                </div>

                                <div className="col-tmp-1">
                                    <label htmlFor="current_load">Tải hiện tại:</label>
                                    <input
                                        type="number"
                                        id="current_load"
                                        className="form-control"
                                        value={current_load}
                                        onChange={(e) => setCurrentLoad(e.target.value)}
                                        style={{width: '94%'}}
                                    />
                                </div>


                            </div>
                            <h1>Thêm địa chỉ.</h1>
                            <AddressSelect
                                onSelectProvince={(code, text) => handleAddressChange(code, text, 'province')}
                                onSelectDistrict={(code, text) => handleAddressChange(code, text, 'district')}
                                onSelectWard={(code, text) => handleAddressChange(code, text, 'ward')}
                                onSelectDetail={(value) => handleAddressChange(null, value, 'detailed_address')}
                            />

                            <div className="col-tmp-2 col-right col-left">
                                <input type="submit" value="Thêm" className="btn btn-search-branch"/>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ManagePost;
