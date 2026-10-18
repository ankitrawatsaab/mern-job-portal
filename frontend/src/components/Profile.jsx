import React, { useState } from "react";
import Navbar from "./shared/Navbar";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "./ui/avatar";

import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Footer from "./shared/Footer";

const Profile = () => {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const isResume = !!user?.profile?.resume;

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-5 sm:p-8 shadow-sm">


        <div className="flex flex-col sm:flex-row justify-between gap-6">

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

          
            <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-violet-500 shadow-lg">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt={user?.fullname}
                className="object-cover"
              />
              <AvatarFallback>
                {user?.fullname?.charAt(0)}
              </AvatarFallback>
            </Avatar>


            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold">
                {user?.fullname}
              </h1>

              <p className="text-gray-600 mt-2">
                {user?.profile?.bio || "No bio added"}
              </p>
            </div>
          </div>


          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            aria-label="Edit Profile"
            className="rounded-full w-10 h-10 self-center sm:self-start p-0"
          >
            <Pen size={18} />
          </Button>
        </div>


        <div className="space-y-3 mt-8">

          <div className="flex items-center gap-3">
            <Mail size={20} />

            <span className="break-all">
              {user?.email}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Contact size={20} />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="mt-8">
          <h1 className="font-semibold mb-3">
            Skills
          </h1>

          <div className="flex flex-wrap gap-2">

            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-violet-100 text-violet-700 hover:bg-violet-200"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500">
                No skills listed.
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Label className="text-md font-bold">
            Resume
          </Label>

          <div className="mt-2">
            {isResume ? (
              <a
                href={user?.profile?.resume}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-500">
                Resume not uploaded
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-5 shadow-sm">

        <h1 className="font-bold text-xl mb-4">
          Applied Jobs
        </h1>

        <div className="overflow-x-auto">
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog
        open={open}
        setOpen={setOpen}
      />

      <Footer/>
    </div>
  );
};

export default Profile;