"use client";
import Image from "next/image";
import React from "react";

interface TestimonialsProps {
  imgsrc: string;
  name: string;
  jobTitle: string;
  courseRef: string;
}
const Testimonials: React.FC<TestimonialsProps> = ({
  imgsrc,
  name,
  jobTitle,
  courseRef,
}) => {
  return (
    <div className="card w-[300px] mt-56 border-2 border-color-blk border-spacing-y-4 carousel-item  mx-1 max-h-[30%] max-w-[30%] hover:border-zaffre-300 bg-mikado_yellow-500 mb-3 hover:text-zaffre-300 my">
      <a href={courseRef}>
        <figure className="px-7 pt-3">
          <Image
            alt="Testimonial Image"
            src={imgsrc}
            className="rounded-xl border-4 border-blk  hover:border-zaffre-300 hover:text-zaffre-300"
          />
        </figure>
        <div className="card-body items-center text-center text-rich_black-300 hover:border-zaffre-300 hover:text-zaffre-300">
          <h2 className="card-title text-black ">{jobTitle}</h2>
          <p>{name}</p>
        </div>
      </a>
    </div>
  );
};

export default Testimonials;
