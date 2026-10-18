
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, UserRound, Mail, Phone, FileText, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        bio: "",
        skills: "",
        file: null,
    });

    useEffect(() => {
        if (open) {
            setInput({
                fullname: user?.fullname || "",
                email: user?.email || "",
                phoneNumber: user?.phoneNumber || "",
                bio: user?.profile?.bio || "",
                skills: Array.isArray(user?.profile?.skills)
                    ? user.profile.skills.join(", ")
                    : "",
                file: null,
            });
        }
    }, [open, user]);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (file.type !== "application/pdf") {
            toast.error("Please select a PDF resume.");
            e.target.value = "";
            return;
        }

        setInput((prev) => ({ ...prev, file }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (loading) return;

        const formData = new FormData();
        formData.append("fullname", input.fullname.trim());
        formData.append("email", input.email.trim());
        formData.append("phoneNumber", input.phoneNumber.trim());
        formData.append("bio", input.bio.trim());

        // Convert comma-separated skills to the array format expected by many MERN profile APIs.
        const skillsArray = input.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean);

        formData.append("skills", JSON.stringify(skillsArray));

        if (input.file instanceof File) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `${USER_API_END_POINT}/profile/update`,
                formData,
                { withCredentials: true }
            );

            if (res.data?.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message || "Profile updated successfully.");
                setOpen(false);
            } else {
                toast.error(res.data?.message || "Unable to update profile.");
            }
        } catch (error) {
            console.error("Profile update failed:", error);
            toast.error(
                error.response?.data?.message ||
                "Profile update failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[calc(100%-2rem)] sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 p-0">
                <div className="h-1.5 bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-400" />

                <div className="p-5 sm:p-7">
                    <DialogHeader className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-violet-100 text-violet-700">
                                <UserRound size={22} />
                            </div>
                            <div>
                                <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-900">
                                    Update Profile
                                </DialogTitle>
                                <DialogDescription className="text-sm text-slate-500 mt-1">
                                    Keep your professional information up to date.
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <form onSubmit={submitHandler} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="fullname">Full name</Label>
                            <div className="relative">
                                <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                                <Input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="pl-10 h-11 rounded-xl"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="pl-10 h-11 rounded-xl"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">Phone number</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="pl-10 h-11 rounded-xl"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Professional bio</Label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                rows={3}
                                maxLength={300}
                                placeholder="Briefly introduce yourself and your experience..."
                                className="flex w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 resize-y"
                            />
                            <p className="text-xs text-slate-400 text-right">
                                {input.bio.length}/300
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="skills">Skills</Label>
                            <div className="relative">
                                <Sparkles className="absolute left-3 top-3 text-slate-400" size={17} />
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="pl-10 h-11 rounded-xl"
                                    placeholder="React, Node.js, MongoDB"
                                />
                            </div>
                            <p className="text-xs text-slate-500">
                                Separate each skill with a comma.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="file">Resume (PDF)</Label>
                            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                                <div className="flex items-start gap-3 mb-3">
                                    <FileText className="text-violet-600 shrink-0" size={21} />
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-slate-800">
                                            {input.file instanceof File
                                                ? input.file.name
                                                : user?.profile?.resumeOriginalName || "Upload a new resume"}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            PDF format only. Leave empty to keep your current resume.
                                        </p>
                                    </div>
                                </div>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    onChange={fileChangeHandler}
                                    className="rounded-lg bg-white"
                                />
                            </div>
                        </div>

                        <DialogFooter className="pt-2 gap-2 sm:gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="rounded-xl"
                                onClick={() => setOpen(false)}
                                disabled={loading}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                className="rounded-xl bg-violet-600 hover:bg-violet-700"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving changes...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
