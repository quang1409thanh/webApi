import React, {useContext, useEffect, useState} from "react";
import axiosClient from "../../../../axios.js";
import {CompanyLeaderContext} from "../CompanyLeaderProvider.jsx";
import {useStateContext} from "../../../../contexts/ContextProvider.jsx";

const AddUserForm = () => {
    const {submitted, setSubmitted} = useContext(CompanyLeaderContext);
    const {userType} = useContext(CompanyLeaderContext);
    const {showToast} = useStateContext();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        ...(userType === "aggregationHead"
            ? {aggregation_point_id: ""}
            : {transaction_point_id: ""}),
        phone: "",
        address: "",
        details: "",
    });
    const getTitleText = () => {
        if (userType === "aggregationHead") {
            return "Thuộc điểm tập kết\n (AggregationEmployee)";
        } else if (userType === "transactionHead") {
            return "Thuộc điểm giao dịch (Transaction)";
        }
        // Add more conditions as needed
        return "Danh sách các Trưởng điểm tập kết";
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let endPoint = "";
        if (userType === "aggregationHead") {
            endPoint = "aggregationHead";
        } else if (userType === "transactionHead") {
            endPoint = "transactionHead";
        } else {
            console.log("usertype no approve");
        }

        // Gửi dữ liệu đến API backend
        axiosClient
            .post(endPoint, formData)
            .then((response) => {
                // Xử lý response nếu cần
                setSubmitted(true);
                console.log(response.data);
                showToast("Thêm tài khoản thành công")
            })
            .catch((error) => {
                // Xử lý lỗi nếu cần
                console.error("Error adding user:", error);
            });
    };

    const [aggregation_list, setAggregationList] = useState([]);

    useEffect(() => {
        let endpoint = "";
        if (userType === "aggregationHead") {
            endpoint = "/aggregationPoint";
        } else if (userType === "transactionHead") {
            endpoint = "/transactionPoint";
        }
        axiosClient.get(endpoint).then(({data}) => {
            const dataFieldName =
                userType === "aggregationHead"
                    ? "aggregationPoints"
                    : "transactionPoints";
            setAggregationList(data[dataFieldName]);
            setSubmitted(false);
        });
    }, [userType, submitted]);
    const renderOptions = (array) => {
        return array.map((element) => (
            <option key={element.id} value={element.id}>
                {element.name}
            </option>
        ));
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen mt-20">
            <h1>Thêm tài khoản</h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto p-4 bg-blue-200 rounded shadow-md w-full"
            >
                <div className="mb-4">
                    <label
                        htmlFor="aggregation_point_id"
                        className="block text-sm font-medium text-gray-700"
                    >
                        {getTitleText()}
                    </label>
                    <select
                        id={
                            userType === "aggregationHead"
                                ? "aggregation_point_id"
                                : "transaction_point_id"
                        }
                        name={
                            userType === "aggregationHead"
                                ? "aggregation_point_id"
                                : "transaction_point_id"
                        }
                        value={
                            userType === "aggregationHead"
                                ? formData.aggregation_point_id
                                : formData.transaction_point_id
                        }
                        onChange={handleChange}
                        className="w-full py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
                        style={{width: "100%"}}
                        required
                    >
                        <option disabled value="">
                            {getTitleText()}
                        </option>
                        {renderOptions(aggregation_list)}
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

export default AddUserForm;
