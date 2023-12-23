// Create a new file, let's say AddressSelect.js

import React, {useEffect, useState} from 'react';
import axios from 'axios';

const host = "https://provinces.open-api.vn/api/";

const AddressSelect = ({onSelectProvince, onSelectDistrict, onSelectWard, onSelectDetail,
                           selectedProvince, selectedDistrict, selectedWard, selectedDetail
                       }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");

    // Sử dụng các props để đặt giá trị mặc định cho các biến trạng thái
// ... (các biến trạng thái và useEffect giống như trước)

// Sử dụng các props để đặt giá trị mặc định cho các biến trạng thái
    const [currentProvince, setCurrentProvince] = useState(selectedProvince);
    const [currentDistrict, setCurrentDistrict] = useState(selectedDistrict);
    const [currentWard, setCurrentWard] = useState(selectedWard);
    const [currentDetail, setCurrentDetail] = useState(selectedDetail);

// ... (các hàm giống như trước)
    //

    // Cập nhật giá trị mặc định khi props thay đổi
    useEffect(() => {
        setCurrentProvince(selectedProvince);
    }, [selectedProvince]);

    useEffect(() => {
        setCurrentDistrict(selectedDistrict);
    }, [selectedDistrict]);

    useEffect(() => {
        setCurrentWard(selectedWard);
    }, [selectedWard]);

    useEffect(() => {
        setCurrentDetail(selectedDetail);
    }, [selectedDetail]);

    //

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
    };

    const handleProvinceChange = (e) => {
        const selectedProvinceCode = e.target.value;
        setProvince(selectedProvinceCode);
        setDistrict("");
        setWard("");
        onSelectProvince(selectedProvinceCode, e.target.options[e.target.selectedIndex].text);
    };

    const handleDistrictChange = (e) => {
        const selectedDistrictCode = e.target.value;
        setDistrict(selectedDistrictCode);
        setWard("");
        onSelectDistrict(selectedDistrictCode, e.target.options[e.target.selectedIndex].text);
    };

    const handleWardChange = (e) => {
        const selectedWardCode = e.target.value;
        setWard(selectedWardCode);
        onSelectWard(selectedWardCode, e.target.options[e.target.selectedIndex].text);
    };

    function handleDetailChange(e) {
        onSelectDetail(e.target.value);
    }

    return (

        <div className="search-box flex justify-center items-center">
            <div className="col-tmp-1 col-left">
                <label htmlFor="city">Tỉnh/Thành phố</label>
                <select
                    name="provinceId"
                    id="city"
                    className="form-control citySelect"
                    placeholder={"test"}
                    value={province} onChange={handleProvinceChange}>
                    <option disabled selected value="">{selectedProvince || 'chọn tỉnh'}</option>
                    {renderOptions(provinces)}
                </select>
            </div>
            <div className="col-tmp-1 col-left col-right">
                <label htmlFor="district">Quận/Huyện</label>
                <select
                    name="districtId"
                    id="district"
                    className="form-control districtSelect"
                    value={district}
                    onChange={handleDistrictChange}>
                    <option disabled selected value="">{selectedDistrict || 'chọn quận'}</option>
                    {renderOptions(districts)}
                </select>
            </div>
            <div className="col-tmp-1 col-left col-right">
                <label htmlFor="ward">Xã/Phường</label>
                <select
                    name="wardId"
                    id="ward"
                    className="form-control wardSelect"
                    value={ward}
                    onChange={handleWardChange}>
                    <option disabled selected value="">{selectedWard || 'chọn xã/phường'}</option>
                    {renderOptions(wards)}
                </select>
            </div>
            <div className="col-tmp-1 col-left col-right">
                <label htmlFor="district">Chi tiết địa chỉ</label>
                <textarea
                    className="form-control "
                    value={currentDetail}
                    onChange={handleDetailChange}
                    style={{width: '94%'}}
                />
            </div>
        </div>
    );
};
export default AddressSelect;
