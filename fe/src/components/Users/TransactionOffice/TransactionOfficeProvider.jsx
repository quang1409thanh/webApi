import React, {useState, useEffect} from 'react';
import axiosClient from '../../../axios.js';

export const TransactionOfficeContext = React.createContext();

export function TransactionOfficeProvider({children}) {
    // cho diem
    const [submitted, setSubmitted] = useState(false);
    const [listGood, setListGood] = useState([]);

    useEffect(() => {
        axiosClient
            .get('/good')
            .then(({data}) => {
                setListGood(data.transactionOfficer);
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
        <TransactionOfficeContext.Provider
            value={{setSubmitted, data}}
        >
            {children}
        </TransactionOfficeContext.Provider>
    );
}
