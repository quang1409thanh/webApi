// Create a new file, let's say AddressSelect.js

import React, {useEffect, useState} from 'react';

const AddressSelectionAggregationEmployeeDisable = ({
                                                        selectedProvince,
                                                        selectedDistrict,
                                                        selectedWard,
                                                        selectAggregationPoint
                                                    }) => {
    return (

        <>
            <div className="form-group">
                <div>
                    <label htmlFor="city">Tỉnh/Thành phố</label>
                    <select
                        name="provinceId"
                        id="city"
                        className=" citySelect"
                        placeholder={"test"}>
                        <option disabled selected value="">{selectedProvince || 'chọn tỉnh'}</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="district">Quận/Huyện</label>
                    <select
                        name="districtId"
                        id="district"
                        className=" districtSelect">
                        <option disabled selected value="">{selectedDistrict || 'chọn quận'}</option>
                    </select>
                </div>

            </div>
            <div className="form-group">
                <div>
                    <label htmlFor="ward">Xã/Phường</label>
                    <select
                        name="wardId"
                        id="ward"
                        className=" wardSelect">
                        <option disabled selected value="">{selectedWard || 'chọn xã/phường'}</option>
                    </select>

                </div>
                <div className="form-group">
                    <label htmlFor="aggregation_point_id"
                           className="block text-sm font-medium text-gray-700">Receiving Aggregation Point
                        ID:</label>
                    <select
                        id={'aggregation_point_id'}
                        name={'aggregation_point_id'}
                        required
                        disabled>
                        <option disabled selected value="">{selectAggregationPoint}</option>
                    </select>
                </div>

            </div>
        </>
    );
};
export default AddressSelectionAggregationEmployeeDisable;
