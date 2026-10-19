import React, { useEffect, useState } from 'react'
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow} from '../ui/table'
import {Popover,PopoverContent,PopoverTrigger} from '../ui/popover'
import {Eye,MoreHorizontal,BriefcaseBusiness,CalendarDays,FileSearch,Trash2,Loader2} from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from "sonner";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setAllAdminJobs } from "@/redux/jobSlice";

const AdminJobsTable = () => {
    const navigate = useNavigate()

    const [deletingJobId, setDeletingJobId] = useState(null);

    const { allAdminJobs, searchJobByText } = useSelector((state) => state.job)

    const dispatch = useDispatch();

    const handleDeleteJob = async (jobId) => {
        try {
            setDeletingJobId(jobId);
            const res = await axios.delete(
             `${JOB_API_END_POINT}/delete/${jobId}`,
                { withCredentials: true }
            );

            if (res.data.success) {
                const updatedJobs = allAdminJobs.filter(
                    (job) => job._id !== jobId
                );

                dispatch(setAllAdminJobs(updatedJobs));
                toast.success(res.data.message);
            }

            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to delete job")
            } finally {
                setDeletingJobId(null)
            }
        };
    }
    const [filterJobs, setFilterJobs] = useState(allAdminJobs || [])

    useEffect(() => {
        const jobs = (allAdminJobs || []).filter((job) => {
            if (!searchJobByText?.trim()) return true

            const search = searchJobByText.toLowerCase().trim()

            return (
                job?.company?.name?.toLowerCase().includes(search) ||
                job?.title?.toLowerCase().includes(search)
            )
        })

        setFilterJobs(jobs)
    }, [allAdminJobs, searchJobByText])

    const formatDate = (date) => {
        if (!date) return '—'

        const parsedDate = new Date(date)

        if (Number.isNaN(parsedDate.getTime())) return '—'

        return parsedDate.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
    }

    return (
        <div className="w-full">
            <Table>
                <TableCaption className="py-4 text-sm text-gray-500">
                    Showing {filterJobs.length} of {(allAdminJobs || []).length} job postings
                </TableCaption>

                <TableHeader>
                    <TableRow className="border-gray-100 bg-gray-50/80 hover:bg-gray-50/80">
                        <TableHead className="h-12 pl-5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Company
                        </TableHead>
                        <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Job Role
                        </TableHead>
                        <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Posted Date
                        </TableHead>
                        <TableHead className="h-12 pr-5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterJobs.length > 0 ? (
                        filterJobs.map((job) => (
                            <TableRow
                                key={job._id}
                                className="border-gray-100 transition-colors hover:bg-purple-50/40"
                            >
                                <TableCell className="py-4 pl-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white">
                                            {job?.company?.logo ? (
                                                <img
                                                    src={job.company.logo}
                                                    alt={`${job?.company?.name || 'Company'} logo`}
                                                    className="h-full w-full object-contain p-1"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none'
                                                    }}
                                                />
                                            ) : (
                                                <BriefcaseBusiness className="h-5 w-5 text-purple-600" />
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="max-w-[200px] truncate font-semibold text-gray-900">
                                                {job?.company?.name || 'Unknown Company'}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Company
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell className="py-4">
                                    <div className="flex items-center gap-2">
                                        <BriefcaseBusiness className="h-4 w-4 shrink-0 text-gray-400" />
                                        <span className="font-medium text-gray-700">
                                            {job?.title || 'Untitled Role'}
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell className="py-4">
                                    <div className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-600">
                                        <CalendarDays className="h-4 w-4 text-gray-400" />
                                        {formatDate(job?.createdAt)}
                                    </div>
                                </TableCell>

                                <TableCell className="py-4 pr-5 text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button
                                                type="button"
                                                aria-label={`Actions for ${job?.title || 'job'}`}
                                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-gray-500 transition hover:border-gray-200 hover:bg-white hover:text-purple-700"
                                            >
                                                <MoreHorizontal className="h-5 w-5" />
                                            </button>
                                        </PopoverTrigger>

                                        <PopoverContent align="end" className="w-44 rounded-xl p-2">
                                            <button
                                                type="button"
                                                disabled={deletingJobId === job._id}
                                                onClick={() => handleDeleteJob(job._id)}
                                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                {deletingJobId === job._id ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Deleting...
                                                </>
                                            ) : (
                                                <>
                                                    <Trash2 className="h-4 w-4" />
                                                    Delete Job
                                                </>
                                            )}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    navigate(`/admin/jobs/${job._id}/applicants`)
                                                }
                                                className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-purple-50 hover:text-purple-700"
                                            >
                                                <Eye className="h-4 w-4" />
                                                View Applicants
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="h-52">
                                <div className="flex flex-col items-center justify-center gap-3 text-center">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                        <FileSearch className="h-6 w-6 text-gray-400" />
                                    </div>

                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            No jobs found
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Try another search or create a new job posting.
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
export default AdminJobsTable
