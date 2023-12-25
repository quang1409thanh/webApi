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
                setListEmployee(data.aggregationPointEmployee);
                console.log(listEmployee);
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
        <AggregationHeadContext.Provider
            value={{setSubmitted, transactionList, listEmployee, data}}>
            {children}
        </AggregationHeadContext.Provider>
    );
}
