// components/HeaderGuess.js
import React from "react";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

const HeaderGuess = () => {
    return (
        <div className="container">
            <header className="header">
                <div className="container">
                    <div className="row">
                        <nav>
                            <ul className="main_nav">
                                <li>
                                    <a href="/" className="logo_nav">
                                        <img src="/img/logo.png" alt=""/>
                                    </a>
                                </li>
                                <li className="menu_item">
                                    <a href="/login">
                                        <img src="./img/icon-login.svg" alt=""/>
                                        Đăng nhập
                                    </a>
                                </li>
                                <li className="menu_item">
                                    <a href="/gioithieu">
                                        <img src="./img/icon-introduce.svg" alt=""/>
                                        Giới thiệu
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <div className="back_to_top">
                <img src="./img/icon-back-to-top.svg" alt=""/>
            </div>
        </div>
    );
};

export default HeaderGuess;
