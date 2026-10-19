import React from 'react';
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from '../ui/table';
import {Popover,PopoverContent,PopoverTrigger,} from '../ui/popover';
import {MoreHorizontal,Users,BriefcaseBusiness,FileText,Mail,Phone,CalendarDays,CheckCircle2,XCircle,ExternalLink} from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Something went wrong'
      );
    }
  };

  const applications = applicants?.applications || [];

  const getInitials = (name = '') =>
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');

  const formatDate = (date) => {
    if (!date) return '—';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return '—';

    return parsedDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-[calc(100vh-90px)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <BriefcaseBusiness size={16} />
              <span>Recruiter Dashboard</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Applicants
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review candidate details and manage applications.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-xl border border-purple-100 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Users size={21} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Total Applicants
              </p>
              <p className="text-xl font-bold text-slate-900">
                {applications.length}
              </p>
            </div>
          </div>
        </div>

        {/* Applicants card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Gradient border */}
          <div className="h-1.5 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-300" />

          {/* Card header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                All Applications
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Recent candidates who applied for your jobs.
              </p>
            </div>

            <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-purple-700">
              {applications.length} {applications.length === 1 ? 'Applicant' : 'Applicants'}
            </span>
          </div>

          {/* Table */}
          {applications.length > 0 ? (
            <div className="w-full overflow-x-auto">
              <Table>
                <TableCaption className="pb-4">
                  A list of your recent applicants.
                </TableCaption>

                <TableHeader>
                  <TableRow className="border-b border-slate-100 bg-slate-50 hover:bg-slate-50">
                    <TableHead className="whitespace-nowrap px-5 py-4 font-semibold text-slate-600">
                      Candidate
                    </TableHead>
                    <TableHead className="whitespace-nowrap font-semibold text-slate-600">
                      Email
                    </TableHead>
                    <TableHead className="whitespace-nowrap font-semibold text-slate-600">
                      Contact
                    </TableHead>
                    <TableHead className="whitespace-nowrap font-semibold text-slate-600">
                      Resume
                    </TableHead>
                    <TableHead className="whitespace-nowrap font-semibold text-slate-600">
                      Applied On
                    </TableHead>
                    <TableHead className="px-5 text-right font-semibold text-slate-600">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {applications.map((item) => {
                    const applicant = item?.applicant;
                    const resume = applicant?.profile?.resume;
                    const name = applicant?.fullname || 'Unknown';
                    const email = applicant?.email;
                    const phone = applicant?.phoneNumber;

                    return (
                      <TableRow
                        key={item._id}
                        className="border-b border-slate-100 transition-colors hover:bg-purple-50/30"
                      >
                        {/* Candidate */}
                        <TableCell className="whitespace-nowrap px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
                              {getInitials(name) || '?'}
                            </div>

                            <span className="font-medium text-slate-800">
                              {name}
                            </span>
                          </div>
                        </TableCell>

                        {/* Email */}
                        <TableCell className="whitespace-nowrap text-slate-600">
                          <div className="flex items-center gap-2">
                            <Mail
                              size={15}
                              className="shrink-0 text-slate-400"
                            />
                            {email || '—'}
                          </div>
                        </TableCell>

                        {/* Contact */}
                        <TableCell className="whitespace-nowrap text-slate-600">
                          <div className="flex items-center gap-2">
                            <Phone
                              size={15}
                              className="shrink-0 text-slate-400"
                            />
                            {phone || '—'}
                          </div>
                        </TableCell>

                        {/* Resume */}
                        <TableCell className="whitespace-nowrap">
                          {resume ? (
                            <a
                              href={resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex max-w-48 items-center gap-2 rounded-lg bg-purple-50 px-3 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-100"
                            >
                              <FileText size={16} className="shrink-0" />
                              <span className="max-w-32 truncate">
                                {applicant?.profile?.resumeOriginalName || 'View Resume'}
                              </span>
                              <ExternalLink size={13} className="shrink-0" />
                            </a>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                              Not provided
                            </span>
                          )}
                        </TableCell>

                        {/* Date */}
                        <TableCell className="whitespace-nowrap text-slate-600">
                          <div className="flex items-center gap-2">
                            <CalendarDays
                              size={15}
                              className="shrink-0 text-slate-400"
                            />
                            {formatDate(applicant?.createdAt)}
                          </div>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="px-5 text-right">
                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                aria-label={`Actions for ${name}`}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-slate-500 transition-colors hover:border-purple-100 hover:bg-purple-50 hover:text-purple-700"
                              >
                                <MoreHorizontal size={21} />
                              </button>
                            </PopoverTrigger>

                            <PopoverContent
                              align="end"
                              className="w-44 rounded-xl border-slate-200 p-2 shadow-lg"
                            >
                              <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Update Status
                              </p>

                              {shortlistingStatus.map((status) => (
                                <button
                                  type="button"
                                  key={status}
                                  onClick={() =>
                                    statusHandler(status, item._id)
                                  }
                                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                    status === 'Accepted'
                                      ? 'text-emerald-700 hover:bg-emerald-50'
                                      : 'text-red-600 hover:bg-red-50'
                                  }`}
                                >
                                  {status === 'Accepted' ? (
                                    <CheckCircle2 size={16} />
                                  ) : (
                                    <XCircle size={16} />
                                  )}
                                  {status}
                                </button>
                              ))}
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-500">
                <Users size={30} />
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                No applicants yet
              </h3>

              <p className="mt-2 max-w-sm text-sm text-slate-500">
                Applications will appear here when candidates apply for your jobs.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantsTable;
