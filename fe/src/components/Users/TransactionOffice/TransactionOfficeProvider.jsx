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

    return (
        <TransactionOfficeContext.Provider
            value={{setSubmitted, data, listGood, listOutgoingTransaction}}
        >
            {children}
        </TransactionOfficeContext.Provider>
    );
}
