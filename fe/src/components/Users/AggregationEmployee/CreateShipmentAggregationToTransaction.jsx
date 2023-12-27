import React, {useContext, useState, useEffect} from 'react';
import axiosClient from "../../../axios.js";
import {useLocation, useParams} from "react-router-dom";
import {AggregationEmployeeContext} from "./AggregationEmployeeProvider.jsx";

const CreateShipmentAggregationToAggregation = () => {
    const {data} = useContext(AggregationEmployeeContext);

    const id = data?.aggregation_point_employee?.aggregation_point_id || '';


    const {transactionList} = useContext(AggregationEmployeeContext);
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
            receiving_transaction_point_id: receivingTransactionPointId,
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
                    <label>Status:</label>
                    <input type="text" value={status} onChange={(e) => setStatus(e.target.value)}/>

                    <div className="mb-4">
                        <label htmlFor="aggregation_point_id"
                               className="block text-sm font-medium text-gray-700">Receiving Aggregation Point
                            ID:</label>
                        <select
                            id={'aggregation_point_id'}
                            name={'aggregation_point_id'}
                            value={receivingTransactionPointId}
                            onChange={(e) => setReceivingAggregationPointId(e.target.value)}
                            required
                        >
                            <option disabled value="">
                                Điểm giao dịch nhận
                            </option>
                            {renderOptions(transactionList)}
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
