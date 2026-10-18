
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (e) => {
    e?.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setQuery("");
      return;
    }

    dispatch(setSearchedQuery(trimmedQuery));
    navigate("/browse");
  };

  const categories = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
  ];

  const handleCategoryClick = (category) => {
    setQuery(category);
    dispatch(setSearchedQuery(category));
    navigate("/browse");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-purple-50/50 px-4 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pt-20">
      {/* Subtle background accents */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm sm:text-base">
          <span className="h-2 w-2 rounded-full bg-purple-600" />
          Find your next opportunity
        </span>

        <h1 className="mx-auto mt-7 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
          Search, Apply
          <br />
          Get Your{" "}
          <span className="bg-gradient-to-r from-purple-700 to-violet-500 bg-clip-text text-transparent">
            Dream Jobs
          </span>
        </h1>

        <p className="mt-5 text-base font-medium text-gray-600 sm:text-lg">
          Your career starts here. Find work that moves you forward.
        </p>

        {/* Search form */}
        <form
          onSubmit={searchJobHandler}
          className="mx-auto mt-8 flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-lg shadow-purple-900/5 transition-all focus-within:border-purple-300 focus-within:ring-4 focus-within:ring-purple-100 sm:rounded-full"
        >
          <Search
            size={21}
            className="ml-3 shrink-0 text-gray-400"
          />

          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 border-0 bg-transparent text-gray-900 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Search by job title or keyword..."
            aria-label="Search jobs by title or keyword"
          />

          <Button
            type="submit"
            className="h-11 shrink-0 rounded-xl bg-purple-700 px-4 font-semibold text-white transition-colors hover:bg-purple-800 sm:rounded-full sm:px-6"
          >
            <span className="hidden sm:inline">Search Jobs</span>
            <Search size={18} className="sm:ml-2" />
          </Button>
        </form>

        <p className="mt-3 text-xs text-gray-500 sm:text-sm">
          Try searching for a role that matches your skills.
        </p>

        {/* Popular searches */}
        <div className="mt-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
            Popular searches
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md sm:px-5"
              >
                {category}
                <ArrowRight
                  size={14}
                  className="text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-purple-600"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
