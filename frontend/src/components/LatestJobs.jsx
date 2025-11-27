import React from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            <h1 className='text-4xl font-bold'> <span className='text-blue-900'>Latest & Top</span> Job Opening</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 mt-5'>
                {
                    allJobs.length<=0 ? <span>No Job found</span>: allJobs?.slice(0,6).map((job) => <LatestJobCard key={job._id} job={job}/>)
                }
            </div>

        </div>
    )
}
export default LatestJobs
