import React from 'react';
import "/home/thanhyk14/Desktop/local/fe/public/css/app.css" ;
import "/home/thanhyk14/Desktop/local/fe/public/css/home.css" ;
import Header from "../../Header.jsx";
import Footer from "../../../Common/Footer.jsx";
import Toast from "../../../Common/Toast.jsx";
import {useParams} from "react-router-dom";
import AggregationForm from "./AggregationForm.jsx";
import {AggregationProvider} from "./AggregationProvider.jsx";
import AggregationList from "./AggregationList.jsx";
import EditForm from "./EditForm.jsx";

function Aggregation() {
    return null;
}

const ShowAggregation = ({headerType, body}) => {
    const {dynamicValue} = useParams();
    return (
        <div className="min-h-full">
            <Toast/>
            {headerType !== 'none' && <Header/>}
            <section className="block-search-post-office">
                <div className="container">
                    <AggregationProvider>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <EditForm id={dynamicValue} />
                    </AggregationProvider>
                </div>
            </section>
            {headerType !== 'none' && <Footer/>}
        </div>
    );
};

export default ShowAggregation;
