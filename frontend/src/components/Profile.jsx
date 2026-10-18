
import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, FileText, ArrowUpRight, Sparkles } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Footer from "./shared/Footer";

const Profile = () => {
    useGetAppliedJobs();

    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

    const isResume = !!user?.profile?.resume;
    const skills = user?.profile?.skills || [];
    const initials = user?.fullname
        ?.split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">
                        CareerVerse / Account
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                        My Profile
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Manage your professional identity and track your applications.
                    </p>
                </div>

                <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-400" />

                    <div className="p-5 sm:p-8 lg:p-10">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 min-w-0">
                                <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-violet-100 ring-2 ring-violet-500 shadow-md shrink-0">
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto}
                                        alt={user?.fullname || "Profile"}
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="bg-violet-100 text-violet-700 text-2xl font-bold">
                                        {initials || "U"}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="text-center sm:text-left min-w-0 sm:pt-2">
                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 break-words">
                                            {user?.fullname || "Your Name"}
                                        </h2>
                                        <Sparkles size={18} className="text-violet-500" />
                                    </div>
                                    <p className="text-slate-600 mt-2 leading-relaxed break-words">
                                        {user?.profile?.bio || "Add a bio to introduce yourself professionally."}
                                    </p>
                                    <p className="text-sm text-slate-400 mt-3">
                                        Your professional profile
                                    </p>
                                </div>
                            </div>

                            <Button
                                onClick={() => setOpen(true)}
                                variant="outline"
                                aria-label="Edit Profile"
                                className="rounded-xl border-violet-200 text-violet-700 hover:bg-violet-50 hover:text-violet-800 self-center sm:self-start shrink-0"
                            >
                                <Pen size={16} className="mr-2" />
                                Edit Profile
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 min-w-0">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-100 text-violet-700 shrink-0">
                                    <Mail size={19} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-slate-500 font-medium">Email address</p>
                                    <p className="text-sm sm:text-base text-slate-800 break-all mt-1">
                                        {user?.email || "Not provided"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 min-w-0">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-100 text-violet-700 shrink-0">
                                    <Contact size={19} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-slate-500 font-medium">Phone number</p>
                                    <p className="text-sm sm:text-base text-slate-800 break-words mt-1">
                                        {user?.phoneNumber || "Not provided"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-9">
                            <div className="flex items-center justify-between gap-3 mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Skills & Expertise</h3>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Your professional skill set
                                    </p>
                                </div>
                                <span className="text-xs font-semibold text-violet-700 bg-violet-50 rounded-full px-3 py-1">
                                    {skills.length} {skills.length === 1 ? "skill" : "skills"}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {skills.length > 0 ? (
                                    skills.map((item, index) => (
                                        <Badge
                                            key={`${item}-${index}`}
                                            className="rounded-lg border border-violet-100 bg-violet-50 text-violet-700 hover:bg-violet-100 px-3 py-1.5 font-medium"
                                        >
                                            {item}
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 w-full">
                                        No skills added yet. Edit your profile to add your skills.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-9">
                            <Label className="text-lg font-bold text-slate-900">
                                Resume
                            </Label>

                            <div className="mt-3">
                                {isResume ? (
                                    <a
                                        href={user?.profile?.resume}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 hover:border-violet-300 hover:bg-violet-50/50 transition-colors"
                                    >
                                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-violet-100 text-violet-700 shrink-0">
                                            <FileText size={23} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-slate-800 break-words">
                                                {user?.profile?.resumeOriginalName || "View your resume"}
                                            </p>
                                            <p className="text-sm text-slate-500 mt-1">
                                                Open uploaded document
                                            </p>
                                        </div>

                                        <ArrowUpRight
                                            size={19}
                                            className="text-slate-400 group-hover:text-violet-600 shrink-0"
                                        />
                                    </a>
                                ) : (
                                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
                                        <div className="flex items-center gap-3">
                                            <FileText className="text-slate-400 shrink-0" size={24} />
                                            <div>
                                                <p className="font-semibold text-slate-700">
                                                    No resume uploaded
                                                </p>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    Use Edit Profile to add your resume.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-7 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                    <div className="p-5 sm:p-7 border-b border-slate-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                                    Applied Jobs
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    Keep track of your job applications and their status.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 sm:p-6 overflow-x-auto">
                        <AppliedJobTable />
                    </div>
                </section>
            </main>

            <UpdateProfileDialog
                open={open}
                setOpen={setOpen}
            />

            <Footer />
        </div>
    );
};

export default Profile;
