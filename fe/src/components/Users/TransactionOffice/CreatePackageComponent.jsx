import React, {useContext, useState, useEffect} from 'react';
import {TransactionOfficeContext} from "./TransactionOfficeProvider.jsx";
import axiosClient from "../../../axios.js";
import {useLocation, useParams} from "react-router-dom";

const CreateShipmentForm = () => {


    const {data, transactionList, aggregationList} = useContext(TransactionOfficeContext);


    const $id = data?.transaction_officer?.transaction_point_id;

    // Kiểm tra xem transactionList có tồn tại không
    const transactionListExists = transactionList ?? [];
    // Lấy ra transaction từ transactionList có id là $id
    const transaction = transactionListExists.find(item => item.id === $id);


    const $agg_id = transaction?.aggregation_point_id;
    const aggregation = aggregationList.find(item => item.id === $agg_id);

    let transactionName;
    if (transaction) {
        transactionName = transaction.name;
        console.log("transaction name: ", transactionName);
    } else {
        console.log("transaction not found");
    }

    let aggregationName;
    if (aggregation) {
        aggregationName = aggregation.name;
        console.log("aggregationName name: ", aggregationName);
    } else {
        console.log("aggregationName not found");
    }
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderIds = searchParams.get("orderIds").split(",");
    console.log('orderIds from URL:', orderIds);


    const [status, setStatus] = useState('đang chờ chuyển '); // Giá trị mặc định
    const [sendingTransactionPointId, setSendingTransactionPointId] = useState(''); // Set default sendingTransactionPointId as an empty string
    const [receivingAggregationPointId, setReceivingAggregationPointId] = useState(''); // Set default receivingAggregationPointId as an empty string

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
            sending_transaction_point_id: $id,
            receiving_aggregation_point_id: $agg_id,
        }).then(response => {
            // Handle success, you might want to do something with the response
            console.log('Shipment created successfully:', response.data);
        }).catch(error => {
            // Handle error, you might want to show an error message to the user
            console.error('Error creating shipment:', error);
        });
    };


    //

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
                               className="block text-sm font-medium text-gray-700">CHọn điểm giao
                            dịch</label>
                        <select
                            id={'transaction_point_id'}
                            name={'transaction_point_id'}
                            value={sendingTransactionPointId}
                            onChange={(e) => setSendingTransactionPointId(e.target.value)} style={{width: '100%'}}
                            required
                            disabled

                        >
                            <option disabled value="">
                                {transactionName}
                            </option>
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
                            disabled
                        >
                            <option disabled value="">
                                {aggregationName}
                            </option>
                            {/*{renderOptions(aggregationList)}*/}
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

export default CreateShipmentForm;
