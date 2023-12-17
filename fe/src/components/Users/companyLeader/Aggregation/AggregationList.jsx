import React, {useContext, useEffect, useState} from "react";
import axiosClient from "../../../../axios.js";
import {AggregationContext} from "./AggregationProvider.jsx";
import {useStateContext} from "../../../../contexts/ContextProvider.jsx";

const AggregationList = () => {
    const {list} = useContext(AggregationContext);
    const {setSubmitted} = useContext(AggregationContext);
    const {showToast} = useStateContext();

    if (!list || !list.length) return null;

    return (
        <div>
            <div className="content-wrapper">
                {/* Hiển thị thông báo nếu có */}
                {/*{aggregation_list.length > 0 }*/}

                <h2 className="font_size">All AggregationPoint</h2>
                <table className="center">
                    <tbody>
                    <tr className="title">
                        <td>Name</td>
                        <td>Code</td>
                        <td>Phone</td>
                        <td>Address</td>
                        <td>DELETE</td>
                        <td>DETAIL</td>
                    </tr>
                    </tbody>

                    {/* Sử dụng dữ liệu từ state để render danh sách sản phẩm */}
                    {list.map(element => (
                        <tr key={element.id}>
                            <td>{element.name}</td>
                            <td>{element.code}</td>
                            <td>{element.phone}</td>
                            <td>{element.address.province}, {element.address.district}, {element.address.ward}, {element.address.detailed_address} </td>
                            <td>
                                <form
                                    method="DELETE"
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        const isConfirmed = window.confirm('Bạn có chắc là muốn xóa ?');
                                        if (isConfirmed) {
                                            try {
                                                // Gửi yêu cầu DELETE bằng axios
                                                const response = axiosClient.delete(`aggregationPoint/${element.id}`);
                                                console.log(response);
                                                setSubmitted(true);
                                                showToast("Xóa thanh cong")

                                            } catch (error) {
                                                // Xử lý lỗi nếu cần
                                                console.error(error);
                                            }
                                        }
                                    }}
                                >
                                    <button type="submit" className="btn btn-danger">
                                        DELETE
                                    </button>
                                </form>
                            </td>
                            <td>
                                <a className="btn btn-success" href={`aggregationPoint/${element.id}`}>DETAIL</a>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
};

export default AggregationList;
