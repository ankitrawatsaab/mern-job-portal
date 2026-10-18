
import React, { useEffect, useMemo, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { Filter, Search, X } from 'lucide-react'
import Footer from './shared/Footer'

const Jobs = () => {
  const { allJobs = [], searchedQuery = '' } = useSelector(
    (store) => store.job
  )

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [filters, setFilters] = useState({
    Location: '',
    Industry: '',
  })

  useEffect(() => {
    if (!isSidebarOpen) return

    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsSidebarOpen(false)
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen])

  const handleFilterChange = (type, value) => {
    setFilters((previous) => ({
      ...previous,
      [type]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({ Location: '', Industry: '' })
  }

  const filterJobs = useMemo(() => {
    const query = typeof searchedQuery === 'string'
      ? searchedQuery.trim().toLowerCase()
      : ''

    return allJobs.filter((job) => {
      const title = job?.title?.toLowerCase() || ''
      const description = job?.description?.toLowerCase() || ''
      const location = job?.location?.toLowerCase() || ''
      const company = job?.company?.name?.toLowerCase() || ''

      const matchesSearch =
        !query ||
        title.includes(query) ||
        description.includes(query) ||
        location.includes(query) ||
        company.includes(query)

      const selectedLocation = filters.Location.toLowerCase()
      const matchesLocation =
        !selectedLocation || location.includes(selectedLocation)

      const selectedIndustry = filters.Industry.toLowerCase()
      const matchesIndustry =
        !selectedIndustry ||
        title.includes(selectedIndustry) ||
        description.includes(selectedIndustry)

      return matchesSearch && matchesLocation && matchesIndustry
    })
  }, [allJobs, searchedQuery, filters])

  const hasActiveFilters = Boolean(filters.Location || filters.Industry)

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Find Jobs</h1>
            <p className="mt-1 text-sm text-slate-500">
              Explore opportunities that match your skills.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
          >
            <Filter size={17} />
            Filters
            {hasActiveFilters && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-purple-700">
                {Number(Boolean(filters.Location)) +
                  Number(Boolean(filters.Industry))}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-start gap-6">
          <aside className="hidden w-64 shrink-0 lg:block xl:w-72">
            <div className="sticky top-5">
              <FilterCard
                filters={filters}
                onFilterChange={handleFilterChange}
                onClear={clearFilters}
                onClose={() => setIsSidebarOpen(false)}
              />
            </div>
          </aside>

          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                className="fixed inset-0 z-50 bg-slate-950/40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 w-[min(88vw,340px)] overflow-y-auto bg-slate-50 p-3 shadow-2xl"
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.22 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <FilterCard
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClear={clearFilters}
                    onClose={() => setIsSidebarOpen(false)}
                  />

                  <button
                    type="button"
                    onClick={() => setIsSidebarOpen(false)}
                    className="mt-3 w-full rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white hover:bg-purple-700"
                  >
                    Show {filterJobs.length} jobs
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <section className="min-w-0 flex-1">
            <div className="mb-5 hidden items-center justify-between gap-3 sm:flex">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Latest Jobs
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Discover your next career opportunity.
                </p>
              </div>

              <span className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600">
                {filterJobs.length} {filterJobs.length === 1 ? 'job' : 'jobs'} found
              </span>
            </div>

            <div className="mb-4 flex items-center justify-between gap-3 sm:hidden">
              <span className="text-sm font-medium text-slate-600">
                {filterJobs.length} {filterJobs.length === 1 ? 'job' : 'jobs'} found
              </span>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-semibold text-purple-700"
                >
                  Clear filters
                </button>
              )}
            </div>

            {filterJobs.length === 0 ? (
              <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                  <Search size={25} />
                </div>

                <h2 className="text-lg font-bold text-slate-900">
                  No jobs found
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Try changing your search or clearing filters to see more opportunities.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filterJobs.map((job, index) => (
                  <motion.div
                    key={job?._id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: Math.min(index * 0.04, 0.2) }}
                    className="min-w-0"
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Jobs
