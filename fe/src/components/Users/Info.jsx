import { useState } from "react";
import axiosClient from "../../axios.js";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import Footer from "../Common/Footer.jsx";

export default function Login() {
    const { setCurrentUser, setUserToken } = useStateContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ __html: "" });

    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });

        axiosClient
            .post("/login", {
                email,
                password,
            })
            .then(({ data }) => {
                setCurrentUser(data.user);
                setUserToken(data.token);
            })
            .catch((error) => {
                if (error.response) {
                    const finalErrors = Object.values(
                        error.response.data.errors
                    ).reduce((accum, next) => [...accum, ...next], []);
                    setError({ __html: finalErrors.join("<br>") });
                }
                console.error(error);
            });
    };

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
                <div className="w-full max-w-md p-8 bg-blue-200 rounded shadow-md">
                    <div className="text-center">
                        <img
                            src="/img/logo.png"
                            alt="Your Company"
                            className="mx-auto mb-4 w-32 h-20"
                        />
                        <h2 className="text-3xl font-bold text-gray-900">
                            BTL Lập trình web

                        </h2>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Lê Anh Đức

                        </h2>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Lê Hải Nam

                        </h2>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Nguyễn Quang Thành

                        </h2>
                    </div>


                </div>

            </div>
            <Footer/>
        </>
    );

}
