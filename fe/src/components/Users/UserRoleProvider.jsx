// UserRoleContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';
import axiosClient from "../../axios.js";

const UserRoleContext = createContext();

export const useUserRole = () => {
    return useContext(UserRoleContext);
};

export const UserRoleProvider = ({ children, initialUserRole }) => {

    const [userRole, setUserRole] = useState(initialUserRole);

    useEffect(() => {
        axiosClient.get('/me')
            .then(({data}) => {
                setCurrentUser(data.user);
                handleUserRole(data.user);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleUserRole = (userData) => {
        if (userData.admin_system) {
            setUserRole('admin_system');
        } else if (userData.company_leader) {
            setUserRole('company_leader');
        } else if (userData.aggregation_point_employee) {
            setUserRole('aggregation_point_employee');
        } else if (userData.aggregation_point_head) {
            setUserRole('aggregation_point_head');
        } else if (userData.customer) {
            setUserRole('customer');
        } else if (userData.transaction_officer) {
            setUserRole('transaction_officer');
        } else if (userData.transaction_point_head) {
            setUserRole('transaction_point_head');
        } else if (userData.shipper) {
            setUserRole('shipper');
        } else {
            // Default role if none of the conditions match
            setUserRole('default_role');
        }
        console.log(userRole);
    };


    const contextValue = {
        userRole,
        setUserRole,
    };

    return (
        <UserRoleContext.Provider value={contextValue}>
            {children}
        </UserRoleContext.Provider>
    );
};
