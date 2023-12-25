import React, {useState, useEffect, useContext} from 'react';
import axiosClient from "../../../axios.js";

export const AggregationHeadContext = React.createContext();

export function AggregationHeadProvider({children}) {
    // cho diem
    const [submitted, setSubmitted] = useState(false);
    const [transactionList, setTransactionList] = useState([]);

    const [listEmployee, setListEmployee] = useState([]);
    useEffect(() => {
        axiosClient.get('/listTransactionOff')
            .then(({data}) => {
                setTransactionList(data);
                setSubmitted(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        axiosClient.get('/aggregationPointEmployee')
            .then(({data}) => {
                setListEmployee(data);
                setSubmitted(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    return (
        <AggregationHeadProvider.Provider
            value={{setSubmitted, transactionList, userType, setUserType}}>
            {children}
        </AggregationHeadProvider.Provider>
    );
}
