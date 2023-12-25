import {TransactionHeadProvider} from "./TransactionHeadProvider.jsx";
import TransactionOfficerList from "./TransactionOfficerList.jsx";
import TransactionOfficerAdd from "./TransactionOfficerAdd.jsx";


const TransactionOfficerLayout = () => {
    return (
        <>
            <h1>===
            </h1>
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
