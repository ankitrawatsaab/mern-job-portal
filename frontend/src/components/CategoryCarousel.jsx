import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = [
    "Software Support",
    "Software Developer ",
    "Associate Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse")
    }
    return (
        <>
            <Carousel className="relative w-[90%] sm:w-[85%] md:w-full max-w-2xl mx-auto my-20 p-5">

                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-full sm:basis-1/2 md:basis-1/3 flex justify-center"
                        >
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="rounded-full"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="absolute top-1/2 -left-4 -translate-y-1/2" />
                <CarouselNext className="absolute top-1/2 -right-4 -translate-y-1/2" />

            </Carousel>


        </>

    )
}

export default CategoryCarousel
