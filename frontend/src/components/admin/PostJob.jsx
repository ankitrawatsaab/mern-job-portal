import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import {Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue,} from '../ui/select';
import {Loader2,BriefcaseBusiness,Building2,MapPin,IndianRupee,Users,Layers3,FileText,} from 'lucide-react';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const companyArray = [];

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
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector((store) => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
    setInput({...input, companyId:selectedCompany._id});
  };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

  const fieldClass =
    'mt-1.5 h-11 rounded-xl border-gray-200 bg-white shadow-sm transition-colors placeholder:text-gray-400 focus-visible:border-purple-400 focus-visible:ring-2 focus-visible:ring-purple-100';

  const fieldLabelClass =
    'text-sm font-medium text-slate-700';

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <form
          onSubmit={submitHandler}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          {/* Purple gradient top border */}
          <div className="h-2 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-300" />

          {/* Header */}
          <div className="flex items-center gap-4 border-b border-slate-100 px-5 py-5 sm:px-8 sm:py-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <BriefcaseBusiness size={28} strokeWidth={1.8} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Post a New Job
              </h1>
              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                Find the right talent for your team.
              </p>
            </div>
          </div>

          {/* Form fields */}
          <div className="px-5 py-6 sm:px-8 sm:py-7">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">

              {/* Job Title */}
              <div>
                <Label htmlFor="title" className={fieldLabelClass}>
                  Job Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="e.g. React Developer"
                  value={input.title}
                  onChange={changeEventHandler}
                  className={fieldClass}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className={fieldLabelClass}>
                  Description
                </Label>
                <div className="relative">
                  <FileText
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <Input
                    id="description"
                    type="text"
                    name="description"
                    placeholder="What will the candidate do?"
                    value={input.description}
                    onChange={changeEventHandler}
                    className={`${fieldClass} pl-10`}
                    required
                  />
                </div>
              </div>

              {/* Requirements */}
              <div>
                <Label htmlFor="requirements" className={fieldLabelClass}>
                  Required Skills
                </Label>
                <Input
                  id="requirements"
                  type="text"
                  name="requirements"
                  placeholder="React, Node.js, MongoDB"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  className={fieldClass}
                  required
                />
                <p className="mt-1 text-xs text-slate-400">
                  Separate skills with commas.
                </p>
              </div>

              {/* Salary */}
              <div>
                <Label htmlFor="salary" className={fieldLabelClass}>
                  Salary (LPA)
                </Label>
                <div className="relative">
                  <IndianRupee
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <Input
                    id="salary"
                    type="text"
                    name="salary"
                    placeholder="e.g. 3-5 LPA"
                    value={input.salary}
                    onChange={changeEventHandler}
                    className={`${fieldClass} pl-10`}
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location" className={fieldLabelClass}>
                  Location
                </Label>
                <div className="relative">
                  <MapPin
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <Input
                    id="location"
                    type="text"
                    name="location"
                    placeholder="e.g. Gurugram, India"
                    value={input.location}
                    onChange={changeEventHandler}
                    className={`${fieldClass} pl-10`}
                    required
                  />
                </div>
              </div>

              {/* Job Type */}
              <div>
                <Label htmlFor="jobType" className={fieldLabelClass}>
                  Job Type
                </Label>
                <Input
                  id="jobType"
                  type="text"
                  name="jobType"
                  placeholder="Full-time, Internship"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  className={fieldClass}
                  required
                />
              </div>

              {/* Experience */}
              <div>
                <Label htmlFor="experience" className={fieldLabelClass}>
                  Experience Level (Years)
                </Label>
                <div className="relative">
                  <Layers3
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <Input
                    id="experience"
                    type="number"
                    name="experience"
                    min="0"
                    step="1"
                    placeholder="e.g. 0, 1, 2, 3"
                    value={input.experience}
                    onChange={changeEventHandler}
                    className={`${fieldClass} pl-10`}
                    required
                  />
                </div>
              </div>

              {/* Number of positions */}
              <div>
                <Label htmlFor="position" className={fieldLabelClass}>
                  Number of Positions
                </Label>
                <div className="relative">
                  <Users
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <Input
                    id="position"
                    type="number"
                    name="position"
                    min="1"
                    step="1"
                    value={input.position}
                    onChange={changeEventHandler}
                    className={`${fieldClass} pl-10`}
                    required
                  />
                </div>
              </div>

              {/* Company */}
              <div className="md:col-span-2">
                <Label className={fieldLabelClass}>
                  Company
                </Label>

                {companies?.length > 0 ? (
                  <Select
                    value={
                      companies.find(
                        (company) => company._id === input.companyId
                      )?.name?.toLowerCase() || ''
                    }
                    onValueChange={selectChangeHandler}
                  >
                    <SelectTrigger className="mt-1.5 h-11 w-full rounded-xl border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-purple-100">
                      <div className="flex items-center gap-3">
                        <Building2
                          size={17}
                          className="shrink-0 text-slate-400"
                        />
                        <SelectValue placeholder="Select a company" />
                      </div>
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company.name.toLowerCase()}
                          >
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    Please register a company before posting a job.
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-400">
                Make sure your job details are accurate.
              </p>

              <div className="flex w-full gap-3 sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/jobs')}
                  className="h-11 flex-1 rounded-xl border-slate-200 px-5 sm:flex-none"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading || !companies?.length}
                  className="h-11 flex-1 rounded-xl bg-purple-600 px-7 font-semibold text-white shadow-sm transition-colors hover:bg-purple-700 sm:flex-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    'Post New Job'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PostJob;