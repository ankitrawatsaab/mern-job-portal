
import React, { useEffect, useState } from "react";
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "../ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {Popover,PopoverContent,PopoverTrigger,} from "../ui/popover";
import { Edit2, MoreHorizontal, Building2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const navigate = useNavigate();

  const { companies = [], searchCompanyByText = "" } = useSelector(
    (state) => state.company
  );

  const [filterCompany, setFilterCompany] = useState([]);

  useEffect(() => {
    const filtered = companies.filter((company) =>
      company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase())
    );

    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div className="w-full">
      <Table>
        <TableCaption className="py-5 text-sm text-slate-500">
          List of your registered companies
        </TableCaption>

        <TableHeader>
          <TableRow className="border-slate-100 hover:bg-transparent">
            <TableHead className="w-24 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Logo
            </TableHead>
            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Company Name
            </TableHead>
            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Registered Date
            </TableHead>
            <TableHead className="py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length > 0 ? (
            filterCompany.map((company) => (
              <TableRow
                key={company._id}
                className="border-slate-100 transition-colors hover:bg-purple-50/40"
              >
                <TableCell className="py-4">
                  <Avatar className="h-11 w-11 rounded-xl border border-slate-100 bg-white">
                    <AvatarImage
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="rounded-xl object-contain p-1"
                    />
                    <AvatarFallback className="rounded-xl bg-purple-50 text-purple-700">
                      <Building2 size={19} />
                    </AvatarFallback>
                  </Avatar>
                </TableCell>

                <TableCell className="py-4">
                  <span className="font-semibold text-slate-800">
                    {company.name}
                  </span>
                </TableCell>

                <TableCell className="py-4 text-sm text-slate-500">
                  {company.createdAt
                    ? new Date(company.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : "—"}
                </TableCell>

                <TableCell className="py-4 text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        aria-label={`Actions for ${company.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-purple-100 hover:text-purple-700"
                      >
                        <MoreHorizontal size={20} />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent align="end" className="w-40 rounded-xl p-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-purple-50 hover:text-purple-700"
                      >
                        <Edit2 size={16} />
                        Edit Company
                      </button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-40 text-center">
                <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                    <Building2 size={23} />
                  </div>
                  <p className="font-medium text-slate-700">
                    No companies found
                  </p>
                  <p className="text-sm">
                    Try another search or register a new company.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
