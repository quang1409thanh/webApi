import React, { useContext, useEffect, useState } from "react";
import axiosClient from "../../../../axios.js";
import { useStateContext } from "../../../../contexts/ContextProvider.jsx";
import { CompanyLeaderContext } from "../CompanyLeaderProvider.jsx";

const TransactionList = () => {
    const { transactionList } = useContext(CompanyLeaderContext);
    // const {list} = useContext(TransactionContext);
    // const {setSubmitted} = useContext(TransactionContext);
    const { setSubmitted } = useContext(CompanyLeaderContext);

    const { showToast } = useStateContext();

    if (!transactionList || !transactionList.length) return null;

    return (
        <div>
            <div className="content-wrapper">
                {/* Hiển thị thông báo nếu có */}

                <h3 className="font_size">All Transaction Point</h3>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b">
                                AggregationID
                            </th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Code</th>
                            <th className="py-2 px-4 border-b">Phone</th>
                            <th className="py-2 px-4 border-b">Address</th>
                            <th className="py-2 px-4 border-b">Thuộc về</th>
                            <th className="py-2 px-4 border-b">DELETE</th>
                            <th className="py-2 px-4 border-b">DETAIL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Sử dụng dữ liệu từ state để render danh sách sản phẩm */}
                        {transactionList.map((element) => (
                            <tr key={element.id}>
                                <td className="py-2 px-4 border-b">
                                    {element.aggregation_point_id}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {element.name}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {element.code}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {element.phone}
                                </td>
                                <td className="py-2 px-4 border-b">{`${element.address.province}, ${element.address.district}, ${element.address.ward}, ${element.address.detailed_address}`}</td>
                                <td className="py-2 px-4 border-b">
                                    {element?.transaction_point_head?.user?.name
                                        ? element.transaction_point_head.user
                                              .name
                                        : "Chưa có người quản lý"}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <form
                                        method="DELETE"
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            const isConfirmed = window.confirm(
                                                "Bạn có chắc là muốn xóa ?"
                                            );
                                            if (isConfirmed) {
                                                try {
                                                    // Gửi yêu cầu DELETE bằng axios
                                                    const response =
                                                        axiosClient.delete(
                                                            `transactionPoint/${element.id}`
                                                        );
                                                    console.log(response);
                                                    setSubmitted(true);
                                                    showToast("Xóa thành công");
                                                } catch (error) {
                                                    console.error(error);
                                                }
                                            }
                                        }}
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
                                        href={`transactionPoint/${element.id}`}
                                    >
                                        DETAIL
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionList;
