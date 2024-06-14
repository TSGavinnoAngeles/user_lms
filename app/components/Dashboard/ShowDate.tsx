"use client";
import React, { useState, useEffect } from "react";

const ShowDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    setCurrentDate(new Date());
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="date-display">
      {currentDate
        ? `${currentDate.toLocaleDateString(undefined, {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}`
        : "Loading date..."}
    </div>
  );
};

export default ShowDate;
