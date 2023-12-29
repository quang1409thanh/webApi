import React, {useContext, useState, useEffect} from 'react';
import axiosClient from "../../../axios.js";
import {useLocation, useParams} from "react-router-dom";
import {AggregationEmployeeContext} from "./AggregationEmployeeProvider.jsx";
import AddressSelectionAggregationEmployeeDisable
    from "../../Common/FindPost/AddressSelectionAggregationEmployeeDisable.jsx";
import AddressSelectionAggregationEmployee from "../../Common/FindPost/AddressSelectionAggregationEmployee.jsx";
import {useStateContext} from "../../../contexts/ContextProvider.jsx";

const CreateShipmentAggregationToAggregation = () => {

    const {showToast} = useStateContext();

    const [aggregationList, setAggregationList] = useState([]);

    useEffect(() => {
        axiosClient.get('/aggregationPoint')
            .then(({data}) => {
                setAggregationList(data.aggregationPoints);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const {data} = useContext(AggregationEmployeeContext);

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


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderIds = searchParams.get("orderIds").split(",");
    console.log('orderIds from URL:', orderIds);


    const [status, setStatus] = useState('đang chờ chuyển '); // Giá trị mặc định
    const [receivingAggregationPointId, setReceivingAggregationPointId] = useState(''); // Set default receivingAggregationPointId as an empty string


    ///


    const [receiveAggregation, setReceiveAggregation] = useState({
        province: '',
        district: '',
        ward: '',
        aggregationPointId: '',
    });

    const handleAddressChange = (selectedCode, selectedText, type) => {
        switch (type) {
            case 'province':
                setReceiveAggregation((prevAddress) => ({
                    ...prevAddress,
                    province: selectedText,
                    district: "",
                    ward: "",
                }));
                break;
            case 'district':
                setReceiveAggregation((prevAddress) => ({
                    ...prevAddress,
                    district: selectedText,
                    ward: "",
                }));
                break;
            case 'ward':
                setReceiveAggregation((prevAddress) => ({
                    ...prevAddress,
                    ward: selectedText,
                }));
                break;
            case 'receive_aggregation':
                setReceiveAggregation((prevAddress) => ({
                    ...prevAddress,
                    aggregationPointId: selectedCode,
                }));
                break;
            default:
                break;
        }
    };
///

    const handleSubmit = () => {
        // Check if required fields are filled// Make the API call to create the shipment
        axiosClient.post('/create-shipment-tk-tk', {
            good_ids: orderIds,
            status: status,
            sending_aggregation_point_id: id,
            receiving_aggregation_point_id: receiveAggregation.aggregationPointId,
        }).then(response => {
            showToast("Đơn hàng đã gửi đến điểm tập kết nhận")
            // Handle success, you might want to do something with the response
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
                                    <label htmlFor="send_name">Gửi đến điểm tập kết
                                    </label>
                                </div>

                                <AddressSelectionAggregationEmployee
                                    onSelectProvince={(code, text) => handleAddressChange(code, text, 'province')}
                                    onSelectDistrict={(code, text) => handleAddressChange(code, text, 'district')}
                                    onSelectWard={(code, text) => handleAddressChange(code, text, 'ward')}
                                    onSelectAggregationPoint={(code, text) => handleAddressChange(code, text, 'receive_aggregation')}
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
