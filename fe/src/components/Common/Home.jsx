import React from 'react';
import "/home/thanhyk14/Desktop/local/fe/public/css/app.css" ;
import "/home/thanhyk14/Desktop/local/fe/public/css/home.css" ;
import HeaderGuess from '../Guess/HeaderGuess.jsx';
import HomeBody from "./HomeBody.jsx";
import Footer from './Footer.jsx';
import Header from "../Users/Header.jsx";

const Home = ({headerType, body}) => {
    return (
        <div className="min-h-full">
            {headerType !== 'none' && <Header/>}
            {<HomeBody/>}
            {headerType !== 'none' && <Footer/>}
        </div>
    );
};

export default Home;
