import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Building2, Loader2, Upload, Globe, MapPin, FileText } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, file }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.name.trim()) {
      toast.error("Please enter a company name.");
      return;
    }

    const formData = new FormData();
    formData.append("name", input.name.trim());
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file instanceof File) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Company updated successfully.");
        navigate("/admin/companies");
      } else {
        toast.error(res.data.message || "Unable to update company.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={() => navigate("/admin/companies")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-purple-700"
          >
            <ArrowLeft size={17} />
            Back to Companies
          </button>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-1.5 bg-gradient-to-r from-purple-700 via-violet-500 to-purple-300" />

            <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                  <Building2 size={25} />
                </div>

                <div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    Company Setup
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    Update your company profile and information.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={submitHandler} className="p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-semibold text-slate-700">
                    Company Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={changeEventHandler}
                    placeholder="e.g. Zomato"
                    className="h-11 rounded-xl border-slate-200 focus-visible:ring-purple-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="font-semibold text-slate-700">
                    Description
                  </Label>
                  <div className="relative">
                    <FileText size={16} className="absolute left-3 top-3.5 text-slate-400" />
                    <Input
                      id="description"
                      type="text"
                      name="description"
                      value={input.description}
                      onChange={changeEventHandler}
                      placeholder="What does your company do?"
                      className="h-11 rounded-xl border-slate-200 pl-9 focus-visible:ring-purple-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="font-semibold text-slate-700">
                    Website
                  </Label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-3 top-3.5 text-slate-400" />
                    <Input
                      id="website"
                      type="text"
                      name="website"
                      value={input.website}
                      onChange={changeEventHandler}
                      placeholder="https://example.com"
                      className="h-11 rounded-xl border-slate-200 pl-9 focus-visible:ring-purple-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="font-semibold text-slate-700">
                    Location
                  </Label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-3.5 text-slate-400" />
                    <Input
                      id="location"
                      type="text"
                      name="location"
                      value={input.location}
                      onChange={changeEventHandler}
                      placeholder="e.g. Gurugram, India"
                      className="h-11 rounded-xl border-slate-200 pl-9 focus-visible:ring-purple-200"
                    />
                  </div>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="file" className="font-semibold text-slate-700">
                    Company Logo
                  </Label>

                  <label
                    htmlFor="file"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center transition-colors hover:border-purple-300 hover:bg-purple-50/50"
                  >
                    <Upload size={22} className="mb-2 text-purple-600" />
                    <span className="text-sm font-semibold text-slate-700">
                      {input.file instanceof File
                        ? input.file.name
                        : "Choose a logo image"}
                    </span>
                    <span className="mt-1 text-xs text-slate-500">
                      Select an image from your device
                    </span>

                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={changeFileHandler}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/companies")}
                  disabled={loading}
                  className="h-11 rounded-xl border-slate-200 px-6"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 rounded-xl bg-purple-700 px-7 font-semibold text-white hover:bg-purple-800"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Company"
                  )}
                </Button>
              </div>
            </form>
          </section>

          <p className="mt-5 text-center text-xs text-slate-400">
            CareerVerse · Manage your company profile
          </p>
        </div>
      </main>
    </div>
  );
};

export default CompanySetup;
