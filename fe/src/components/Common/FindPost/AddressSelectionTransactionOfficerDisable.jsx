
import React, {useEffect, useState} from 'react';

const AddressSelectionTransactionOfficerDisable = ({
                                                       selectedProvince,
                                                       selectedDistrict,
                                                       selectedWard,
                                                       selectTransactionPoint
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
                <div>
                    <label htmlFor="ward">Mã Bưu Chính</label>
                    <select
                        name="wardId"
                        id="ward"
                        className=" wardSelect"

                    >
                        <option disabled selected value="">{selectTransactionPoint || 'chọn xã/phường'}</option>
                    </select>
                </div>

            </div>
        </>
    );
};
export default AddressSelectionTransactionOfficerDisable;
