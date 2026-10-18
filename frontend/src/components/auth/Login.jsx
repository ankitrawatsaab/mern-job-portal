
import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import {
    Loader2,
    Mail,
    LockKeyhole,
    GraduationCap,
    Building2,
    BriefcaseBusiness,
    ArrowRight,
    Sparkles,
} from "lucide-react";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "student",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((store) => store.auth);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.role) {
            toast.error("Please select your account role.");
            return;
        }

        dispatch(setLoading(true));

        try {
            const res = await axios.post(
                `${USER_API_END_POINT}/login`,
                input,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message || "Login successful!");
                navigate("/");
            } else {
                toast.error(res.data.message || "Unable to login.");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error(
                error.response?.data?.message ||
                "Login failed. Please check your details and try again."
            );
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
                <div className="pointer-events-none absolute -top-24 left-[-5rem] h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 right-[-4rem] h-80 w-80 rounded-full bg-fuchsia-200/30 blur-3xl" />

                <div className="relative w-full max-w-md">
                    <div className="mb-7 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200">
                            <BriefcaseBusiness size={27} />
                        </div>

                        <p className="mb-2 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                            <Sparkles size={14} />
                            CareerVerse
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Welcome back!
                        </h1>

                        <p className="mt-2 text-sm text-slate-500 sm:text-base">
                            Login to continue your career journey.
                        </p>
                    </div>

                    <form
                        onSubmit={submitHandler}
                        className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-8"
                    >
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Email address
                                </Label>

                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        placeholder="Enter your email"
                                        className="h-12 rounded-xl border-slate-200 pl-11 focus-visible:ring-violet-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Password
                                </Label>

                                <div className="relative">
                                    <LockKeyhole
                                        size={18}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={input.password}
                                        onChange={changeEventHandler}
                                        placeholder="Enter your password"
                                        className="h-12 rounded-xl border-slate-200 pl-11 focus-visible:ring-violet-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-7">
                            <Label className="text-sm font-semibold text-slate-700">
                                Continue as
                            </Label>

                            <div className="mt-3 grid grid-cols-2 gap-3">
                                <label
                                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-all ${
                                        input.role === "student"
                                            ? "border-violet-500 bg-violet-50 ring-1 ring-violet-500"
                                            : "border-slate-200 hover:border-violet-200 hover:bg-slate-50"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === "student"}
                                        onChange={changeEventHandler}
                                        className="sr-only"
                                    />
                                    <GraduationCap
                                        size={21}
                                        className={
                                            input.role === "student"
                                                ? "text-violet-700"
                                                : "text-slate-500"
                                        }
                                    />
                                    <span className="text-sm font-semibold text-slate-800">
                                        Student
                                    </span>
                                </label>

                                <label
                                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-all ${
                                        input.role === "recruiter"
                                            ? "border-violet-500 bg-violet-50 ring-1 ring-violet-500"
                                            : "border-slate-200 hover:border-violet-200 hover:bg-slate-50"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === "recruiter"}
                                        onChange={changeEventHandler}
                                        className="sr-only"
                                    />
                                    <Building2
                                        size={21}
                                        className={
                                            input.role === "recruiter"
                                                ? "text-violet-700"
                                                : "text-slate-500"
                                        }
                                    />
                                    <span className="text-sm font-semibold text-slate-800">
                                        Recruiter
                                    </span>
                                </label>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="mt-7 h-12 w-full rounded-xl bg-violet-600 font-semibold text-white shadow-md shadow-violet-200 transition-all hover:bg-violet-700 hover:shadow-lg disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    Login
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>

                        <p className="mt-6 text-center text-sm text-slate-500">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-semibold text-violet-700 transition-colors hover:text-violet-900 hover:underline"
                            >
                                Create account
                            </Link>
                        </p>
                    </form>

                    <p className="mt-5 text-center text-xs text-slate-400">
                        Your next opportunity starts here.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Login;
