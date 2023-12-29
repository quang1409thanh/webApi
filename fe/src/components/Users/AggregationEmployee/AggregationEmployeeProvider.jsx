import React, {useState, useEffect} from 'react';
import axiosClient from '../../../axios.js';
import {useStateContext} from "../../../contexts/ContextProvider.jsx";

export const AggregationEmployeeContext = React.createContext();

export function AggregationEmployeeProvider({children}) {
    // cho diem
    const [submitted, setSubmitted] = useState(false);

    const {currentUser} = useStateContext();

    const data = currentUser;
    return (
        <AggregationEmployeeContext.Provider
            value={{
                setSubmitted,
                data,
            }}
        >
            {children}
        </AggregationEmployeeContext.Provider>
    );
}
