import React from 'react';
import "../../css/app.css" ;
import "../../css/home.css" ;
import Header from "./Header.jsx";
import Footer from "../Common/Footer.jsx";
import Toast from "../Common/Toast.jsx";
import "./companyLeader/styleAggregation.css"
import UserProfile from "./UserProfile.jsx";


const ShowProfile = ({headerType, body}) => {
    return (
        <>
            {<UserProfile/>}
        </>
    );
};

export default ShowProfile;
