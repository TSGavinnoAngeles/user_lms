"use client";
import React, { useState, useEffect } from "react";
import { TbClock } from "react-icons/tb";
const ShowDate = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="date-display">
      {currentTime
        ? `${currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}`
        : "Loading time..."}
    </div>
  );
};

export default ShowDate;
