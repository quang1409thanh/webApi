import {useContext} from "react";
import {useState} from "react";
import {createContext} from "react";

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
    // them cac thuoc tinh o day lay tu backend
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
    const [toast, setToast] = useState({message: '', show: false})

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem('TOKEN', token)
        } else {
            localStorage.removeItem('TOKEN')
        }
        _setUserToken(token);
    }

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
                showToast
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
