import {Fragment} from "react";
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {
    Bars3Icon,
    BellIcon,
    UserIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {Navigate, NavLink, Outlet} from "react-router-dom";
import axiosClient from "../../axios.js";
import {useEffect} from "react";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import Toast from "../Common/Toast.jsx";
import Header from "./Header.jsx";

const navigation = [
    {name: "Dashboard", to: "/"},
    {name: "Surveys", to: "/surveys"},
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function DefaultLayout() {
    const {currentUser, userToken, setCurrentUser, setUserToken} =
        useStateContext();
    if (!userToken) {
        return <Navigate to="/index"/>;
    }

    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then((res) => {
            setCurrentUser({});
            setUserToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get('/me')
            .then(({data}) => {
                setCurrentUser(data.user)
            })
    }, [])

    return (
        <>
            <div className="min-h-full">
                <Header/>

                <Outlet/>

                <Toast/>
            </div>
        </>
    );
}
