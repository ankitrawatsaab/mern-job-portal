
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();

  const companyName = job?.company?.name || "Company";

  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)}
      className="group flex h-full min-h-[320px] flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-lg font-bold text-purple-700">
          {companyName.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-semibold text-gray-900">
            {companyName}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
            <MapPin size={14} />
            India
          </p>
        </div>
      </div>

      <div className="mt-6 flex-1">
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-purple-700">
          {job?.title}
        </h2>

        <p className="mt-3 overflow-hidden text-sm leading-6 text-gray-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
          {job?.description}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
          {job?.position} Positions
        </Badge>

        <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
          {job?.jobType}
        </Badge>

        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <Button
          type="button"
          variant="outline"
          className="w-full justify-between rounded-xl hover:border-purple-600 hover:bg-purple-600 hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/description/${job?._id}`);
          }}
        >
          View Details
          <ArrowUpRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default LatestJobCard;
