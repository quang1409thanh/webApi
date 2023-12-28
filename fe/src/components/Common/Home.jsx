import React from "react";
import "../../css/app.css";
import "../../css/home.css";
import HeaderGuess from "../Guess/HeaderGuess.jsx";
import HomeBody from "./HomeBody.jsx";
import Footer from "./Footer.jsx";
import Header from "../Users/Header.jsx";

const Home = ({ headerType, body }) => {
    return (
        <div className="min-h-full">
            {headerType !== "none" && <Header />}
            {<HomeBody />}
            {headerType !== "none" && <Footer />}
        </div>
    );
};

export default Home;
