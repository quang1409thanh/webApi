import React, {useState, useEffect, useContext} from 'react';
import axiosClient from "../../../../axios.js";

export const AggregationContext = React.createContext();

export function AggregationProvider({children}) {
    const [submitted, setSubmitted] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => {
        axiosClient.get('/aggregationPoint')
            .then(({data}) => {
                setList(data.aggregationPoints);
                setSubmitted(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [submitted]);

    return (
        <AggregationContext.Provider value={{list, setSubmitted}}>
            {children}
        </AggregationContext.Provider>
    );
}
