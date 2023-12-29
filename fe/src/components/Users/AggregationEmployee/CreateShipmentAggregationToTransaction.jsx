import React, {useContext, useState, useEffect} from 'react';
import axiosClient from "../../../axios.js";
import {useLocation, useParams} from "react-router-dom";
import {AggregationEmployeeContext} from "./AggregationEmployeeProvider.jsx";
import AddressSelectionAggregationEmployeeDisable
    from "../../Common/FindPost/AddressSelectionAggregationEmployeeDisable.jsx";
import AddressSelectionAggregationEmployee from "../../Common/FindPost/AddressSelectionAggregationEmployee.jsx";
import AddressSelectionTransactionOfficer from "../../Common/FindPost/AddressSelectionTransactionOfficer.jsx";
import AddressSelectionTransactionOfficerDefault
    from "../../Common/FindPost/AddressSelectionTransactionOfficerDefault.jsx";
import {useStateContext} from "../../../contexts/ContextProvider.jsx";

const CreateShipmentAggregationToAggregation = () => {
    const {data} = useContext(AggregationEmployeeContext);
    const {showToast} = useStateContext();

    const id = data?.aggregation_point_employee?.aggregation_point_id || '';
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');

    const [sendAggregation, setSendAggregation] = useState({
        id: '',
        address: {
            province: '',
            district: '',
            ward: '',
        },
        name: '',
    });

    useEffect(() => {
        axiosClient
            .get(`/aggregationPoint/${id}`)
            .then(({data}) => {
                setSendAggregation(data.aggregation);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    useEffect(() => {
        if (sendAggregation) {
            console.log("sendTransaction: ->", sendAggregation)
            setProvince(sendAggregation.address.province);
            setDistrict(sendAggregation.address.district);
            setWard(sendAggregation.address.ward);
        }
    }, [sendAggregation]);


    ///

    const [receiveTransaction, setReceiveTransaction] = useState({
        province: '',
        district: '',
        ward: '',
        transactionPointId: '',
    });

    const handleAddressChange = (selectedCode, selectedText, type) => {
        switch (type) {
            case 'province':
                setReceiveTransaction((prevAddress) => ({
                    ...prevAddress,
                    province: selectedText,
                    district: "",
                    ward: "",
                }));
                break;
            case 'district':
                setReceiveTransaction((prevAddress) => ({
                    ...prevAddress,
                    district: selectedText,
                    ward: "",
                }));
                break;
            case 'ward':
                setReceiveTransaction((prevAddress) => ({
                    ...prevAddress,
                    ward: selectedText,
                }));
                break;
            case 'receive_transaction':
                setReceiveTransaction((prevAddress) => ({
                    ...prevAddress,
                    transactionPointId: selectedCode,
                }));
                break;
            default:
                break;
        }
    };//

    const [transactionList, setTransactionList] = useState([]);


    useEffect(() => {
        axiosClient.get('/transactionPoint')
            .then(({data}) => {
                setTransactionList(data.transactionPoints);
                setSubmitted(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderIds = searchParams.get("orderIds").split(",");
    console.log('orderIds from URL:', orderIds);


    const [status, setStatus] = useState('đang chờ chuyển '); // Giá trị mặc định
    const [receivingTransactionPointId, setReceivingAggregationPointId] = useState(''); // Set default receivingTransactionPointId as an empty string

    const handleSubmit = () => {
        // Check if required fields are filled
        if (!status) {
            console.error('Please fill in all required fields.');
            return;
        }

        // Make the API call to create the shipment
        axiosClient.post('/create-shipment-tk-gd', {
            good_ids: orderIds,
            status: status,
            sending_aggregation_point_id: id,
            receiving_transaction_point_id: receiveTransaction.transactionPointId,
        }).then(response => {
            // Handle success, you might want to do something with the response
            showToast("Đã gửi về điểm giao dịch nhận")
            console.log('Shipment created successfully:', response.data);
        }).catch(error => {
            // Handle error, you might want to show an error message to the user
            console.error('Error creating shipment:', error);
        });
    };
    const renderOptions = (array) => {
        return array.map(element => (
            <option key={element.id} value={element.id}>{element.name}</option>
        ));
    };
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };


    return (
        <div className="page_container">
            <main className="main_content">
                <div id="mainContent">
                    <div className="full_container">
                        <div className="content_title">
                            Gửi đến điểm tập kết nhận
                        </div>

                        <div className="customer_info">
                            <div className="form sent_info">
                                <div className="tmp">
                                    <label htmlFor="send_name">Gửi từ điểm tập kết
                                    </label>
                                </div>

                                <AddressSelectionAggregationEmployeeDisable
                                    selectedProvince={province} // Pass the selected province
                                    selectedDistrict={district} // Pass the selected district
                                    selectedWard={ward} // Pass the selected ward
                                    selectAggregationPoint={sendAggregation.name} // Pass the selected detailed address
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
                                    <label htmlFor="send_name">Gửi Về điểm giao dịch
                                    </label>
                                </div>

                                <AddressSelectionTransactionOfficerDefault
                                    selectedProvince={province}
                                    onSelectDistrict={(code, text) => handleAddressChange(code, text, 'district')}
                                    onSelectWard={(code, text) => handleAddressChange(code, text, 'ward')}
                                    onSelectTransactionPoint={(code, text) => handleAddressChange(code, text, 'receive_transaction')}
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

export default CreateShipmentAggregationToAggregation;
