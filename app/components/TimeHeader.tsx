import React from "react";
import ShowTime from "./Dashboard/ShowTime";
import ShowDate from "./Dashboard/ShowDate";
import { TbClock } from "react-icons/tb";
import { MdDateRange, MdOutlineSpaceDashboard } from "react-icons/md";

const TimeHeader = () => {
  return (
    <div className="bg-citypop-50 flex flex-row mb-5 outline outline-2 justify-between">
      <div className="flex flex-row space-x-1 mx-3">
        <MdOutlineSpaceDashboard className="my-1 " />
        <div className="mx-2 font-serif">Seneca LMS </div>
      </div>
      <div className="flex flex-row text-sm mx-5 font-serif my-0.5 space-x-5">
        <div className="flex flex-row space-x-1">
          <MdDateRange className="my-1 " />
          <ShowDate />{" "}
        </div>
        <div className="flex flex-row space-x-1">
          <TbClock className="my-1 " />
          <ShowTime />{" "}
        </div>
      </div>
    </div>
  );
};

export default TimeHeader;
