import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import {ContextProvider} from "./contexts/ContextProvider";
import AppRouter from "./router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
            <Router>
                <AppRouter/>
            </Router>
        </ContextProvider>
    </React.StrictMode>
);
