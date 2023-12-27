import React, {useContext, useState, useEffect} from 'react';
import axiosClient from "../../../axios.js";
import {useLocation, useParams} from "react-router-dom";
import {TransactionOfficeContext} from "../TransactionOffice/TransactionOfficeProvider.jsx";
import {AggregationEmployeeContext} from "./AggregationEmployeeProvider.jsx";

const CreateShipmentAggregationToAggregation = () => {


    const {data, aggregationList} = useContext(AggregationEmployeeContext);
    const id = data?.aggregation_point_employee?.aggregation_point_id || '';


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderIds = searchParams.get("orderIds").split(",");
    console.log('orderIds from URL:', orderIds);


    const [status, setStatus] = useState('đang chờ chuyển '); // Giá trị mặc định
    const [receivingAggregationPointId, setReceivingAggregationPointId] = useState(''); // Set default receivingAggregationPointId as an empty string

    const handleSubmit = () => {
        // Check if required fields are filled// Make the API call to create the shipment
        axiosClient.post('/create-shipment-tk-tk', {
            good_ids: orderIds,
            status: status,
            sending_aggregation_point_id: id,
            receiving_aggregation_point_id: receivingAggregationPointId,
        }).then(response => {
            // Handle success, you might want to do something with the response
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
                <h2>Create Shipment</h2>
                <form>
                    <div>
                        <label>Status:</label>
                        <select value={status} onChange={handleStatusChange}>
                            <option value="đang chờ chuyển ">Đang chờ chuyển</option>
                            <option value="chuyển thành công">Chuyển thành công</option>
                            <option value="thất bại">Thất bại</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="aggregation_point_id"
                               className="block text-sm font-medium text-gray-700">Receiving Aggregation Point
                            ID:</label>
                        <select
                            id={'aggregation_point_id'}
                            name={'aggregation_point_id'}
                            value={receivingAggregationPointId}
                            onChange={(e) => setReceivingAggregationPointId(e.target.value)}
                            required
                        >
                            <option disabled value="">
                                Điểm tập kết nhận
                            </option>
                            {renderOptions(aggregationList)}
                        </select>
                    </div>
                    <div>
                        <button type="button" onClick={handleSubmit}>Submit</button>

                    </div>
                </form>
            </main>
        </div>

    );
};

export default CreateShipmentAggregationToAggregation;
