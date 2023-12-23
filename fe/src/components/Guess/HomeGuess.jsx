import React from 'react';
import "../../css/app.css" ;
import "../../css/home.css" ;
import HomeBody from "../Common/HomeBody.jsx";
import Footer from "../Common/Footer.jsx";
import HeaderGuess from "./HeaderGuess.jsx";

const HomeGuess = ({headerType, body}) => {
    return (
        <div className="min-h-full">
            {headerType !== 'none' && <HeaderGuess/>}
            {<HomeBody/>}
            {headerType !== 'none' && <Footer/>}
        </div>
    );
};

export default HomeGuess;
