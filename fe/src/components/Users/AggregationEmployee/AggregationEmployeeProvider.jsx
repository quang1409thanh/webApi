import React, {useState, useEffect} from 'react';
import axiosClient from '../../../axios.js';

export const AggregationEmployeeContext = React.createContext();

export function AggregationEmployeeProvider({children}) {
    // cho diem
    const [submitted, setSubmitted] = useState(false);

    const [data, setData] = useState('');

    useEffect(() => {
        axiosClient
            .get('/me')
            .then(({data}) => {
                setData(data.user);
                setSubmitted(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const [listGoodToAggregation, setListGoodToAggregation] = useState([]);

    useEffect(() => {
        axiosClient.get('/list_good_from_transaction')
            .then(({data}) => {
                // Kiểm tra xem dữ liệu có tồn tại không trước khi thêm vào state
                console.log("data", data.goods);
                if (data && data.goods) {
                    setListGoodToAggregation(data.goods);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const [listGoodToTransaction, setListGoodToTransaction] = useState([]);

    useEffect(() => {
        axiosClient.get('/list_good_from_aggregation')
            .then(({data}) => {
                // Kiểm tra xem dữ liệu có tồn tại không trước khi thêm vào state
                console.log("data", data.goods);
                if (data && data.goods) {
                    setListGoodToTransaction(data.goods);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const [listIncomingFromTransaction, setListIncomingFromTransaction] = useState([]);
    useEffect(() => {
        axiosClient.get('/list_incoming_from_transaction')
            .then(({data}) => {
                console.log("data", data.shipmentGdTk);
                if (data && data.shipmentGdTk) {
                    setListIncomingFromTransaction(data.shipmentGdTk);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const [listIncomingFromAggregation, setListIncomingFromAggregation] = useState([]);
    useEffect(() => {
        axiosClient.get('/list_incoming_from_aggregation')
            .then(({data}) => {
                console.log("data", data.shipmentTkTk);
                if (data && data.shipmentTkTk) {
                    setListIncomingFromAggregation(data.shipmentTkTk);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const [listOutgoingToAggregation, setListOutgoingToAggregation] = useState([]);
    useEffect(() => {
        axiosClient.get('/list_outgoing_to_aggregation')
            .then(({data}) => {
                console.log("data", data.shipmentTkTk);
                if (data && data.shipmentTkTk) {
                    setListOutgoingToAggregation(data.shipmentTkTk);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const [aggregationList, setAggregationList] = useState([]);

    useEffect(() => {
        axiosClient.get('/aggregationPoint')
            .then(({data}) => {
                setAggregationList(data.aggregationPoints);
                setSubmitted(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


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

    return (
        <AggregationEmployeeContext.Provider
            value={{
                setSubmitted,
                data,
                listGoodToAggregation,
                listIncomingFromTransaction,
                listIncomingFromAggregation,
                listGoodToTransaction,
                aggregationList,
                transactionList,
                listOutgoingToAggregation
            }}
        >
            {children}
        </AggregationEmployeeContext.Provider>
    );
}
