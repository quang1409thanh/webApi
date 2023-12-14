import React, { useState, useEffect } from 'react';
import axios from 'axios';

const host = "https://provinces.open-api.vn/api/";

const AddressForm = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [province, setprovince] = useState("");
    const [district, setdistrict] = useState("");
    const [ward, setward] = useState("");

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


    return (
        <div className="container">
            <h1>Chọn danh sách tỉnh</h1>
            <form action="">
                <select value={province} onChange={e => setprovince(e.target.value)}>
                    <option disabled value="">chọn tỉnh</option>
                    {renderOptions(provinces)}
                </select>
                <select value={district} onChange={e => setdistrict(e.target.value)}>
                    <option disabled value="">chọn quận</option>
                    {renderOptions(districts)}
                </select>
                <select value={ward} onChange={e => setward(e.target.value)}>
                    <option disabled value="">chọn phường</option>
                    {renderOptions(wards)}
                </select>
            </form>
        </div>
    );
}

export default AddressForm;
