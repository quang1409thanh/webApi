import React, { useContext, useEffect, useState } from "react";
import axiosClient from "../../../axios.js";
import { AggregationHeadContext } from "./AggregationHeadProvider.jsx";
import { TransactionHeadContext } from "../TransactionHead/TransactionHeadProvider.jsx";

const AggregationEmployeeFormEdit = ({ id }) => {
    const { setSubmitted } = useContext(AggregationHeadContext);
    const { data } = useContext(AggregationHeadContext);
    const aggregation_point_id = data?.aggregation_point_head?.id || "";

    console.log();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        position: "employee",
        phone: "",
        address: "",
        details: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi dữ liệu đến API backend
        axiosClient
            .put(`/aggregationPointEmployee/${id}`, {
                ...formData,
                aggregation_point_id: aggregation_point_id,
            })
            .then((response) => {
                // Xử lý response nếu cần
                setSubmitted(true);
                console.log(response.data);
            })
            .catch((error) => {
                // Xử lý lỗi nếu cần
                console.error("Error adding user:", error);
            });
    };

    useEffect(() => {
        axiosClient
            .get(`aggregationPointEmployee/${id}`)
            .then(({ data }) => {
                if (
                    !data.aggregationPointEmployee ||
                    !data.aggregationPointEmployee.user
                ) {
                    console.error("Invalid API response:", data);
                    return;
                }
                const apiData = data.aggregationPointEmployee;
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    name: apiData.user.name || "",
                    email: apiData.user.email || "",
                    phone: apiData.phone || "",
                    address: apiData.address || "",
                    details: apiData.details || "",
                    aggregation_point_id: apiData.aggregation_point_id || "",
                }));
                console.log(formData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [id]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 mt-2022">
            <h1>Chỉnh sửa tài khoản</h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto mt-10 p-4 bg-blue-200 rounded shadow-md w-full"
            >
                {/* Các trường nhập dữ liệu */}
                {/*<div className="mb-4">*/}
                {/*    <label htmlFor="aggregation_point_id"*/}
                {/*           className="block text-sm font-medium text-gray-700">Thêm tài khỏa nhân viên điểm tập kết</label>*/}
                {/*    <select*/}
                {/*        id={'aggregation_point_id'}*/}
                {/*        name={'aggregation_point_id'}*/}
                {/*        value={formData.aggregation_point_id}*/}
                {/*        onChange={handleChange}*/}
                {/*        className="w-full py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"*/}
                {/*        style={{width: '100%'}}*/}
                {/*        required*/}
                {/*    >*/}
                {/*        <option disabled value="">*/}
                {/*            thêm nhân viên điểm tập kết*/}
                {/*        </option>*/}
                {/*        {renderOptions(aggregation_list)}*/}
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
                        readOnly
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
                        Sửa
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AggregationEmployeeFormEdit;
