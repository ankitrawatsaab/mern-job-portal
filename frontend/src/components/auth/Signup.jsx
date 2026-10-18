
import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import {
  Loader2,
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  GraduationCap,
  Building2,
  BriefcaseBusiness,
  Upload,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const changeFileHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      file: e.target.files?.[0] || "",
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
      toast.error("Please select Student or Recruiter.");
      return;
    }

    dispatch(setLoading(true));

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const selectedFileName = input.file?.name;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <Navbar />

      <main className="mx-auto flex min-h-[calc(100vh-70px)] max-w-7xl items-center justify-center px-4 py-10 sm:px-6">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-xl shadow-violet-100/50 lg:grid-cols-2">
          {/* Left section */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 p-10 text-white lg:flex">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-indigo-400/20" />

            <div className="relative z-10">
              <div className="mb-10 flex items-center gap-2">
                <div className="rounded-xl bg-white/15 p-2">
                  <BriefcaseBusiness size={26} />
                </div>
                <span className="text-2xl font-bold tracking-tight">
                  CareerVerse
                </span>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                <Sparkles size={16} />
                Your next chapter starts here
              </span>

              <h1 className="mt-8 text-4xl font-bold leading-tight">
                Build your future.
                <br />
                Find your opportunity.
              </h1>

              <p className="mt-5 max-w-sm leading-7 text-violet-100">
                Create your account to explore opportunities, connect with
                employers, and take the next step in your career.
              </p>
            </div>

            <div className="relative z-10 space-y-4">
              {[
                "Discover opportunities that fit your goals",
                "Connect with companies and recruiters",
                "Take control of your career journey",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="shrink-0 text-violet-200" />
                  <span className="text-sm text-violet-50">{item}</span>
                </div>
              ))}

              <p className="pt-6 text-xs text-violet-200">
                Your journey. Your opportunities. Your future.
              </p>
            </div>
          </div>

          {/* Signup form */}
          <div className="p-6 sm:p-9 lg:p-10">
            <div className="mb-8">
              <div className="mb-4 inline-flex rounded-2xl bg-violet-100 p-3 text-violet-700 lg:hidden">
                <BriefcaseBusiness size={27} />
              </div>

              <p className="mb-2 text-sm font-semibold text-violet-700">
                JOIN CAREERVERSE
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Create Account
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Start your career journey with CareerVerse.
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              {/* Full name */}
              <div className="space-y-2">
                <Label htmlFor="fullname" className="font-medium text-gray-700">
                  Full Name
                </Label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="fullname"
                    type="text"
                    name="fullname"
                    autoComplete="name"
                    value={input.fullname}
                    onChange={changeEventHandler}
                    placeholder="Enter your full name"
                    required
                    className="h-12 rounded-xl border-gray-200 pl-11 transition focus-visible:border-violet-500 focus-visible:ring-violet-200"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium text-gray-700">
                  Email Address
                </Label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    placeholder="Enter your email"
                    required
                    className="h-12 rounded-xl border-gray-200 pl-11 transition focus-visible:border-violet-500 focus-visible:ring-violet-200"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label
                  htmlFor="phoneNumber"
                  className="font-medium text-gray-700"
                >
                  Phone Number
                </Label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    autoComplete="tel"
                    value={input.phoneNumber}
                    onChange={changeEventHandler}
                    placeholder="Enter your phone number"
                    required
                    className="h-12 rounded-xl border-gray-200 pl-11 transition focus-visible:border-violet-500 focus-visible:ring-violet-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="font-medium text-gray-700"
                >
                  Password
                </Label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={input.password}
                    onChange={changeEventHandler}
                    placeholder="Create a password"
                    required
                    className="h-12 rounded-xl border-gray-200 pl-11 transition focus-visible:border-violet-500 focus-visible:ring-violet-200"
                  />
                </div>
              </div>

              {/* Role selection */}
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-gray-700">
                  I want to join as a...
                </legend>

                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      input.role === "student"
                        ? "border-violet-500 bg-violet-50 ring-1 ring-violet-500"
                        : "border-gray-200 hover:border-violet-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={input.role === "student"}
                      onChange={changeEventHandler}
                      className="accent-violet-600"
                    />

                    <GraduationCap
                      size={22}
                      className={
                        input.role === "student"
                          ? "text-violet-700"
                          : "text-gray-500"
                      }
                    />

                    <span className="text-sm font-semibold text-gray-800">
                      Student
                    </span>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      input.role === "recruiter"
                        ? "border-violet-500 bg-violet-50 ring-1 ring-violet-500"
                        : "border-gray-200 hover:border-violet-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={input.role === "recruiter"}
                      onChange={changeEventHandler}
                      className="accent-violet-600"
                    />

                    <Building2
                      size={21}
                      className={
                        input.role === "recruiter"
                          ? "text-violet-700"
                          : "text-gray-500"
                      }
                    />

                    <span className="text-sm font-semibold text-gray-800">
                      Recruiter
                    </span>
                  </label>
                </div>
              </fieldset>

              {/* Profile image */}
              <div className="space-y-2">
                <Label htmlFor="profile" className="font-medium text-gray-700">
                  Profile Picture{" "}
                  <span className="font-normal text-gray-400">(optional)</span>
                </Label>

                <label
                  htmlFor="profile"
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-violet-200 bg-violet-50/50 p-4 transition hover:border-violet-400 hover:bg-violet-50"
                >
                  <div className="rounded-lg bg-white p-2.5 text-violet-700 shadow-sm">
                    <Upload size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-700">
                      {selectedFileName || "Upload your profile picture"}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Choose an image from your device
                    </p>
                  </div>

                  <span className="shrink-0 text-xs font-semibold text-violet-700">
                    Browse
                  </span>
                </label>

                <Input
                  id="profile"
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="sr-only"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="mt-2 h-12 w-full rounded-xl bg-violet-700 text-base font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <Sparkles className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-violet-700 transition hover:text-violet-900 hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
