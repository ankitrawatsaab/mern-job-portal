
import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { Building2, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const registerNewCompany = async (e) => {
    e.preventDefault();

    if (!companyName.trim()) {
      toast.error("Please enter your company name.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName: companyName.trim() },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);

        const companyId = res?.data?.company?._id;

        if (companyId) {
          navigate(`/admin/companies/${companyId}`);
        }
      } else {
        toast.error(res?.data?.message || "Unable to register company.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-2xl">
          <button
            type="button"
            onClick={() => navigate("/admin/companies")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-purple-700"
          >
            <ArrowLeft size={16} />
            Back to Companies
          </button>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-1.5 bg-gradient-to-r from-purple-700 via-violet-500 to-purple-300" />

            <form onSubmit={registerNewCompany} className="p-6 sm:p-9">
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-700">
                <Building2 size={28} />
              </div>

              <div className="mb-8">
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                  <Sparkles size={13} />
                  COMPANY SETUP
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Create your company
                </h1>

                <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
                  Give your company a name to get started. You can update your
                  company details later.
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="companyName"
                  className="text-sm font-semibold text-slate-700"
                >
                  Company Name
                </Label>

                <Input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Microsoft, Paytm"
                  autoComplete="organization"
                  maxLength={100}
                  className="h-12 rounded-xl border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-400 focus-visible:ring-purple-200"
                  required
                />

                <p className="text-xs text-slate-400">
                  Enter the official or commonly used name of your company.
                </p>
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/companies")}
                  className="h-11 rounded-xl border-slate-200 px-5"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading || !companyName.trim()}
                  className="h-11 rounded-xl bg-purple-700 px-5 font-semibold text-white hover:bg-purple-800"
                >
                  {loading ? "Creating..." : "Continue"}
                  {!loading && <ArrowRight size={17} className="ml-2" />}
                </Button>
              </div>
            </form>
          </section>

          <p className="mt-5 text-center text-xs text-slate-400">
            CareerVerse · Helping you build your next opportunity
          </p>
        </div>
      </main>
    </div>
  );
};

export default CompanyCreate;
