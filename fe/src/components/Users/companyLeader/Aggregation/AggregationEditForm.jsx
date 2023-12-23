import React, {useContext, useEffect, useState} from 'react';
import axiosClient from '../../../../axios.js';
import AddressSelect from '../../../Common/FindPost/AddressSelect.jsx';
import '../styleAggregation.css';
import {useStateContext} from '../../../../contexts/ContextProvider.jsx';
import {CompanyLeaderContext} from "../CompanyLeaderProvider.jsx";

const InputField = ({label, id, value, onChange, type = 'text'}) => (
    <div className="col-tmp-1">
        <label htmlFor={id}>{label}:</label>
        <input
            type={type}
            id={id}
            className="form-control"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{width: '94%'}}
        />
    </div>
);

const AggregationEditForm = ({id}) => {
    const [isExpanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!isExpanded);
    };

    const [formData, setFormData] = useState({
        name: '',
        code: '',
        phone: '',
        email: '',
        operatingHours: '',
        status: '',
        notes: '',
        capacity: 0,
        current_load: 0,
    });

    const [address, setAddress] = useState({
        province: '',
        district: '',
        ward: '',
        detailed_address: '',
    });

    const {setSubmitted} = useContext(CompanyLeaderContext);
    const {showToast} = useStateContext();

    const handleAddressChange = (selectedCode, selectedText, type) => {
        switch (type) {
            case 'province':
                setAddress((prevAddress) => ({
                    ...prevAddress,
                    province: selectedText,
                }));
                break;
            case 'district':
                setAddress((prevAddress) => ({
                    ...prevAddress,
                    district: selectedText,
                }));
                break;
            case 'ward':
                setAddress((prevAddress) => ({
                    ...prevAddress,
                    ward: selectedText,
                }));
                break;
            case 'detailed_address':
                setAddress((prevAddress) => ({
                    ...prevAddress,
                    detailed_address: selectedText,
                }));
                break;
            default:
                break;
        }
    };
    useEffect(() => {
            axiosClient.get(`/aggregationPoint/${id}`)
                .then(({data}) => {
                    const {
                        name,
                        code,
                        phone,
                        email,
                        operatingHours,
                        status,
                        notes,
                        capacity,
                        current_load,
                        address: {province, district, ward, detailed_address}
                    } = data.aggregation;
                    setFormData({name, code, phone, email, operatingHours, status, notes, capacity, current_load});
                    setAddress({province, district, ward, detailed_address});
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },[id]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosClient
            .put(`/aggregationPoint/${id}`, {...address, ...formData})
            .then(() => {
                setSubmitted(true);
                showToast('Sửa thành công', "success");
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div className="row">
            <div className="box-title text-uppercase">Chỉnh sửa điểm tập kết</div>
            <form style={{width: '100%'}} onSubmit={handleSubmit}>
                <div className="col-search-box">
                    <h1>Chỉnh sửa các thông tin </h1>
                    <div className="search-box flex justify-center items-center">
                        <InputField label="Tên công ty" id="name" value={formData.name}
                                    onChange={(value) => setFormData({...formData, name: value})}/>
                        <InputField label="Mã công ty" id="code" value={formData.code}
                                    onChange={(value) => setFormData({...formData, code: value})}/>
                        <InputField label="Số điện thoại" id="phone" value={formData.phone}
                                    onChange={(value) => setFormData({...formData, phone: value})}/>
                        <InputField label="Email" id="email" value={formData.email}
                                    onChange={(value) => setFormData({...formData, email: value})}/>
                        <InputField label="Giờ làm việc" id="operatingHours" value={formData.operatingHours}
                                    onChange={(value) => setFormData({...formData, operatingHours: value})}/>
                        <InputField label="Trạng thái" id="status" value={formData.status}
                                    onChange={(value) => setFormData({...formData, status: value})}/>
                        <InputField label="Ghi chú" id="notes" value={formData.notes}
                                    onChange={(value) => setFormData({...formData, notes: value})}/>
                        <InputField label="Dung lượng" id="capacity" value={formData.capacity}
                                    onChange={(value) => setFormData({...formData, capacity: value})} type="number"/>
                        <InputField label="Tải hiện tại" id="current_load" value={formData.current_load}
                                    onChange={(value) => setFormData({...formData, current_load: value})}
                                    type="number"/>
                    </div>
                    <h1>Chỉnh sửa địa chỉ.</h1>
                    <AddressSelect
                        onSelectProvince={(code, text) => handleAddressChange(code, text, 'province')}
                        onSelectDistrict={(code, text) => handleAddressChange(code, text, 'district')}
                        onSelectWard={(code, text) => handleAddressChange(code, text, 'ward')}
                        onSelectDetail={(value) => handleAddressChange(null, value, 'detailed_address')}
                        selectedProvince={address.province} // Pass the selected province
                        selectedDistrict={address.district} // Pass the selected district
                        selectedWard={address.ward} // Pass the selected ward
                        selectedDetail={address.detailed_address} // Pass the selected detailed address

                    />
                    <div className="col-tmp-2 col-right col-left">
                        <input type="submit" value="Sửa" className="btn btn-search-branch"/>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AggregationEditForm;
