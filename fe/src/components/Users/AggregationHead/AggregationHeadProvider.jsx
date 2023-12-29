import React, {useState, useEffect, useContext} from 'react';
import axiosClient from "../../../axios.js";
import {useStateContext} from "../../../contexts/ContextProvider.jsx";

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

    const {currentUser} = useStateContext();

    const data = currentUser;

    return (
        <AggregationHeadContext.Provider
            value={{setSubmitted, transactionList, listEmployee, data}}>
            {children}
        </AggregationHeadContext.Provider>
    );
}
