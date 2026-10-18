
import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import { Search, Plus, Building2 } from "lucide-react";

const Companies = () => {
  useGetAllCompanies();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Page heading */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-purple-700">
              <Building2 size={17} />
              Recruiter Dashboard
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Companies
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Manage your registered companies and their details.
            </p>
          </div>

          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="h-11 rounded-xl bg-purple-700 px-5 font-semibold text-white shadow-sm transition-colors hover:bg-purple-800"
          >
            <Plus size={18} className="mr-2" />
            New Company
          </Button>
        </div>

        {/* Companies list */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Registered Companies
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Search and manage your companies.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Filter by company name..."
                aria-label="Filter companies by name"
                className="h-10 rounded-xl border-slate-200 bg-slate-50 pl-10 focus-visible:ring-purple-200"
              />
            </div>
          </div>

          <div className="p-3 sm:p-5">
            <CompaniesTable />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Companies;
