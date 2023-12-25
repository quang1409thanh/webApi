import React, {useState, useEffect} from 'react';
import axiosClient from '../../../axios.js';

export const TransactionHeadContext = React.createContext();

export function TransactionHeadProvider({children}) {
    // cho diem
    const [submitted, setSubmitted] = useState(false);
    const [transactionOfficer, setTransactionOfficer] = useState([]);

    useEffect(() => {
        axiosClient
            .get('/transactionOfficer')
            .then(({data}) => {
                setTransactionOfficer(data.transactionOfficer);
                setSubmitted(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
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


    return (
        <TransactionHeadContext.Provider
            value={{setSubmitted, transactionOfficer,data}}
        >
            {children}
        </TransactionHeadContext.Provider>
    );
}
