import React from "react";
import {Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious,} from "@/components/ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Designer",
  "DevOps Engineer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-12">
      <div className="mb-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700 sm:text-sm">
          Popular Searches
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Explore roles that match your skills
        </p>
      </div>

      <Carousel opts={{ align: "center", loop: true }} className="relative mx-auto w-[85%] sm:w-[90%]">
        <CarouselContent className="-ml-3">
          {category.map((cat) => (
            <CarouselItem
              key={cat}
              className="basis-full pl-3 sm:basis-1/2 md:basis-1/3"
            >
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => searchJobHandler(cat)}
                  className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 sm:px-6"
                >
                  {cat}
                </button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-8 border-gray-200 bg-white shadow-sm hover:bg-purple-50 sm:-left-10" />
        <CarouselNext className="-right-8 border-gray-200 bg-white shadow-sm hover:bg-purple-50 sm:-right-10" />
      </Carousel>
    </section>
  );
};

export default CategoryCarousel;
