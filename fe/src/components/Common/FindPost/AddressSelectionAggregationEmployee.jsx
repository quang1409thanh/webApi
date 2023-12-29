import React, {useEffect, useState} from 'react';
import axios from 'axios';
import axiosClient from '../../../axios.js';

const host = 'https://provinces.open-api.vn/api/';

const AddressSelectionAggregationEmployee = ({
                                                 onSelectProvince,
                                                 onSelectDistrict,
                                                 onSelectWard,
                                                 onSelectAggregationPoint,
                                                 selectedProvince,
                                                 selectedDistrict,
                                                 selectedWard,
                                                 selectTransactionPoint
                                             }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [aggregationList, setTransactionList] = useState([]);

    const [province, setProvince] = useState(selectedProvince);
    const [district, setDistrict] = useState(selectedDistrict);
    const [ward, setWard] = useState(selectedWard);
    const [provinceText, setProvinceText] = useState('');
    const [districtText, setDistrictText] = useState('');
    const [wardText, setWardText] = useState('');
    const [aggregationPoint, setTransactionPoint] = useState('');

    useEffect(() => {
        // Lấy danh sách tỉnh/thành phố
        axios.get(host + '?depth=1').then((response) => {
            setProvinces(response.data);
        });
    }, []);

    useEffect(() => {
        if (province) {
            axios.get(`${host}p/${province}?depth=2`).then((response) => {
                setDistricts(response.data.districts);
            });
        }
    }, [province]);

    useEffect(() => {
        if (district) {
            axios.get(`${host}d/${district}?depth=2`).then((response) => {
                setWards(response.data.wards);
            });
        }
    }, [district]);

    useEffect(() => {
        // Khi component được mount, gọi API để lấy danh sách điểm giao dịch tương ứng với tỉnh đã chọn
        if (province) {
            axiosClient
                .post('/list_aggregation', {
                    province: provinceText,
                    district: districtText,
                    ward: wardText,
                })
                .then((response) => {
                    const data = response.data || [];
                    setTransactionList(data);
                })
                .catch((error) => {
                    console.error('Error fetching transaction points:', error);
                });
        }
    }, [province, district, ward]);

    const handleProvinceChange = (e) => {
        const selectedProvinceCode = e.target.value;
        setProvince(selectedProvinceCode);
        setDistrict('');
        setWard('');
        setDistrictText('');
        setWardText('');
        setProvinceText(e.target.options[e.target.selectedIndex].text);

        // Gọi API để lấy danh sách điểm giao dịch tương ứng với tỉnh đã chọn
        axiosClient
            .post('/list_aggregation', {
                province: e.target.options[e.target.selectedIndex].text,
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

    const handleAggregationPointChange = (e) => {
        const selectedTransactionPointCode = e.target.value;
        setTransactionPoint(selectedTransactionPointCode);
        onSelectAggregationPoint(selectedTransactionPointCode, e.target.options[e.target.selectedIndex].text);
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
                        value={aggregationPoint}
                        onChange={handleAggregationPointChange}
                        style={{width: '100%'}}
                        required
                    >
                        <option disabled value="">
                            Chọn điểm tập kết
                        </option>
                        {renderOptionsPoint(aggregationList)}
                    </select>
                </div>
            </div>
        </>
    );
};

export default AddressSelectionAggregationEmployee;
