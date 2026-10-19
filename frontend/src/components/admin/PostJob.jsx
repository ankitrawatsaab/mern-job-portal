import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Loader2 } from 'lucide-react';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );

    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...input,
        experience: Number(input.experience),
        position: Number(input.position),
        requirements:
          typeof input.requirements === 'string'
            ? input.requirements.split(',').map((skill) => skill.trim()).filter(Boolean)
            : input.requirements,
      };

      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/jobs');
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || 'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'h-9 my-1 focus-visible:ring-1 focus-visible:ring-purple-500';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex w-full justify-center px-4 py-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="mb-3">
            <h1 className="text-lg font-bold text-gray-900">
              Post a New Job
            </h1>
            <p className="text-xs text-gray-500">
              Add job details to find the right candidate.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-3 gap-y-2 sm:grid-cols-2">
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                placeholder="e.g. React Developer"
                value={input.title}
                onChange={changeEventHandler}
                className={inputClass}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                name="description"
                placeholder="Brief job description"
                value={input.description}
                onChange={changeEventHandler}
                className={inputClass}
                required
              />
            </div>

            <div>
              <Label htmlFor="requirements">
                Skills (comma-separated)
              </Label>
              <Input
                id="requirements"
                type="text"
                name="requirements"
                placeholder="React, Node.js, MongoDB"
                value={input.requirements}
                onChange={changeEventHandler}
                className={inputClass}
                required
              />
            </div>

            <div>
              <Label htmlFor="salary">Salary (LPA)</Label>
              <Input
                id="salary"
                type="text"
                name="salary"
                placeholder="e.g. 3-5 LPA"
                value={input.salary}
                onChange={changeEventHandler}
                className={inputClass}
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                name="location"
                placeholder="e.g. Noida, Delhi"
                value={input.location}
                onChange={changeEventHandler}
                className={inputClass}
                required
              />
            </div>

            <div>
              <Label htmlFor="jobType">Job Type</Label>
              <Input
                id="jobType"
                type="text"
                name="jobType"
                placeholder="e.g. Full-time, Internship"
                value={input.jobType}
                onChange={changeEventHandler}
                className={inputClass}
                required
              />
            </div>

            <div>
              <Label htmlFor="experience">
                Experience Level (Years)
              </Label>
              <Input
                id="experience"
                type="number"
                min="0"
                step="1"
                name="experience"
                placeholder="e.g. 0, 1, 2, 3"
                value={input.experience}
                onChange={changeEventHandler}
                className={inputClass}
                required
              />
            </div>

            <div>
              <Label htmlFor="position">Number of Positions</Label>
              <Input
                id="position"
                type="number"
                min="1"
                step="1"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className={inputClass}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <Label>Company</Label>

              {companies?.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="mt-1 h-9 w-full">
                    <SelectValue placeholder="Select a company" />
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
                <p className="mt-1 text-xs text-red-600">
                  Please register a company before posting a job.
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || !companies?.length}
            className="mt-4 h-10 w-full bg-purple-600 text-white hover:bg-purple-700"
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
        </form>
      </div>
    </div>
  );
};

export default PostJob;