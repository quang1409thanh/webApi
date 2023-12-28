import React, { useContext, useEffect, useState } from "react";
import axiosClient from "../../../../axios.js";
import { CompanyLeaderContext } from "../CompanyLeaderProvider.jsx";

const AggregationEditForm = ({ id }) => {
    const { aggregationList } = useContext(CompanyLeaderContext);

    const handleSubmit = (e) => {
        axiosClient
            .put(`/aggregationHead/${id}`, { ...formData })
            .then((response) => {
                console.log("User edited successfully:", response.data);
            })
            .catch((error) => {
                console.error("Error editing user:", error);
                // Handle the error appropriately, e.g., display a message to the user
            });
    };
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        aggregation_point_id: "",
        phone: "",
        address: "",
        details: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        axiosClient
            .get(`aggregationHead/${id}`)
            .then(({ data }) => {
                if (!data || !data.user) {
                    console.error("Invalid API response:", data);
                    return;
                }
                const apiData = data;
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

    const renderOptions = (array) => {
        return array.map((element) => (
            <option key={element.id} value={element.id}>
                {element.name}
            </option>
        ));
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 mt-2022 mt-36 mb-36">
            <hr />
            <br />
            <h1>Trang chỉnh sửa thông tin trưởng điểm tập kết</h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto p-4 bg-blue-200 rounded shadow-md w-full"
            >
                {/* Các trường nhập dữ liệu */}
                <div className="mb-4">
                    <label
                        htmlFor="aggregation_point_id"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Trang Chỉnh Sửa
                    </label>
                    <select
                        id={"aggregation_point_id"}
                        name={"aggregation_point_id"}
                        value={formData.aggregation_point_id}
                        onChange={handleChange}
                        className="w-full py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
                        style={{ width: "100%" }}
                        required
                    >
                        <option disabled value="">
                            Trang chinh sua
                        </option>
                        {renderOptions(aggregationList)}
                    </select>
                </div>
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
                        Edit User
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AggregationEditForm;
