import React, {useState, useEffect, useContext} from 'react';
import axiosClient from '../../../axios.js';
import {ContextProvider, useStateContext} from "../../../contexts/ContextProvider.jsx";

export const TransactionOfficeContext = React.createContext();

export function TransactionOfficeProvider({children}) {
    // cho diem
    const [submitted, setSubmitted] = useState(false);

    const {currentUser} = useStateContext();
    const data = currentUser;
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
                setSubmitted, data,
                transactionList, aggregationList
            }}
        >
            {children}
        </TransactionOfficeContext.Provider>
    );
}
