import React, {useEffect, useState} from 'react';
import axios from 'axios';
import axiosClient from '../../../axios.js';

const host = 'https://provinces.open-api.vn/api/';

const AddressSelectionTransactionOfficerDefault = ({
                                                       onSelectProvince,
                                                       onSelectDistrict,
                                                       onSelectWard,
                                                       onSelectTransactionPoint,
                                                       selectedProvince,
                                                       selectedDistrict,
                                                       selectedWard,
                                                       selectTransactionPoint
                                                   }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [transactionList, setTransactionList] = useState([]);

    const [province, setProvince] = useState(selectedProvince);
    const [district, setDistrict] = useState(selectedDistrict);
    const [ward, setWard] = useState(selectedWard);
    const [provinceText, setProvinceText] = useState('');
    const [districtText, setDistrictText] = useState('');
    const [wardText, setWardText] = useState('');
    const [transactionPoint, setTransactionPoint] = useState('');

    useEffect(() => {
        // Lấy danh sách tỉnh/thành phố
        axios.get(host + '?depth=1').then((response) => {
            setProvinces(response.data);
        });
    }, []);

    useEffect(() => {
        // Khi component được mount, gọi API chỉ khi có sự thay đổi trong selectedProvince
        if (selectedProvince) {
            axiosClient
                .post('/list_office', {
                    province: selectedProvince,
                    district: '',
                    ward: '',
                })
                .then((response) => {
                    const data = response.data || [];
                    setTransactionList(data);
                })
                .catch((error) => {
                    console.error('Error fetching transaction points:', error);
                });
        }
    }, [selectedProvince]);

    useEffect(() => {
        // Khi selectedProvince thay đổi, gọi API để lấy danh sách quận/huyện
        if (province) {
            axios.get(`${host}p/${province}?depth=2`).then((response) => {
                setDistricts(response.data.districts);
            });
        }
    }, [province]);

    useEffect(() => {
        // Khi selectedDistrict thay đổi, gọi API để lấy danh sách xã/phường
        if (district) {
            axios.get(`${host}d/${district}?depth=2`).then((response) => {
                setWards(response.data.wards);
            });
        }
    }, [district]);
    const handleProvinceChange = (e) => {
        const selectedProvinceCode = e.target.value;
        setProvince(selectedProvinceCode);
        setDistrict('');
        setWard('');
        setDistrictText('');
        setWardText('');
        setProvinceText(selectedProvince);

        onSelectProvince(selectedProvinceCode, e.target.options[e.target.selectedIndex].text);
    };

    const handleDistrictChange = (e) => {
        const selectedDistrictCode = e.target.value;
        setDistrictText(e.target.options[e.target.selectedIndex].text);
        setDistrict(selectedDistrictCode);
        setWard('');
        setWardText('');
        onSelectDistrict(selectedDistrictCode, e.target.options[e.target.selectedIndex].text);
    };

    const handleWardChange = (e) => {
        const selectedWardCode = e.target.value;
        setWard(selectedWardCode);
        setWardText(e.target.options[e.target.selectedIndex].text);
        onSelectWard(selectedWardCode, e.target.options[e.target.selectedIndex].text);
    };

    const handleTransactionPointChange = (e) => {
        const selectedTransactionPointCode = e.target.value;
        setTransactionPoint(selectedTransactionPointCode);
        onSelectTransactionPoint(selectedTransactionPointCode, e.target.options[e.target.selectedIndex].text);
    };

    const renderOptions = (array) => {
        return array.map((element) => (
            <option key={element.code} value={element.code}>
                {element.name}
            </option>
        ));
    };

    const renderOptionsPoint = (array) => {
        return array.map((element) => (
            <option key={element.id} value={element.id}>
                {element.name}
            </option>
        ));
    };

    return (
        <>
            <div className="form-group">
                <div>
                    <label htmlFor="city">Tỉnh/Thành phố</label>
                    <select name="provinceId" id="city" className=" citySelect" value={province}
                            onChange={handleProvinceChange}>
                        <option disabled selected value="">
                            {selectedProvince || 'Chọn tỉnh'}
                        </option>
                        {renderOptions(provinces)}
                    </select>
                </div>
                <div>
                    <label htmlFor="district">Quận/Huyện</label>
                    <select name="districtId" id="district" className=" districtSelect" value={district}
                            onChange={handleDistrictChange}>
                        <option disabled selected value="">
                            {selectedDistrict || 'Chọn quận'}
                        </option>
                        {renderOptions(districts)}
                    </select>
                </div>
            </div>
            <div className="form-group">
                <div>
                    <label htmlFor="ward">Xã/Phường</label>
                    <select name="wardId" id="ward" className=" wardSelect" value={ward} onChange={handleWardChange}>
                        <option disabled selected value="">
                            {selectedWard || 'Chọn xã/phường'}
                        </option>
                        {renderOptions(wards)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="transaction_point_id" className="block text-sm font-medium text-gray-700">
                        Chọn điểm giao dịch
                    </label>
                    <select
                        id="transaction_point_id"
                        name="transaction_point_id"
                        value={transactionPoint}
                        onChange={handleTransactionPointChange}
                        style={{width: '100%'}}
                        required
                    >
                        <option disabled value="">
                            Chọn điểm giao dịch
                        </option>
                        {renderOptionsPoint(transactionList)}
                    </select>
                </div>
            </div>
        </>
    );
};

export default AddressSelectionTransactionOfficerDefault;

