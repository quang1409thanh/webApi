import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from "./components/Users/Dashboard.jsx";
import Login from "./components/Guess/Login.jsx";
import Home from "./components/Common/Home.jsx";
import {useStateContext} from "./contexts/ContextProvider.jsx";
import GuestLayout from "./components/Guess/GuessLayout.jsx";
import Header from "./components/Users/Header.jsx";
import HomeGuess from "./components/Guess/HomeGuess.jsx";
import DefaultLayout from "./components/Users/DefaultLayout.jsx";
import FindView from "./components/Common/FindPost/FindView.jsx";
import AggregationLayout from "./components/Users/companyLeader/Aggregation/AggregationLayout.jsx";
import ShowAggregation from "./components/Users/companyLeader/Aggregation/ShowAggregation.jsx";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<GuestLayout/>}>
                <Route path="/index" element={<HomeGuess/>}/>
                <Route path="/login" element={<Login/>}/>
            </Route>
            <Route path="/" element={<DefaultLayout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path="/dashboard" element={<Navigate to="/"/>}/>
                <Route path="/aggregationPoint" element={<AggregationLayout/>}/>
                <Route path="/aggregationPoint/:dynamicValue" element={<ShowAggregation/>}/>
            </Route>
            <Route path="/home" element={<Home/>}/>
            <Route path="/list_office" element={<FindView/>}/>
            <Route path="/gioithieu" element={<Home/>}/>
        </Routes>
    );
}

export default AppRouter;
