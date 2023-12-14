import React from 'react';
import "/home/thanhyk14/Desktop/local/fe/public/css/app.css" ;
import "/home/thanhyk14/Desktop/local/fe/public/css/home.css" ;
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
