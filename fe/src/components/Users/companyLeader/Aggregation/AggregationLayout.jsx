import React from 'react';
import "/home/thanhyk14/Desktop/local/fe/public/css/app.css" ;
import "/home/thanhyk14/Desktop/local/fe/public/css/home.css" ;
import Header from "../../Header.jsx";
import Footer from "../../../Common/Footer.jsx";
import Toast from "../../../Common/Toast.jsx";
import "../styleAggregation.css"
import AggregationList from "./AggregationList.jsx";
import AggregationForm from "./AggregationForm.jsx";
import {AggregationProvider} from "./AggregationProvider.jsx";


const AggregationLayout = ({headerType, body}) => {
    return (
        <div className="min-h-full">
            <Toast/>
            {headerType !== 'none' && <Header/>}
            <section className="block-search-post-office">
                <div className="container">
                    <AggregationProvider>
                        <AggregationList/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <AggregationForm/>
                    </AggregationProvider>
                </div>
            </section>
            {
                headerType !== 'none' && <Footer/>
            }
        </div>
    );
};

export default AggregationLayout;
