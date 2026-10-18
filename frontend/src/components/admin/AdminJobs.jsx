import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import AdminJobTable from './AdminJobsTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Search, Plus, BriefcaseBusiness } from 'lucide-react'

const AdminJobs = () => {
    useGetAllAdminJobs()

    const [input, setInput] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input, dispatch])

    return (
        <div className="min-h-screen bg-gray-50/70">
            <Navbar />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Page Heading */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <BriefcaseBusiness className="h-6 w-6 text-purple-600" />
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Manage Jobs
                            </h1>
                        </div>
                        <p className="text-sm text-gray-500">
                            Create, manage and track your job postings.
                        </p>
                    </div>

                    <Button
                        onClick={() => navigate('/admin/jobs/create')}
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-5 h-11 shadow-sm w-full sm:w-auto"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        New Job
                    </Button>
                </div>

                {/* Jobs Section */}
                <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 sm:p-6 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Recent Job Postings
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Search and manage your posted jobs.
                                </p>
                            </div>

                            <div className="relative w-full sm:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    value={input}
                                    className="pl-9 h-10 w-full rounded-lg border-gray-200 focus-visible:ring-purple-500"
                                    placeholder="Search by company or job title..."
                                    onChange={(e) => setInput(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-3 sm:p-6 overflow-x-auto">
                        <AdminJobTable />
                    </div>

                    <div className="px-4 sm:px-6 py-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                            Manage your recent job postings from one place.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AdminJobs
