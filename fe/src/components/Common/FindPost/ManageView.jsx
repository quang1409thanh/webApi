// MainComponent.js
import React from 'react';
import Banner from './Banner.jsx';
import Breadcrumb from './Breadcrumb.jsx';
import SearchBox from './SearchBox.jsx';
import "./find_post.css"
import Header from "../../Users/Header.jsx";

const ManageView = () => {
    return (
        <div className="container-find-post">
            <Banner/>
            <Breadcrumb/>
            <SearchBox/>
            {/* Uncomment below to include map */}
            {/* <div id="map" className="map-col" api="your_api_key_here"> ... </div> */}
        </div>
    );
};

export default ManageView;
