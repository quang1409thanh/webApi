import React, {useState, useEffect, useContext} from 'react';
import axiosClient from "../../../axios.js";

export const TransactionOfficeContext = React.createContext();

export function TransactionOfficeProvider({children}) {
    // cho diem
    const [submitted, setSubmitted] = useState(false);
    const [aggregationList, setAggregationList] = useState([]);
    const [transactionList, setTransactionList] = useState([]);

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

    // cho truong diem
    const [userType, setUserType] = useState('aggregationHead');
    const [headData, setHeadData] = useState([]);


    useEffect(() => {
        console.log('Calling useEffect in ManageHeadProvider');
        const apiEndpoint = userType === 'aggregationHead' ? '/aggregationHead' : '/transactionHead';
        const dataFieldName = userType === 'aggregationHead' ? 'aggregationPointHead' : 'transactionPointHead';
        axiosClient.get(apiEndpoint)
            .then(response => {
                setHeadData(response.data[dataFieldName]);
                setSubmitted(false)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [userType]);

    // end cho truong diem


    return (
        <TransactionOfficeProvider.Provider
            value={{setSubmitted, headData, aggregationList, transactionList, userType, setUserType}}>
            {children}
        </TransactionOfficeProvider.Provider>
    );
}
