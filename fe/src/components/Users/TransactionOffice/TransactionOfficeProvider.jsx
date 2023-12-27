import React, {useState, useEffect} from 'react';
import axiosClient from '../../../axios.js';

export const TransactionOfficeContext = React.createContext();

export function TransactionOfficeProvider({children}) {
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


    const [listGood, setListGood] = useState([]);

    useEffect(() => {
        axiosClient.get('/list_good_send_transaction')
            .then(({data}) => {
                // Kiểm tra xem dữ liệu có tồn tại không trước khi thêm vào state
                console.log("data", data.goods);
                if (data && data.goods) {
                    setListGood(data.goods);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const [listGoodReceive, setListGoodReceive] = useState([]);

    useEffect(() => {
        axiosClient.get('/list_good_receive_transaction')
            .then(({data}) => {
                // Kiểm tra xem dữ liệu có tồn tại không trước khi thêm vào state
                console.log("data", data.goods);
                if (data && data.goods) {
                    setListGoodReceive(data.goods);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const [listOutgoingTransaction, setListOutgoingTransaction] = useState([])
    useEffect(() => {
        axiosClient.get('/list_outgoing_transaction')
            .then(({data}) => {
                // Kiểm tra xem dữ liệu có tồn tại không trước khi thêm vào state
                console.log("data", data.shipmentGdTk);
                if (data && data.shipmentGdTk) {
                    setListOutgoingTransaction(data.shipmentGdTk);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const [listIncomingTransaction, setListIncomingTransaction] = useState([])
    useEffect(() => {
        axiosClient.get('/list_incoming_transaction')
            .then(({data}) => {
                // Kiểm tra xem dữ liệu có tồn tại không trước khi thêm vào state
                console.log("data", data.shipmentTkGd);
                if (data && data.shipmentTkGd) {
                    setListIncomingTransaction(data.shipmentTkGd);
                }
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
    // end cho diem.

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

    return (
        <TransactionOfficeContext.Provider
            value={{
                setSubmitted, data, listGood, listOutgoingTransaction,
                listIncomingTransaction,
                transactionList,
                aggregationList,
                listGoodReceive,
            }}
        >
            {children}
        </TransactionOfficeContext.Provider>
    );
}
