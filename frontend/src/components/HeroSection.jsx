import React from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse")
    }
    return (
        <>
            <div className='text-center'>
                <div className='flex flex-col gap-5 my-10'>
                    <span className='mx-auto px-4 py-2 rounded-full bg-gray-200 text-[#6A38C2] font-medium '>No. 1 Job Hunt Web Site</span>
                    <div>
                        <h1 className='text-5xl font-bold'>Search, Apply </h1>
                        <h1 className='text-5xl font-bold'>Get Your <span className='text-violet-900'>Dream Jobs</span></h1>
                    </div>
                    <p className='font-bold text-2xl text-black-600'>“Your Career Starts Here.”</p>

                    <div className="flex w-full max-w-xl mx-auto">
                        <Input type="text" 
                        className="rounded-l-full text-gray-400 shadow-[0_4px_8px_0_rgba(0,0,0,0.10)]" placeholder="Find your dream jobs"
                        onChange={(e)=>setQuery(e.target.value)}
                        />

                        <Button type="submit"
                        className="rounded-r-full bg-violet-700 hover:bg-violet-900 text-white px-5"
                        onClick={searchJobHandler}

                        >
                        <Search size={20} />
                        </Button>
                    </div>
                

                </div>



            </div>
        </>
    )
}

export default HeroSection
