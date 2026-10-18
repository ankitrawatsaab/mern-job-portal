import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();

  const companyName = job?.company?.name || "Company";
  const companyLogo = job?.company?.logo;
  const positionCount = Number(job?.position);
  const description = job?.description ||"Explore this opportunity and learn more about the role.";
  const salary = job?.salary;

  const openJob = () => {
    if (job?._id) {
      navigate(`/description/${job._id}`);
    }
  };

  return (
    <article
      onClick={openJob}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openJob();
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={`View details for ${job?.title || "job opening"}`}
      className="group flex h-full min-h-[330px] cursor-pointer flex-col rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 sm:p-6"
    >
      {/* Company */}
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-2">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={`${companyName} logo`}
              className="h-full w-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <span className="text-xl font-bold text-purple-700">
              {companyName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-gray-900">
            {companyName}
          </h3>

          <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
            <MapPin size={14} className="shrink-0" />
            <span>India</span>
          </p>
        </div>

        <ArrowUpRight
          size={18}
          className="shrink-0 text-gray-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-purple-600"
        />
      </div>

      {/* Job details */}
      <div className="mt-5 flex-1">
        <h2 className="line-clamp-2 text-lg font-bold leading-7 text-gray-900 transition-colors group-hover:text-purple-700">
          {job?.title || "Job opening"}
        </h2>

        <p className="mt-2 overflow-hidden text-sm leading-6 text-gray-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
          {description}
        </p>
      </div>

      {/* Job badges */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className="rounded-full border-blue-200 bg-blue-50 px-3 py-1 font-medium text-blue-700"
        >
          {Number.isFinite(positionCount) && positionCount > 0
            ? `${positionCount} Position${positionCount === 1 ? "" : "s"}`
            : "Open Position"}
        </Badge>

        {job?.jobType && (
          <Badge
            variant="outline"
            className="rounded-full border-purple-200 bg-purple-50 px-3 py-1 font-medium text-purple-700"
          >
            {job.jobType}
          </Badge>
        )}

        {salary !== undefined && salary !== null && salary !== "" && (
          <Badge
            variant="outline"
            className="rounded-full border-emerald-200 bg-emerald-50 px-3 py-1 font-medium text-emerald-700"
          >
            {salary} LPA
          </Badge>
        )}
      </div>

      {/* Action */}
      <div className="mt-5 border-t border-gray-100 pt-4">
        <Button
          type="button"
          variant="outline"
          className="w-full justify-between rounded-xl border-gray-200 bg-white py-5 font-semibold text-gray-800 transition-all duration-200 hover:border-purple-600 hover:bg-purple-600 hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            openJob();
          }}
        >
          View Details
          <ArrowUpRight size={17} />
        </Button>
      </div>
    </article>
  );
};

export default LatestJobCard;
