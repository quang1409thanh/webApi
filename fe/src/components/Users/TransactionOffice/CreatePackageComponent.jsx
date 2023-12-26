import React, {useContext, useState, useEffect} from 'react';
import {TransactionOfficeContext} from "./TransactionOfficeProvider.jsx";
import axiosClient from "../../../axios.js";
import {useLocation, useParams} from "react-router-dom";

const CreateShipmentForm = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderIds = searchParams.get("orderIds").split(",");
    console.log('orderIds from URL:', orderIds);


    const [status, setStatus] = useState(''); // Set default status as an empty string
    const [sendingTransactionPointId, setSendingTransactionPointId] = useState(''); // Set default sendingTransactionPointId as an empty string
    const [receivingAggregationPointId, setReceivingAggregationPointId] = useState(''); // Set default receivingAggregationPointId as an empty string

    const handleSubmit = () => {
        // Check if required fields are filled
        if (!status || !sendingTransactionPointId || !receivingAggregationPointId) {
            console.error('Please fill in all required fields.');
            return;
        }

        // Make the API call to create the shipment
        axiosClient.post('/create-shipment-gd-tk', {
            good_ids: orderIds,
            status: status,
            sending_transaction_point_id: sendingTransactionPointId,
            receiving_aggregation_point_id: receivingAggregationPointId,
        }).then(response => {
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
                <h2>Create Shipment</h2>
                <form>
                    <label>Status:</label>
                    <input type="text" value={status} onChange={(e) => setStatus(e.target.value)}/>

                    <label>Sending Transaction Point ID:</label>
                    <input type="text" value={sendingTransactionPointId}
                           onChange={(e) => setSendingTransactionPointId(e.target.value)}/>

                    <label>Receiving Aggregation Point ID:</label>
                    <input type="text" value={receivingAggregationPointId}
                           onChange={(e) => setReceivingAggregationPointId(e.target.value)}/>
                    <button type="button" onClick={handleSubmit}>Submit</button>
                </form>
            </main>
        </div>

    );
};

export default CreateShipmentForm;
