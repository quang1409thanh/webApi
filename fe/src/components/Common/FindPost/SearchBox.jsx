import React, {useEffect, useState} from 'react';
import axiosClient from "../../../axios.js";
import axios from "axios";
import AddressSelect from "./AddressForm.jsx";

const host = "https://provinces.open-api.vn/api/";

const SearchBox = ({onSubmit}) => {

    // đoạn mã này để dùng gọi api tỉnh thành từ bên ngoài
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");

    const [provinceName, setSelectedProvinceText] = useState("");
    const [districtName, setSelectedDistrictText] = useState("");
    const [wardName, setSelectedWardText] = useState("");

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
            default:
                break;
        }
    };

    /// đoạn mã này để xử lý dữ liệu từ be của mình gửi về.
    const [offices, setOffices] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the parent's onSubmit function with the form data
        axiosClient.post('/list_office', {
            provinceName: provinceName,
            districtName: districtName,
            wardName: wardName,
        })
            .then((response) => {
                // Handle the response if needed
                setOffices(response.data);
                setSubmitted(true);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Call the parent's onSubmit function with the form data
    //     axiosClient.post('/transactionPoint', {
    //         province: provinceName,
    //         district: districtName,
    //         ward : wardName,
    //         detailed_address : "test",
    //         name : "name",
    //         code : Math.random().toString(36).substring(2, 8),
    //         phone : "=> $request->phone",
    //         email : "=> $request->email",
    //         operatingHours: "8:00 AM - 5:00 PM",
    //         aggregation_point_id: 2,
    //         status: "Hoạt động",
    //         notes: " Ghi chú về công ty cd",
    //         capacity: 11,
    //         current_load: 124,
    //
    // })
    //         .then((response) => {
    //             // Handle the response if needed
    //             response.data;
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    // };


    // đoạn mà này để hiện thị tên lấy từ api bên ngoài vào.
    useEffect(() => {
        axios.get(host + '?depth=1')
            .then(response => {
                setProvinces(response.data);
            });
    }, []);

    useEffect(() => {
        if (province) {
            axios.get(host + "p/" + province + "?depth=2")
                .then(response => {
                    setDistricts(response.data.districts);
                });
        }
    }, [province]);

    useEffect(() => {
        if (district) {
            axios.get(host + "d/" + district + "?depth=2")
                .then(response => {
                    setWards(response.data.wards);
                });
        }
    }, [district]);

    const renderOptions = (array) => {
        return array.map(element => (
            <option key={element.code} value={element.code}>{element.name}</option>
        ));
    }

    const handleProvinceChange = (e) => {
        const selectedProvinceCode = e.target.value;
        setProvince(selectedProvinceCode);
        setSelectedProvinceText(e.target.options[e.target.selectedIndex].text); // Lấy giá trị text của option được chọn
    };

    const handleDistrictChange = (e) => {
        const selectedDistrictCode = e.target.value;
        setDistrict(selectedDistrictCode);
        setSelectedDistrictText(e.target.options[e.target.selectedIndex].text); // Lấy giá trị text của option được chọn
    };

    const handleWardChange = (e) => {
        const selectedWardCode = e.target.value;
        setWard(selectedWardCode);
        setSelectedWardText(e.target.options[e.target.selectedIndex].text); // Lấy giá trị text của option được chọn
    };


    // end address
    return (
        <section className="block-search-post-office">
            <div className="container">
                <div className="row">
                    <div className="box-title text-uppercase">Tìm kiếm bưu cục</div>

                    {/* Use onSubmit directly on the form element */}
                    <form
                        style={{width: '100%'}}
                        id="list_office"
                        onSubmit={handleSubmit}
                        method="POST" // Use the GET method
                    >
                        <div className="col-search-box">
                            <AddressSelect
                                onSelectProvince={(code, text) => handleAddressChange(code, text, 'province')}
                                onSelectDistrict={(code, text) => handleAddressChange(code, text, 'district')}
                                onSelectWard={(code, text) => handleAddressChange(code, text, 'ward')}
                            />
                            <div className="col-tmp-2 col-right col-left">
                                <input type="submit" value="Tìm kiếm" className="btn btn-search-branch"/>
                            </div>

                        </div>
                    </form>
                </div>
                <div className="row-list-infomation">
                    <div className="list-col col-right">
                        <div className="list-post">
                            <div className="content-list-post">
                                <h2>Danh sách bưu cục</h2>
                                <div className="list-office">
                                    {submitted ? (
                                        offices.length > 0 ? (
                                            offices.map(item => (
                                                <div className="post-item" key={item._id}>
                                                    <button className="delete-btn" data-id={item._id}>EDIT</button>
                                                    <p>
                                        <span className="title-post">
                                            <img src="./img/icon-code.png" className="img_icon-code" alt="icon-code"/>
                                            Mã số:
                                        </span><b className="post-code">{item.code}</b></p><p>
                                        <span className="title-post">
                                            <img src="./img/icon-buu-cuc.svg" className="img_icon-code"
                                                 alt="icon-buu-cuc"/>
                                            Bưu cục:
                                        </span><b>{item.name}</b></p><p>
                                        <span className="title-post">
                                            <img src="./img/icon-location.svg" className="img_icon-code"
                                                 alt="icon-location"/>
                                            Địa chỉ:
                                        </span><b>{item.address.province}, {item.address.district}, {item.address.ward} (ĐT: {item.phone})</b>
                                                </p></div>
                                            ))
                                        ) : (
                                            <p>Không có kết quả nào phù hợp</p>
                                        )) : (
                                        <p>Kết quả tìm kiếm sẽ hiện thị ở đây</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="map" className="map-col" api="AIzaSyBTl18VGbowzRXU8CZmDF3_tWCQxbNupbA">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15743717.478300229!2d95.23516860259727!3d15.555221179110516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31157a4d736a1e5f%3A0xb03bb0c9e2fe62be!2zVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1699382055486!5m2!1svi!2s"
                            style={{width: '710px', height: '510px', border: '0'}}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SearchBox;
