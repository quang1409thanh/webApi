import React, { useState } from "react";
import axiosClient from "../../axios.js";
import { useLocation, useParams } from "react-router-dom";
import Toast from "../Common/Toast.jsx";
import Header from "./Header.jsx";
import Footer from "../Common/Footer.jsx";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

const ResetPassword = () => {
    let { token } = useParams();
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    let query = new URLSearchParams(useLocation().search);
    let email = query.get("email");

    const { showToast } = useStateContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        axiosClient
            .post("/reset-password", {
                token,
                email,
                password,
                password_confirmation: passwordConfirmation,
            })
            .then((response) => {
                // Handle success here
                showToast("Password reset successful!");
            })
            .catch((error) => {
                // Handle error here
                if (error.response && error.response.data) {
                    // If the server returned an error message, show it to the user
                    showToast(error.response.data.message);
                } else {
                    // Otherwise, show a generic error message
                    showToast(
                        "An error occurred while resetting the password."
                    );
                }
            });
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 mt-2022">
                <h1 className="text-2xl font-bold mb-4">
                    Trang đặt lại mật khẩu của bạn
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-md w-full p-4 bg-white rounded shadow-md"
                >
                    <input
                        type="password"
                        placeholder="New password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-4  py-2 rounded-md border border-gray-300 w-full"
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={passwordConfirmation}
                        onChange={(e) =>
                            setPasswordConfirmation(e.target.value)
                        }
                        className="mb-4  py-2 rounded-md border border-gray-300 w-full"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white  py-2 rounded-md w-full"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </>
    );
};

export default ResetPassword;
