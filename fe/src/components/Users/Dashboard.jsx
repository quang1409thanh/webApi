import {useEffect, useState} from "react";
import axiosClient from "../../axios.js";
import ManageView from "../Common/FindPost/ManageView.jsx";
import HomeBody from "../Common/HomeBody.jsx";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import Footer from "../Common/Footer.jsx";

export default function Dashboard() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`/dashboard`)
            .then((res) => {
                setLoading(false);
                setData(res.data);
                return res;
            })
            .catch((error) => {
                setLoading(false);
                return error;
            });
    }, []);

    return (
        <>
            <HomeBody/>
            <Footer/>
        </>
    );
}
