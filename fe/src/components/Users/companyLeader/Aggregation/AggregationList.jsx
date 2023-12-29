import React, {useContext, useEffect, useState} from "react";
import axiosClient from "../../../../axios.js";
import {useStateContext} from "../../../../contexts/ContextProvider.jsx";
import {CompanyLeaderContext} from "../CompanyLeaderProvider.jsx";

const AggregationList = () => {
    const {submitted, setSubmitted} = useContext(CompanyLeaderContext);
    const [aggregationList, setAggregationList] = useState([]);

    useEffect(() => {
        axiosClient.get('/aggregationPoint')
            .then(({data}) => {
                setAggregationList(data.aggregationPoints);
                setSubmitted(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [submitted]);

    const {showToast} = useStateContext();

    if (!aggregationList || !aggregationList.length) return null;
    const handleSortAscending = () => {
        // Sắp xếp listGood tăng dần và cập nhật state
        const sortedList = [...aggregationList].sort((a, b) => a.name - b.name);
        setAggregationList(sortedList);
    };

    const handleSortDescending = () => {
        // Sắp xếp listGood giảm dần và cập nhật state
        const sortedList = [...aggregationList].sort((a, b) => b.name - a.name);
        setAggregationList(sortedList);
    };


    return (
        <div>
            <div className="content-wrapper">
                {/* Hiển thị thông báo nếu có */}
                {/*{aggregation_list.length > 0 }*/}

                <h2 className="font_size">All AggregationPoint</h2>
                <div className="nav_bar_service centered-container">
                    <input
                        type="button"
                        value="Sắp xếp tăng dần"
                        onClick={handleSortAscending}
                    />
                    <input
                        type="button"
                        value="Sắp xếp giảm dần"
                        onClick={handleSortDescending}
                    />

                </div>

                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Code</th>
                        <th className="py-2 px-4 border-b">Phone</th>
                        <th className="py-2 px-4 border-b">Address</th>
                        <th className="py-2 px-4 border-b">Thuộc về</th>
                        <th className="py-2 px-4 border-b">DELETE</th>
                        <th className="py-2 px-4 border-b">DETAIL</th>
                        <th className="py-2 px-4 border-b">Thống kê</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Sử dụng dữ liệu từ state để render danh sách sản phẩm */}
                    {aggregationList.map((element) => (
                        <tr key={element.id}>
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
                                {element?.aggregation_point_head?.user?.name
                                    ? element.aggregation_point_head.user
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
                                                        `aggregationPoint/${element.id}`
                                                    );
                                                console.log(response);
                                                setSubmitted(true);
                                                showToast("Xóa thành công");
                                            } catch (error) {
                                                // Xử lý lỗi nếu cần
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
                                    href={`aggregationPoint/${element.id}`}
                                >
                                    DETAIL
                                </a>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <a
                                    className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    href={`aggregationPoint/${element.id}`}
                                >
                                    STATS
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

export default AggregationList;
