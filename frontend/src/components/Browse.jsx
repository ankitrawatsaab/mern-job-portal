
import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './shared/Footer';

const Browse = () => {
    useGetAllJobs();

    const { allJobs = [], searchedQuery = '' } = useSelector(
        (store) => store.job
    );

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(''));
        };
    }, [dispatch]);

    const filteredJobs = allJobs.filter((job) => {
        if (!searchedQuery?.trim()) return true;

        const query = searchedQuery.toLowerCase().trim();

        return (
            job?.title?.toLowerCase().includes(query) ||
            job?.description?.toLowerCase().includes(query) ||
            job?.location?.toLowerCase().includes(query) ||
            job?.company?.name?.toLowerCase().includes(query)
        );
    });

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="mb-8">
                    <p className="text-sm font-medium text-purple-600 mb-2">
                        CAREERVERSE / EXPLORE
                    </p>

                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        Search Results
                        <span className="ml-2 text-purple-600">
                            ({filteredJobs.length})
                        </span>
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Discover opportunities that match your career goals.
                    </p>
                </div>

                {filteredJobs.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-2xl p-10 sm:p-16 text-center">
                        <h2 className="text-xl font-semibold text-slate-800">
                            No jobs found
                        </h2>
                        <p className="text-slate-500 mt-2">
                            Try another search or explore different opportunities.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filteredJobs.map((job) => (
                            <div key={job?._id} className="min-w-0">
                                <Job job={job} />
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};
export default Browse;
