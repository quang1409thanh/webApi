import React, { useContext, useState } from "react";
import axiosClient from "../../../axios.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import { TransactionHeadContext } from "./TransactionHeadProvider.jsx";

const TransactionOfficerList = () => {
    const { transactionOfficer } = useContext(TransactionHeadContext);
    const { setSubmitted } = useContext(TransactionHeadContext);
    const { showToast } = useStateContext();

    const handleDelete = async (event, id) => {
        event.preventDefault();
        const isConfirmed = window.confirm("Bạn có chắc là muốn xóa ?");
        if (isConfirmed) {
            try {
                const response = axiosClient.delete(`transactionOfficer/${id}`);
                setSubmitted(true);
                showToast("Xóa thành công", "success");
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="max-w-screen-lg mx-auto px-4">
            <br />
            <h1>Danh sách các nhân viên điểm giao dịch</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Phone</th>
                        <th className="py-2 px-4 border-b">Details</th>
                        <th className="py-2 px-4 border-b">Delete</th>
                        <th className="py-2 px-4 border-b">View/ Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionOfficer.map((item) => (
                        <tr key={item.id}>
                            <td className="py-2 px-4 border-b">{item.id}</td>
                            <td className="py-2 px-4 border-b">
                                {item.user.name}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {item.user.email}
                            </td>
                            <td className="py-2 px-4 border-b">{item.phone}</td>
                            <td className="py-2 px-4 border-b">
                                {item.details}
                            </td>
                            <td className="py-2 px-4 border-b">
                                <form
                                    method="DELETE"
                                    onSubmit={(event) =>
                                        handleDelete(event, item.id)
                                    }
                                >
                                    <button
                                        type="submit"
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        DELETE
                                    </button>
                                </form>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <a
                                    className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    href={`transactionOfficer/${item.id}`}
                                >
                                    DETAIL
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionOfficerList;
