import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios.js";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import "./Login.css";
import "../../index.css";

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
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
            <div className="w-full max-w-md p-8 bg-blue-200 rounded shadow-md">
                <div className="text-center">
                    <img
                        src="/img/logo.png"
                        alt="Your Company"
                        className="mx-auto mb-4 w-32 h-20"
                    />
                    <h2 className="text-3xl font-bold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                {error.__html && (
                    <div
                        className="bg-red-500 rounded py-2 px-3 text-white mt-4"
                        dangerouslySetInnerHTML={error}
                    ></div>
                )}

                <form
                    onSubmit={onSubmit}
                    className="mt-6 space-y-6"
                    action="#"
                    method="POST"
                >
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="email-address"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(ev) => setEmail(ev.target.value)}
                                className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-indigo-500"
                                placeholder="Your email address"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                                className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-indigo-500"
                                placeholder="Your password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-1 text-sm text-gray-700 mb-1"
                            >
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <Link
                                to="#"
                                className="text-indigo-600 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex items-center justify-center w-full py-2 px-4 border border-blue-500 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            <LockClosedIcon
                                className="h-5 w-5 mr-2 self-center"
                                aria-hidden="true"
                            />
                            <span className="flex-grow text-xl text-center mr-7">
                                Sign in
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
