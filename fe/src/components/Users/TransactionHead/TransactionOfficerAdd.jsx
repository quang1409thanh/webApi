import React, {useContext, useEffect, useState} from "react";
import axiosClient from "../../../axios.js";
import {TransactionHeadContext} from "./TransactionHeadProvider.jsx";
import {useStateContext} from "../../../contexts/ContextProvider.jsx";

const AggregationEmployeeAdd = () => {
    const {showToast} = useStateContext();

    const {data} = useContext(TransactionHeadContext);
    const id = data?.transaction_point_head?.transaction_point_id || "";
    console.log("id ne:" + id); // In giá trị để kiểm tra
    const {setSubmitted} = useContext(TransactionHeadContext);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        position: "truong",
        phone: "",
        address: "",
        details: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosClient
            .post("/transactionOfficer", {
                ...formData,
                transaction_point_id: id,
            })
            .then((response) => {
                showToast("Đã thêm tài khoản thành công!")
                setSubmitted(true);
                console.log(response.data);
            })
            .catch((error) => {
                // Xử lý lỗi nếu cần
                console.error("Error adding user:", error);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 mt-10">
            <h1>Thêm tài khoản</h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto p-4 bg-blue-200 rounded shadow-md w-full"
            >
                {/* Các trường nhập dữ liệu */}
                {/*<div className="mb-4">*/}
                {/*    <label htmlFor="aggregation_point_id"*/}
                {/*           className="block text-sm font-medium text-gray-700">"them tai khoan"</label>*/}
                {/*    <select*/}
                {/*        id='transaction_point_id'*/}
                {/*        name='transaction_point_id'*/}
                {/*        value={formData.transaction_point_id}*/}
                {/*        onChange={handleChange}*/}
                {/*        className="w-full py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"*/}
                {/*        style={{width: '100%'}}*/}
                {/*        required*/}
                {/*    >*/}
                {/*        <option disabled value="">*/}
                {/*            thêm nhân viên giao dịch*/}
                {/*        </option>*/}
                {/*        {renderOptions(transaction)}*/}
                {/*    </select>*/}
                {/*</div>*/}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="password_confirmation"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className="w-full py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Phone
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="details"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Details
                    </label>
                    <textarea
                        id="details"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        rows="4"
                        className="w-full py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
                        required
                    ></textarea>
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-500 rounded-md focus:bg-blue-700 focus:outline-none"
                    >
                        Add User
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AggregationEmployeeAdd;
