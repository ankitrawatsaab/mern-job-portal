
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import {
  MapPin,
  BriefcaseBusiness,
  Wallet,
  CalendarDays,
  Users,
  Clock3,
  Building2,
  CheckCircle2,
  ArrowUpRight,
  Loader2,
  FileText,
} from "lucide-react";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [fetching, setFetching] = useState(true);

  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJob = async () => {
      setFetching(true);

      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          const job = res.data.job;
          dispatch(setSingleJob(job));

          setIsApplied(
            job.applications?.some(
              (application) =>
                application.applicant === user?._id ||
                application.applicant?._id === user?._id
            ) || false
          );
        }
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Unable to load job details."
        );
      } finally {
        setFetching(false);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const applyJobHandler = async () => {
    if (!user) {
      toast.error("Please log in to apply for this job.");
      return;
    }

    if (user.role === "recruiter") {
      toast.error("Recruiters cannot apply for jobs.");
      return;
    }

    if (isApplied || applying) return;

    setApplying(true);

    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);

        if (singleJob) {
          const updatedSingleJob = {
            ...singleJob,
            applications: [
              ...(singleJob.applications || []),
              { applicant: user?._id },
            ],
          };

          dispatch(setSingleJob(updatedSingleJob));
        }

        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Unable to apply. Please try again."
      );
    } finally {
      setApplying(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "Not available";

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const job = singleJob;

  const detailItems = [
    {
      label: "Job Type",
      value: job?.jobType || "Not specified",
      icon: BriefcaseBusiness,
    },
    {
      label: "Experience",
      value:
        job?.experienceLevel != null
          ? `${job.experienceLevel} years`
          : "Not specified",
      icon: Clock3,
    },
    {
      label: "Salary",
      value: job?.salary != null ? `${job.salary} LPA` : "Not disclosed",
      icon: Wallet,
    },
    {
      label: "Applicants",
      value: job?.applications?.length ?? 0,
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {fetching ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-9 w-9 animate-spin text-violet-700" />
            <p className="text-sm text-slate-500">Loading job details...</p>
          </div>
        </div>
      ) : !job ? (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <BriefcaseBusiness className="mb-4 h-12 w-12 text-violet-300" />
          <h1 className="text-xl font-bold text-slate-900">
            Job not found
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            This job may have been removed or is no longer available.
          </p>
        </div>
      ) : (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
          {/* Job heading */}
          <section className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm">
            <div className="h-2 bg-gradient-to-r from-violet-700 via-purple-500 to-indigo-500" />

            <div className="flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 sm:h-16 sm:w-16">
                  <Building2 size={30} />
                </div>

                <div className="min-w-0">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {job.title || "Job Opportunity"}
                  </h1>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <MapPin size={16} className="text-violet-600" />
                    <span>{job.location || "Location not specified"}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge className="border border-violet-100 bg-violet-50 text-violet-700 hover:bg-violet-50">
                      {job.jobType || "Job"}
                    </Badge>

                    {job.salary != null && (
                      <Badge className="border border-emerald-100 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                        {job.salary} LPA
                      </Badge>
                    )}

                    {job.experienceLevel != null && (
                      <Badge variant="outline" className="text-slate-600">
                        {job.experienceLevel} years experience
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto md:min-w-44">
                <Button
                  onClick={applyJobHandler}
                  disabled={isApplied || applying || user?.role === "recruiter"}
                  className="h-12 w-full rounded-xl bg-violet-700 px-7 font-semibold text-white shadow-md shadow-violet-200 hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
                >
                  {applying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Applying...
                    </>
                  ) : isApplied ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Already Applied
                    </>
                  ) : user?.role === "recruiter" ? (
                    "Recruiter Account"
                  ) : (
                    <>
                      Apply Now
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="mt-2 text-center text-xs text-slate-400">
                  {isApplied
                    ? "Your application has been submitted"
                    : "Take the next step in your career"}
                </p>
              </div>
            </div>
          </section>

          {/* Main content */}
          <div className="mt-7 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            {/* Description */}
            <section className="space-y-6 lg:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-violet-100 p-2.5 text-violet-700">
                    <FileText size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Job Description
                    </h2>
                    <p className="text-sm text-slate-500">
                      About this opportunity
                    </p>
                  </div>
                </div>

                <div className="whitespace-pre-line break-words text-sm leading-7 text-slate-600 sm:text-base">
                  {job.description || "No job description has been provided."}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="mb-5 text-lg font-bold text-slate-900">
                  Job Overview
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {detailItems.map(({ label, value, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4"
                    >
                      <div className="rounded-xl bg-white p-3 text-violet-700 shadow-sm">
                        <Icon size={21} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500">
                          {label}
                        </p>
                        <p className="mt-1 break-words text-sm font-semibold text-slate-900">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Sidebar */}
            <aside className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">
                  Job Summary
                </h2>

                <div className="mt-5 space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin size={19} className="mt-0.5 text-violet-600" />
                    <div>
                      <p className="text-xs text-slate-500">Location</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {job.location || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarDays
                      size={19}
                      className="mt-0.5 text-violet-600"
                    />
                    <div>
                      <p className="text-xs text-slate-500">Posted Date</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {formatDate(job.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BriefcaseBusiness
                      size={19}
                      className="mt-0.5 text-violet-600"
                    />
                    <div>
                      <p className="text-xs text-slate-500">Employment Type</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {job.jobType || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Wallet size={19} className="mt-0.5 text-violet-600" />
                    <div>
                      <p className="text-xs text-slate-500">Annual Salary</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {job.salary != null
                          ? `${job.salary} LPA`
                          : "Not disclosed"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <Button
                    onClick={applyJobHandler}
                    disabled={isApplied || applying || user?.role === "recruiter"}
                    className="h-11 w-full rounded-xl bg-violet-700 font-semibold hover:bg-violet-800"
                  >
                    {applying
                      ? "Applying..."
                      : isApplied
                      ? "Already Applied"
                      : user?.role === "recruiter"
                      ? "Recruiter Account"
                      : "Apply for this Job"}
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-50 p-5">
                <div className="flex items-center gap-2 text-violet-800">
                  <CheckCircle2 size={19} />
                  <h3 className="font-semibold">Ready for your next step?</h3>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Review the job details and apply when you are ready.
                </p>
              </div>
            </aside>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
};

export default JobDescription;
