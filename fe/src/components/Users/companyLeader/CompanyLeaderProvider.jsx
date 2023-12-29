import React, {useState, useEffect, useContext} from 'react';
import axiosClient from "../../../axios.js";

export const CompanyLeaderContext = React.createContext();

export function CompanyLeaderProvider({children}) {
    // cho diem
    const [submitted, setSubmitted] = useState(false);
    const [userType, setUserType] = useState('aggregationHead');

    return (
        <CompanyLeaderContext.Provider
            value={{setSubmitted, submitted, userType, setUserType}}>
            {children}
        </CompanyLeaderContext.Provider>
    );
}
