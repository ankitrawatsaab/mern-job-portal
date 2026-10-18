
import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import {
    Loader2,
    BriefcaseBusiness,
    FileText,
    MapPin,
    IndianRupee,
    Building2,
    Users,
    GraduationCap,
    ClipboardList,
    ArrowLeft,
} from 'lucide-react'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const PostJob = () => {
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: 0,
        companyId: '',
    })

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { companies = [] } = useSelector((store) => store.company)

    const changeEventHandler = (e) => {
        const { name, value } = e.target
        setInput((prev) => ({ ...prev, [name]: value }))
    }

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(
            (company) => company._id === value
        )

        setInput((prev) => ({
            ...prev,
            companyId: selectedCompany?._id || '',
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        if (!input.companyId) {
            toast.error('Please select a company.')
            return
        }

        if (Number(input.position) < 1) {
            toast.error('Number of positions must be at least 1.')
            return
        }

        try {
            setLoading(true)

            const res = await axios.post(
                `${JOB_API_END_POINT}/post`,
                input,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            )

            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/admin/jobs')
            } else {
                toast.error(res.data.message || 'Unable to create job.')
            }
        } catch (error) {
            console.error(error)
            toast.error(
                error.response?.data?.message || 'Something went wrong'
            )
        } finally {
            setLoading(false)
        }
    }

    const fieldClass =
        'mt-2 h-11 rounded-lg border-gray-200 bg-white shadow-sm transition focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-0'

    const fields = [
        {
            name: 'title',
            label: 'Job Title',
            placeholder: 'e.g. MERN Stack Developer',
            icon: BriefcaseBusiness,
            required: true,
        },
        {
            name: 'description',
            label: 'Job Description',
            placeholder: 'Describe the role',
            icon: FileText,
            required: true,
        },
        {
            name: 'requirements',
            label: 'Requirements',
            placeholder: 'Skills and qualifications',
            icon: ClipboardList,
            required: true,
        },
        {
            name: 'salary',
            label: 'Salary',
            placeholder: 'e.g. 4-6 LPA',
            icon: IndianRupee,
            required: true,
        },
        {
            name: 'location',
            label: 'Job Location',
            placeholder: 'e.g. Gurugram, Haryana',
            icon: MapPin,
            required: true,
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50/70">
            <Navbar />

            <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
                <button
                    type="button"
                    onClick={() => navigate('/admin/jobs')}
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-purple-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Jobs
                </button>

                <div className="mb-8">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
                        <BriefcaseBusiness className="h-6 w-6" />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Post a New Job
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        Find the right talent for your team. Fill in the job
                        details below.
                    </p>
                </div>

                <form
                    onSubmit={submitHandler}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                    <div className="border-b border-gray-100 px-5 py-5 sm:px-8">
                        <h2 className="font-semibold text-gray-900">
                            Job Information
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Provide accurate details so candidates know what
                            to expect.
                        </p>
                    </div>

                    <div className="space-y-8 p-5 sm:p-8">
                        <section>
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-purple-700">
                                Basic Details
                            </h3>

                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                                {fields.map((field) => {
                                    const Icon = field.icon

                                    return (
                                        <div
                                            key={field.name}
                                            className={
                                                field.name === 'description' ||
                                                field.name === 'requirements'
                                                    ? 'md:col-span-2'
                                                    : ''
                                            }
                                        >
                                            <Label
                                                htmlFor={field.name}
                                                className="text-sm font-medium text-gray-700"
                                            >
                                                {field.label}
                                            </Label>

                                            <div className="relative">
                                                <Icon className="pointer-events-none absolute left-3 top-[22px] h-4 w-4 -translate-y-1/2 text-gray-400" />

                                                <Input
                                                    id={field.name}
                                                    type="text"
                                                    name={field.name}
                                                    value={input[field.name]}
                                                    onChange={changeEventHandler}
                                                    placeholder={field.placeholder}
                                                    required={field.required}
                                                    className={`${fieldClass} pl-10`}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>

                        <section>
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-purple-700">
                                Employment Details
                            </h3>

                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="experienceLevel">Experience Level</Label>

                                    <Select
                                    value={input.experienceLevel}
                                    onValueChange={(value) =>
                                        setInput({ ...input, experienceLevel: Number(value) })
                                    }
                                    >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select experience level" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="0">Fresher</SelectItem>
                                        <SelectItem value="1">1 Year</SelectItem>
                                        <SelectItem value="2">2 Years</SelectItem>
                                        <SelectItem value="3">3 Years</SelectItem>
                                        <SelectItem value="4">4 Years</SelectItem>
                                        <SelectItem value="5">5 Years</SelectItem>
                                    </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="experience">
                                        Experience Level
                                    </Label>
                                    <Select
                                        value={input.experience}
                                        onValueChange={(value) =>
                                            setInput((prev) => ({
                                                ...prev,
                                                experience: value,
                                            }))
                                        }
                                        required
                                    >
                                        <SelectTrigger className={fieldClass}>
                                            <SelectValue placeholder="Select experience level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="Fresher">
                                                    Fresher
                                                </SelectItem>
                                                <SelectItem value="Entry Level">
                                                    Entry Level
                                                </SelectItem>
                                                <SelectItem value="1-3 Years">
                                                    1–3 Years
                                                </SelectItem>
                                                <SelectItem value="3-5 Years">
                                                    3–5 Years
                                                </SelectItem>
                                                <SelectItem value="5+ Years">
                                                    5+ Years
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="salary">
                                        {/* Salary field is above; this space is intentionally not duplicated. */}
                                    </Label>
                                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Users className="h-4 w-4 text-gray-400" />
                                        Number of Positions
                                    </div>
                                    <Input
                                        id="position"
                                        type="number"
                                        name="position"
                                        min="1"
                                        value={input.position}
                                        onChange={changeEventHandler}
                                        className={fieldClass}
                                        required
                                    />
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-purple-700">
                                Company
                            </h3>

                            {companies.length > 0 ? (
                                <div className="max-w-md">
                                    <Label htmlFor="company">
                                        Select Company
                                    </Label>

                                    <Select
                                        value={input.companyId}
                                        onValueChange={selectChangeHandler}
                                        required
                                    >
                                        <SelectTrigger
                                            id="company"
                                            className={fieldClass}
                                        >
                                            <SelectValue placeholder="Choose a company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem
                                                        key={company._id}
                                                        value={company._id}
                                                    >
                                                        {company.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            ) : (
                                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                                    <div className="flex items-start gap-3">
                                        <Building2 className="mt-0.5 h-5 w-5 text-amber-700" />
                                        <div>
                                            <p className="text-sm font-semibold text-amber-900">
                                                No company registered
                                            </p>
                                            <p className="mt-1 text-sm text-amber-800">
                                                Register a company before
                                                posting a job.
                                            </p>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    navigate('/admin/companies/create')
                                                }
                                                className="mt-3 border-amber-300 bg-white hover:bg-amber-100"
                                            >
                                                Register Company
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 px-5 py-5 sm:flex-row sm:justify-end sm:px-8">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate('/admin/jobs')}
                            className="h-11 rounded-lg border-gray-200 px-6"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={loading || companies.length === 0}
                            className="h-11 rounded-lg bg-purple-600 px-7 font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Posting Job...
                                </>
                            ) : (
                                <>
                                    <GraduationCap className="mr-2 h-4 w-4" />
                                    Post New Job
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default PostJob
