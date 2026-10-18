
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ClipboardList,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const AppliedJobTable = () => {
  const { allAppliedJobs = [] } = useSelector((store) => store.job);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "Date unavailable";

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatus = (status) => {
    const normalizedStatus = status?.toLowerCase();

    if (normalizedStatus === "accepted") {
      return {
        label: "Accepted",
        className: "border-emerald-200 bg-emerald-50 text-emerald-700",
        icon: CheckCircle2,
      };
    }

    if (normalizedStatus === "rejected") {
      return {
        label: "Rejected",
        className: "border-red-200 bg-red-50 text-red-700",
        icon: XCircle,
      };
    }

    return {
      label: status
        ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
        : "Pending",
      className: "border-amber-200 bg-amber-50 text-amber-700",
      icon: Clock3,
    };
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-6 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
              <ClipboardList size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Applied Jobs
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Keep track of your job applications and their status.
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-violet-100 bg-violet-50 px-4 py-2">
            <BriefcaseBusiness size={17} className="text-violet-700" />
            <span className="text-sm font-semibold text-violet-800">
              {allAppliedJobs.length}{" "}
              {allAppliedJobs.length === 1 ? "Application" : "Applications"}
            </span>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {allAppliedJobs.length === 0 ? (
        <div className="flex flex-col items-center px-5 py-14 text-center sm:py-16">
          <div className="mb-4 rounded-2xl bg-violet-50 p-5 text-violet-600">
            <BriefcaseBusiness size={34} />
          </div>

          <h3 className="text-lg font-semibold text-slate-900">
            No applications yet
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            You haven't applied to any jobs yet. Explore available
            opportunities and take the next step in your career.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                  <TableHead className="px-6 py-4 font-semibold text-slate-600">
                    Applied On
                  </TableHead>
                  <TableHead className="py-4 font-semibold text-slate-600">
                    Job Role
                  </TableHead>
                  <TableHead className="py-4 font-semibold text-slate-600">
                    Company
                  </TableHead>
                  <TableHead className="px-6 py-4 text-right font-semibold text-slate-600">
                    Application Status
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {allAppliedJobs.map((appliedJob) => {
                  const status = getStatus(appliedJob.status);
                  const StatusIcon = status.icon;

                  return (
                    <TableRow
                      key={appliedJob._id}
                      className="transition-colors hover:bg-violet-50/30"
                    >
                      <TableCell className="px-6 py-5">
                        <div className="flex items-center gap-2 whitespace-nowrap text-sm text-slate-600">
                          <CalendarDays
                            size={16}
                            className="text-slate-400"
                          />
                          {formatDate(appliedJob.createdAt)}
                        </div>
                      </TableCell>

                      <TableCell className="py-5">
                        <div className="font-semibold text-slate-900">
                          {appliedJob.job?.title || "Job no longer available"}
                        </div>
                      </TableCell>

                      <TableCell className="py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Building2
                            size={17}
                            className="shrink-0 text-violet-500"
                          />
                          {appliedJob.job?.company?.name || "Company unavailable"}
                        </div>
                      </TableCell>

                      <TableCell className="px-6 py-5 text-right">
                        <Badge
                          variant="outline"
                          className={`gap-1.5 rounded-full px-3 py-1 font-medium ${status.className}`}
                        >
                          <StatusIcon size={14} />
                          {status.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile application cards */}
          <div className="space-y-3 p-4 md:hidden">
            {allAppliedJobs.map((appliedJob) => {
              const status = getStatus(appliedJob.status);
              const StatusIcon = status.icon;

              return (
                <article
                  key={appliedJob._id}
                  className="rounded-2xl border border-slate-200 p-4 transition hover:border-violet-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-violet-50 p-3 text-violet-700">
                      <BriefcaseBusiness size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words font-semibold text-slate-900">
                        {appliedJob.job?.title || "Job no longer available"}
                      </h3>

                      <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                        <Building2 size={15} />
                        {appliedJob.job?.company?.name || "Company unavailable"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <span className="flex items-center gap-2 text-xs text-slate-500">
                      <CalendarDays size={15} />
                      {formatDate(appliedJob.createdAt)}
                    </span>

                    <Badge
                      variant="outline"
                      className={`gap-1 rounded-full ${status.className}`}
                    >
                      <StatusIcon size={13} />
                      {status.label}
                    </Badge>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}

      {/* Footer */}
      {allAppliedJobs.length > 0 && (
        <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4 text-center text-xs text-slate-500">
          Showing {allAppliedJobs.length}{" "}
          {allAppliedJobs.length === 1 ? "application" : "applications"}
        </div>
      )}
    </section>
  );
};

export default AppliedJobTable;
