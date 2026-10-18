
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate()

  const dayAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDifference = currentTime - createdAt

    return Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    )
  }

  const daysAgo = dayAgoFunction(job?.createdAt)

  return (
    <div className="flex h-full cursor-pointer flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg">

      {/* Posted date */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgo === 0
            ? 'Today'
            : `${daysAgo} days ago`}
        </p>
      </div>

      {/* Company */}
      <div className="my-4 flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-2">
          <Avatar className="h-full w-full rounded-none">
            <AvatarImage
              src={job?.company?.logo}
              alt={`${job?.company?.name || 'Company'} logo`}
              className="h-full w-full object-contain"
            />
          </Avatar>
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-gray-900">
            {job?.company?.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            India
          </p>
        </div>
      </div>

      {/* Job details */}
      <div className="flex-1">
        <h3 className="my-2 line-clamp-2 text-lg font-bold text-gray-900">
          {job?.title}
        </h3>

        <p className="line-clamp-3 text-sm leading-6 text-gray-600">
          {job?.description}
        </p>
      </div>

      {/* Job badges */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge
          variant="outline"
          className="rounded-full border-blue-200 bg-blue-50 font-semibold text-blue-700"
        >
          {job?.position} Position
        </Badge>

        {job?.jobType && (
          <Badge
            variant="outline"
            className="rounded-full border-purple-200 bg-purple-50 font-semibold text-purple-700"
          >
            {job.jobType}
          </Badge>
        )}

        {job?.salary !== undefined &&
          job?.salary !== null &&
          job?.salary !== '' && (
            <Badge
              variant="outline"
              className="rounded-full border-emerald-200 bg-emerald-50 font-semibold text-emerald-700"
            >
              {job.salary} LPA
            </Badge>
          )}
      </div>

      {/* Details action */}
      <div className="mt-5 border-t border-gray-100 pt-4">
        <Button
          type="button"
          variant="outline"
          className="w-full justify-between rounded-xl border-gray-200 py-5 font-semibold transition-colors hover:border-purple-600 hover:bg-purple-600 hover:text-white"
          onClick={() => {
            if (job?._id) {
              navigate(`/description/${job._id}`)
            }
          }}
        >
          View Details
          <span aria-hidden="true">↗</span>
        </Button>
      </div>
    </div>
  )
}

export default Job
