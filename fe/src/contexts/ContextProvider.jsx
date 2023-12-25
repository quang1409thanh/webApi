import {useContext, useEffect} from "react";
import {useState} from "react";
import {createContext} from "react";
import axiosClient from "../axios.js";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    toast: {
        message: null,
        show: false,
        type: "success",
    },
    setCurrentUser: () => {
    },
    setUserToken: () => {
    },
});

export const ContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
    const [toast, setToast] = useState({message: '', show: false})
    const [userRole, setUserRole] = useState("guess");

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem('TOKEN', token)
        } else {
            localStorage.removeItem('TOKEN')
        }
        _setUserToken(token);
    }
    useEffect(() => {
        if (userToken && userToken.length > 0) {
            axiosClient.get('/me')
                .then(({data}) => {
                    if (data.user) {
                        setCurrentUser(data.user);
                        handleUserRole(data.user);
                    } else {
                        console.error('No user data available.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        } else {
            setUserRole('guess');
            console.log('User not logged in.');
        }
    }, [userToken]);

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
            setUserRole('guess');
        }
        console.log(userRole);
    };


    const showToast = (message, type = 'success') => {
        setToast({message, show: true, type});

        setTimeout(() => {
            setToast({message: '', show: false, type: ''});
        }, 5000);
    };
    return (
        <StateContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                userToken,
                setUserToken,
                toast,
                showToast,
                userRole,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
