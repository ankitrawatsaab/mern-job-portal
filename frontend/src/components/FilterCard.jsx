import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType : "Location",
        array : ["Delhi","Mumbai","Bangalore","Chennai","Hyderabad","Pune"]
    },
    {
        filterType : "Industry",
        array : ["Software Engineer","Frontend Developer","Backend Developer","UI/UX Designer"," DevOps Engineer", "Data Analyst","AI Engineer", "Cybersecurity Specialist","Cloud Engineer","Android Developer", "Cloud Engineer"]
    }
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const handleValueChange = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3'/>

            <RadioGroup value={selectedValue} onValueChange={handleValueChange}>
                {filterData.map((data, index) => (
                    <div key={index} className="mt-4">
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>

                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div className='flex items-center space-x-2 my-2' key={idx}>
                                    <RadioGroupItem id={itemId} value={item} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
