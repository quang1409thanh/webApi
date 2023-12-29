import {TransactionHeadProvider} from "./TransactionHeadProvider.jsx";
import TransactionOfficerList from "./TransactionOfficerList.jsx";
import TransactionOfficerAdd from "./TransactionOfficerAdd.jsx";
import Toast from "../../Common/Toast.jsx";


const TransactionOfficerLayout = () => {
    return (
        <>
            <h1>===
            </h1>
            <Toast/>
            <div className="container">
                <TransactionHeadProvider>
                    <TransactionOfficerList/>
                    <TransactionOfficerAdd/>
                </TransactionHeadProvider>
            </div>
        </>

    );
};

export default TransactionOfficerLayout;
