import React, { useEffect, useState } from "react";
import axiosClient from "../../axios.js";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

const UserProfile = () => {
    const [profile, setProfile] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const { showToast } = useStateContext();

    useEffect(() => {
        axiosClient
            .get("/me")
            .then(({ data }) => {
                setProfile(data.user);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    const [email, setEmail] = useState("");

    const handleForgotPassword = (event) => {
        event.preventDefault();
        axiosClient
            .post("/forgot-password", { email })
            .then((response) => {
                showToast(response.data.status, "success"); // Show the status message to the user
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    // If the server returned an error message, show it to the user
                    showToast(error.response.data.message, "error");
                } else {
                    // Otherwise, show a generic error message
                    showToast(
                        "An error occurred while sending the password reset email.",
                        "error"
                    );
                }
            });
    };

    const handleChangePassword = (event) => {
        event.preventDefault();

        console.log("Handling password change...");

        axiosClient
            .post("/change-password", {
                new_password: newPassword,
                current_password: currentPassword,
                new_password_confirmation: confirmNewPassword,
            })
            .then((response) => {
                if (response.data.error) {
                    showToast(response.data.error, "error");
                } else showToast(response.data.message, "success");
            })
            .catch((error) => {
                console.error("Error during password change:", error);
                if (error.response && error.response.data) {
                    showToast(error.response.data, "error");
                } else {
                    showToast(
                        "An error occurred while changing the password.",
                        "error"
                    );
                }
            });
    };
    const renderUserProfileInfo = () => {
        switch (profile) {
            case "admin_system":
                return (
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">
                            Admin System Information
                        </h3>
                        <p className="text-lg">
                            <span className="font-bold">ID:</span>{" "}
                            {profile.admin_system.id}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Phone:</span>{" "}
                            {profile.admin_system.phone}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Details:</span>{" "}
                            {profile.admin_system.details}
                        </p>
                        {/* Add other Admin System fields as needed */}
                    </div>
                );

            case "company_leader":
                return (
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">
                            Company Leader Information
                        </h3>
                        <p className="text-lg">
                            <span className="font-bold">ID:</span>{" "}
                            {profile.company_leader.id}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Phone:</span>{" "}
                            {profile.company_leader.phone}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Details:</span>{" "}
                            {profile.company_leader.details}
                        </p>
                        {/* Add other Company Leader fields as needed */}
                    </div>
                );

            case "aggregation_point_employee":
                return (
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">
                            Aggregation Point Employee Information
                        </h3>
                        <p className="text-lg">
                            <span className="font-bold">ID:</span>{" "}
                            {profile.aggregation_point_employee.id}
                        </p>
                        {/* Add other Aggregation Point Employee fields as needed */}
                    </div>
                );

            case "aggregation_point_head":
                return (
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">
                            Aggregation Point Head Information
                        </h3>
                        <p className="text-lg">
                            <span className="font-bold">ID:</span>{" "}
                            {profile.aggregation_point_head.id}
                        </p>
                        {/* Add other Aggregation Point Head fields as needed */}
                    </div>
                );

            case "customer":
                return (
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">
                            Customer Information
                        </h3>
                        <p className="text-lg">
                            <span className="font-bold">ID:</span>{" "}
                            {profile.customer.id}
                        </p>
                        {/* Add other Customer fields as needed */}
                    </div>
                );

            case "transaction_officer":
                return (
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">
                            Transaction Officer Information
                        </h3>
                        <p className="text-lg">
                            <span className="font-bold">ID:</span>{" "}
                            {profile.transaction_officer.id}
                        </p>
                        {/* Add other Transaction Officer fields as needed */}
                    </div>
                );

            case "transaction_point_head":
                return (
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">
                            Transaction Point Head Information
                        </h3>
                        <p className="text-lg">
                            <span className="font-bold">ID:</span>{" "}
                            {profile.transaction_point_head.id}
                        </p>
                        {/* Add other Transaction Point Head fields as needed */}
                    </div>
                );

            case "shipper":
                return (
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">
                            Shipper Information
                        </h3>
                        <p className="text-lg">
                            <span className="font-bold">ID:</span>{" "}
                            {profile.shipper.id}
                        </p>
                        {/* Add other Shipper fields as needed */}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6">User Information</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-1">
                    <p className="text-lg">
                        <span className="font-bold">ID:</span> {profile.id}
                    </p>
                    <p className="text-lg">
                        <span className="font-bold">Name:</span> {profile.name}
                    </p>
                    <p className="text-lg">
                        <span className="font-bold">Email:</span>{" "}
                        {profile.email}
                    </p>
                </div>

                {profile.company_leader && (
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">
                            Company Leader Information
                        </h3>
                        <p className="text-lg">
                            <span className="font-bold">ID:</span>{" "}
                            {profile.company_leader.id}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Phone:</span>{" "}
                            {profile.company_leader.phone}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Details:</span>{" "}
                            {profile.company_leader.details}
                        </p>
                    </div>
                )}

                {profile.admin_system && (
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">
                            Admin System Information
                        </h3>
                        <p className="text-lg">
                            <span className="font-bold">ID:</span>{" "}
                            {profile.admin_system.id}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Phone:</span>{" "}
                            {profile.admin_system.phone}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Details:</span>{" "}
                            {profile.admin_system.details}
                        </p>
                        {/* Add other Admin System fields as needed */}
                    </div>
                )}
                {profile.aggregation_point_head && (
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">
                            Aggregation Point Head Information
                        </h3>
                        <p className="text-lg">
                            <span className="font-bold">ID:</span>{" "}
                            {profile.aggregation_point_head.id}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Phone:</span>{" "}
                            {profile.aggregation_point_head.phone}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Details:</span>{" "}
                            {profile.aggregation_point_head.details}
                        </p>
                        {/* Add other Admin System fields as needed */}
                    </div>
                )}
                {profile.transaction_point_head && (
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">
                            Transaction Point Head Information
                        </h3>
                        <p className="text-lg">
                            <span className="font-bold">ID:</span>{" "}
                            {profile.transaction_point_head.id}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Phone:</span>{" "}
                            {profile.transaction_point_head.phone}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Details:</span>{" "}
                            {profile.transaction_point_head.details}
                        </p>
                        {/* Add other Admin System fields as needed */}
                    </div>
                )}
                {profile.aggregation_point_employee && (
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">
                            Aggregation Employee Information
                        </h3>
                        <p className="text-lg">
                            <span className="font-bold">ID:</span>{" "}
                            {profile.aggregation_point_employee.id}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Phone:</span>{" "}
                            {profile.aggregation_point_employee.phone}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Details:</span>{" "}
                            {profile.aggregation_point_employee.details}
                        </p>
                        {/* Add other Admin System fields as needed */}
                    </div>
                )}
                {profile.transaction_officer && (
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">
                            Transaction Officer Information
                        </h3>
                        <p className="text-lg">
                            <span className="font-bold">ID:</span>{" "}
                            {profile.transaction_officer.id}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Phone:</span>{" "}
                            {profile.transaction_officer.phone}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Details:</span>{" "}
                            {profile.transaction_officer.details}
                        </p>
                        {/* Add other Admin System fields as needed */}
                    </div>
                )}
                {/*Thêm các loại người dùng khác*/}
            </div>

            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Forgot Password</h3>
                <form
                    onSubmit={handleForgotPassword}
                    className="max-w-md mx-auto"
                >
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-green-300"
                    >
                        Send Password Reset Email
                    </button>
                </form>
            </div>

            <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Change Password</h3>
                <form
                    onSubmit={handleChangePassword}
                    className="max-w-md mx-auto"
                >
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Current password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmNewPassword}
                            onChange={(e) =>
                                setConfirmNewPassword(e.target.value)
                            }
                            className="w-full py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Change Password
                    </button>
                </form>
            </div>

            <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">
                    Two-Factor Authentication
                </h3>
                {/* Add your two-factor authentication settings or component here */}
            </div>
        </div>
    );
};

export default UserProfile;
