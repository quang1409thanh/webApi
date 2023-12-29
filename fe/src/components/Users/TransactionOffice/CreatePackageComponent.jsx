import React, {useContext, useState, useEffect} from 'react';
import {TransactionOfficeContext} from "./TransactionOfficeProvider.jsx";
import axiosClient from "../../../axios.js";
import {useLocation, useParams} from "react-router-dom";
import AddressSelectionTransactionOfficerDisable
    from "../../Common/FindPost/AddressSelectionTransactionOfficerDisable.jsx";
import AddressSelectionTransactionOfficer from "../../Common/FindPost/AddressSelectionTransactionOfficer.jsx";
import AddressSelectionAggregationEmployeeDisable
    from "../../Common/FindPost/AddressSelectionAggregationEmployeeDisable.jsx";
import {useStateContext} from "../../../contexts/ContextProvider.jsx";

const CreateShipmentForm = () => {

    const {data} = useContext(TransactionOfficeContext)
    const id = data?.transaction_officer?.transaction_point_id;
    const {showToast} = useStateContext();


    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [sendTransaction, setSendTransaction] = useState({
        id: '',
        address: {
            province: '',
            district: '',
            ward: '',
        },
        aggregation_point: {
            id: '',
            address: {
                province: '',
                district: '',
                ward: '',
            },
            name: '',
        },
        name: '',
    });

    const [provinceReceive, setProvinceReceive] = useState('');
    const [districtReceive, setDistrictReceive] = useState('');
    const [wardReceive, setWardReceive] = useState('');
    const [nameReceive, setNameReceive] = useState('');

    useEffect(() => {
        axiosClient
            .get(`/transactionPoint/${id}`)
            .then(({data}) => {
                setSendTransaction(data.transactionPoint);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    useEffect(() => {
        if (sendTransaction) {
            console.log("sendTransaction: ->", sendTransaction)
            setProvince(sendTransaction.address.province);
            setDistrict(sendTransaction.address.district);
            setWard(sendTransaction.address.ward);
            setProvinceReceive(sendTransaction.aggregation_point.address.province);
            setDistrictReceive(sendTransaction.aggregation_point.address.district);
            setWardReceive(sendTransaction.aggregation_point.address.ward);
        }
    }, [sendTransaction]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderIds = searchParams.get("orderIds").split(",");
    console.log('orderIds from URL:', orderIds);

    const [status, setStatus] = useState('đang chờ chuyển '); // Giá trị mặc định

    const handleSubmit = () => {
        // Check if required fields are filled
        if (!status) {
            console.error('Please fill in all required fields.');
            return;
        }

        // Make the API call to create the shipment
        axiosClient.post('/create-shipment-gd-tk', {
            good_ids: orderIds,
            status: status,
            sending_transaction_point_id: sendTransaction.id,
            receiving_aggregation_point_id: sendTransaction.aggregation_point.id,
        }).then(response => {
            // Handle success, you might want to do something with the response
            showToast("Đơn hàng đang gửi lên điểm tập kết");
            console.log('Shipment created successfully:', response.data);
        }).catch(error => {
            // Handle error, you might want to show an error message to the user
            console.error('Error creating shipment:', error);
        });
    };


    return (
        <div className="page_container">
            <main className="main_content">
                <div id="mainContent">
                    <div className="full_container">
                        <div className="content_title">
                            Gửi lên điểm tập kết
                        </div>

                        <div className="customer_info">
                            <div className="form sent_info">
                                <div className="tmp">
                                    <label htmlFor="send_name">Gửi từ điểm giao dịch
                                    </label>
                                </div>

                                <AddressSelectionTransactionOfficerDisable
                                    selectedProvince={province} // Pass the selected province
                                    selectedDistrict={district} // Pass the selected district
                                    selectedWard={ward} // Pass the selected ward
                                    selectTransactionPoint={sendTransaction.name} // Pass the selected detailed address
                                />
                                <div className="form-group">
                                    <div>
                                        <label htmlFor="send_phone_number">Số Điện Thoại:</label>
                                        <input type="tel" id="send_phone_number" name="phoneNumber"/>
                                    </div>
                                    <div>
                                        <label htmlFor="send_email">Email:</label>
                                        <input type="email" id="send_email" name="email"/>
                                    </div>
                                </div>

                            </div>
                            <div className="form received_info">
                                <div className="tmp">
                                    <label htmlFor="send_name">Gửi lên điểm tập kết
                                    </label>
                                </div>

                                <AddressSelectionAggregationEmployeeDisable
                                    selectedProvince={provinceReceive} // Pass the selected province
                                    selectedDistrict={districtReceive} // Pass the selected district
                                    selectedWard={wardReceive} // Pass the selected ward
                                    selectAggregationPoint={sendTransaction.aggregation_point.name} // Pass the selected detailed address
                                />

                                <div className="form-group">
                                    <div>
                                        <label htmlFor="send_phone_number">Số Điện Thoại:</label>
                                        <input type="tel" id="send_phone_number" name="phoneNumber"/>
                                    </div>
                                    <div>
                                        <label htmlFor="send_email">Email:</label>
                                        <input type="email" id="send_email" name="email"/>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-6">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>

    );
};

export default CreateShipmentForm;
